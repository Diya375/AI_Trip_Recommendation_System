const express = require("express");
const crypto = require("crypto");
const pool = require("../db");
const verifyToken = require("../middleware/authmiddleware");

const router = express.Router();

// Create a new trip (the creator becomes admin)
router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Trip name is required" });
  }

  try {
    const inviteCode = crypto.randomBytes(4).toString("hex"); // e.g. "a1b2c3d4"

    const tripResult = await pool.query(
      `INSERT INTO trips (name, admin_id, invite_code) VALUES ($1, $2, $3) RETURNING *`,
      [name.trim(), req.userId, inviteCode]
    );

    const trip = tripResult.rows[0];

    // Admin automatically joins as a member with role 'admin'
    await pool.query(
      `INSERT INTO trip_members (trip_id, user_id, role) VALUES ($1, $2, 'admin')`,
      [trip.id, req.userId]
    );

    res.json({ trip });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create trip" });
  }
});

// Preview trip info from invite code (before joining — used on the join page)
router.get("/preview/:inviteCode", verifyToken, async (req, res) => {
  const { inviteCode } = req.params;

  try {
    const result = await pool.query(
      `SELECT trips.id, trips.name, users.name AS admin_name
       FROM trips
       JOIN users ON trips.admin_id = users.id
       WHERE trips.invite_code = $1`,
      [inviteCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Invalid or expired invite link" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load trip" });
  }
});

// Join a trip via invite code
router.post("/join/:inviteCode", verifyToken, async (req, res) => {
  const { inviteCode } = req.params;

  try {
    const tripResult = await pool.query(
      "SELECT * FROM trips WHERE invite_code=$1",
      [inviteCode]
    );

    if (tripResult.rows.length === 0) {
      return res.status(404).json({ error: "Invalid or expired invite link" });
    }

    const trip = tripResult.rows[0];

    const existing = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [trip.id, req.userId]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: "Already a member", tripId: trip.id });
    }

    await pool.query(
      `INSERT INTO trip_members (trip_id, user_id, role) VALUES ($1, $2, 'member')`,
      [trip.id, req.userId]
    );

    res.json({ message: "Joined trip successfully", tripId: trip.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to join trip" });
  }
});

// List all trips the logged-in user belongs to
router.get("/my", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT trips.id, trips.name, trips.invite_code, trip_members.role
       FROM trips
       JOIN trip_members ON trips.id = trip_members.trip_id
       WHERE trip_members.user_id = $1
       ORDER BY trips.created_at DESC`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load trips" });
  }
});

// Get full details of one trip, including all members (only if you're a member)
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );

    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }

    const trip = await pool.query("SELECT * FROM trips WHERE id=$1", [id]);

    const members = await pool.query(
      `SELECT users.id, users.name, users.email, trip_members.role
       FROM trip_members
       JOIN users ON trip_members.user_id = users.id
       WHERE trip_members.trip_id = $1`,
      [id]
    );

    res.json({ trip: trip.rows[0], members: members.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load trip" });
  }
});
// Delete a trip (admin only)
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );

    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }

    if (membership.rows[0].role !== "admin") {
      return res.status(403).json({ error: "Only the trip admin can delete this trip" });
    }

    await pool.query("DELETE FROM trips WHERE id=$1", [id]);

    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete trip" });
  }
});
module.exports = router;