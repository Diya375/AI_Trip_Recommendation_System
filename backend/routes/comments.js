const express = require("express");
const pool = require("../config/db");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");

const router = express.Router();

// Get comments for a trip
router.get("/:id/comments", verifyToken, checkTripMembership, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT trip_comments.*, users.name, users.email 
       FROM trip_comments 
       JOIN users ON trip_comments.user_id = users.id 
       WHERE trip_comments.trip_id = $1 
       ORDER BY trip_comments.created_at ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load comments" });
  }
});

// Add a comment to a trip
router.post("/:id/comments", verifyToken, checkTripMembership, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO trip_comments (trip_id, user_id, content) 
       VALUES ($1, $2, $3) RETURNING *`,
      [id, req.userId, content.trim()]
    );
    
    // Fetch user details to return the full comment object
    const userResult = await pool.query(`SELECT name, email FROM users WHERE id = $1`, [req.userId]);
    const newComment = { ...result.rows[0], ...userResult.rows[0] };
    
    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;
