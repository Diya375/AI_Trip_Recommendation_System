const pool = require("../config/db");

exports.savePreferences = async (req, res) => {
  const { id } = req.params;
  const { budget, trip_types, food_preference, accommodation, notes } = req.body;

  if (trip_types !== undefined && !Array.isArray(trip_types)) {
    return res.status(400).json({ error: "trip_types must be an array" });
  }

  try {
    await pool.query(
      `INSERT INTO trip_preferences (trip_id, user_id, budget, trip_types, food_preference, accommodation, notes, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (trip_id, user_id)
       DO UPDATE SET budget=$3, trip_types=$4, food_preference=$5, accommodation=$6, notes=$7, submitted_at=NOW()`,
      [id, req.userId, budget, trip_types, food_preference, accommodation, notes]
    );

    const memberCountRes = await pool.query(`SELECT COUNT(*) FROM trip_members WHERE trip_id = $1`, [id]);
    const prefCountRes = await pool.query(`SELECT COUNT(*) FROM trip_preferences WHERE trip_id = $1`, [id]);

    if (parseInt(memberCountRes.rows[0].count) === parseInt(prefCountRes.rows[0].count)) {
      const adminRes = await pool.query(`SELECT user_id FROM trip_members WHERE trip_id = $1 AND role = 'admin'`, [id]);
      if (adminRes.rows.length > 0) {
        const adminId = adminRes.rows[0].user_id;

        const existingNotif = await pool.query(
          `SELECT id FROM notifications WHERE trip_id = $1 AND type = 'preferences_complete'`,
          [id]
        );

        if (existingNotif.rows.length === 0) {
          await pool.query(
            `INSERT INTO notifications (user_id, trip_id, type, message, link) 
             VALUES ($1, $2, 'preferences_complete', 'All members have submitted their preferences! Generate the final recommendation now.', '/planner/${id}')`,
            [adminId, id]
          );
        }
      }
    }

    res.json({ message: "Preferences saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save preferences" });
  }
};

exports.getPreferences = async (req, res) => {
  const { id } = req.params;
  const isAdmin = req.membership.role === "admin";

  try {
    if (isAdmin) {
      const result = await pool.query(
        `SELECT users.name, users.email, trip_preferences.*
         FROM trip_preferences
         JOIN users ON trip_preferences.user_id = users.id
         WHERE trip_preferences.trip_id = $1
         ORDER BY trip_preferences.submitted_at ASC`,
        [id]
      );
      res.json({ role: "admin", preferences: result.rows });
    } else {
      const result = await pool.query(
        "SELECT * FROM trip_preferences WHERE trip_id=$1 AND user_id=$2",
        [id, req.userId]
      );
      res.json({ role: "member", preferences: result.rows[0] || null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load preferences" });
  }
};
