const pool = require('./config/db');

async function migrateWorkflow() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Add status and final_destination_data to trips table
    console.log("Altering trips table...");
    await client.query(`
      ALTER TABLE trips 
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'planning',
      ADD COLUMN IF NOT EXISTS final_destination_data JSONB;
    `);

    // 2. Add has_accepted_recommendation to trip_members
    console.log("Altering trip_members table...");
    await client.query(`
      ALTER TABLE trip_members
      ADD COLUMN IF NOT EXISTS has_accepted_recommendation BOOLEAN DEFAULT false;
    `);

    // 3. Create trip_comments table
    console.log("Creating trip_comments table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS trip_comments (
        id SERIAL PRIMARY KEY,
        trip_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 4. Create notifications table
    console.log("Creating notifications table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        link VARCHAR(255),
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query('COMMIT');
    console.log("✅ Workflow migration completed successfully.");
    return { success: true, message: "Workflow migration completed successfully." };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("❌ Migration failed:", error.message);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = migrateWorkflow;
