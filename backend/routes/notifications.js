const express = require("express");
const pool = require("../config/db");
const verifyToken = require("../middleware/authmiddleware");

const router = express.Router();

// Get all notifications for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM notifications 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 50`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load notifications" });
  }
});

// Mark notification as read
router.put("/:id/read", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE notifications SET is_read = true 
       WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update notification" });
  }
});

// Mark all as read
router.put("/read-all", verifyToken, async (req, res) => {
  try {
    await pool.query(
      `UPDATE notifications SET is_read = true WHERE user_id = $1`,
      [req.userId]
    );
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update notifications" });
  }
});

module.exports = router;
