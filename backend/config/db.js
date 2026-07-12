const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => {
    console.log("✅ PostgreSQL Connected Successfully");
    // Ensure the users table has reset_code and reset_expires columns
    pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS reset_code VARCHAR(10),
      ADD COLUMN IF NOT EXISTS reset_expires TIMESTAMP
    `).catch(err => console.error("❌ Migration Error:", err));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));

module.exports = pool;