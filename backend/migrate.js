/**
 * Run this once to create the trip_plans table:
 *   node migrate.js
 */
const pool = require('./config/db');

pool.query(`
  CREATE TABLE IF NOT EXISTS trip_plans (
    id           SERIAL PRIMARY KEY,
    trip_id      INTEGER NOT NULL UNIQUE REFERENCES trips(id) ON DELETE CASCADE,
    plan         TEXT NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
  )
`)
  .then(() => { console.log('✅  trip_plans table created successfully.'); process.exit(0); })
  .catch(err  => { console.error('❌  Migration failed:', err.message); process.exit(1); });
