const express = require("express");
const pool = require("../config/db");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");

const router = express.Router();

// Save or update my preferences for a trip
router.post("/:id/preferences", verifyToken, checkTripMembership, async (req, res) => {
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
    res.json({ message: "Preferences saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save preferences" });
  }
});

// Get preferences for a trip (admin sees all, member sees own)
router.get("/:id/preferences", verifyToken, checkTripMembership, async (req, res) => {
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
});

module.exports = router;