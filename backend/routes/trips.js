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
// Save or update my preferences for a trip
router.post("/:id/preferences", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { budget, trip_types, food_preference, accommodation, notes } = req.body;

  try {
    // must be a member
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );
    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }

    // upsert — insert if first time, update if they're editing
    await pool.query(
      `INSERT INTO trip_preferences (trip_id, user_id, budget, trip_types, food_preference, accommodation, notes, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (trip_id, user_id)
       DO UPDATE SET budget=$3, trip_types=$4, food_preference=$5, accommodation=$6, notes=$7, submitted_at=NOW()`,
      [id, req.userId, budget, trip_types, food_preference, accommodation, notes]
    );

    res.json({ message: "Preferences saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save preferences" });
  }
});

// Get all preferences for a trip (all members see own, admin sees all)
router.get("/:id/preferences", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );
    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }

    const isAdmin = membership.rows[0].role === "admin";

    if (isAdmin) {
      // admin gets everyone's preferences joined with their name
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
      // member gets only their own
      const result = await pool.query(
        "SELECT * FROM trip_preferences WHERE trip_id=$1 AND user_id=$2",
        [id, req.userId]
      );
      res.json({ role: "member", preferences: result.rows[0] || null });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load preferences" });
  }
});
// Get all saved places for a trip (all members)
router.get("/:id/places", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );
    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }
    const result = await pool.query(
      `SELECT trip_places.*, users.name AS added_by
       FROM trip_places
       JOIN users ON trip_places.user_id = users.id
       WHERE trip_places.trip_id = $1
       ORDER BY trip_places.created_at ASC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load places" });
  }
});

// Save a place for a trip
router.post("/:id/places", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, address, lat, lng, place_id } = req.body;
  try {
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );
    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }
    const result = await pool.query(
      `INSERT INTO trip_places (trip_id, user_id, name, address, lat, lng, place_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, req.userId, name, address, lat, lng, place_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save place" });
  }
});

// Delete a saved place (only the person who added it or admin)
router.delete("/:id/places/:placeId", verifyToken, async (req, res) => {
  const { id, placeId } = req.params;
  try {
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );
    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }
    const place = await pool.query("SELECT * FROM trip_places WHERE id=$1", [placeId]);
    if (place.rows.length === 0) {
      return res.status(404).json({ error: "Place not found" });
    }
    const isAdmin = membership.rows[0].role === "admin";
    const isOwner = place.rows[0].user_id === req.userId;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Not allowed to delete this place" });
    }
    await pool.query("DELETE FROM trip_places WHERE id=$1", [placeId]);
    res.json({ message: "Place removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete place" });
  }
});
module.exports = router;