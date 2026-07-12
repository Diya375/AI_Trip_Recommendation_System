const express = require("express");
const pool = require("../config/db");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");

const router = express.Router();

// Get all saved places for a trip
router.get("/:id/places", verifyToken, checkTripMembership, async (req, res) => {
  const { id } = req.params;
  try {
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
    console.error(err);
    res.status(500).json({ error: "Failed to load places" });
  }
});

// Save a place for a trip
router.post("/:id/places", verifyToken, checkTripMembership, async (req, res) => {
  const { id } = req.params;
  const { name, address, lat, lng, place_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO trip_places (trip_id, user_id, name, address, lat, lng, place_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, req.userId, name, address, lat, lng, place_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save place" });
  }
});

// Delete a saved place (owner or admin only)
router.delete("/:id/places/:placeId", verifyToken, checkTripMembership, async (req, res) => {
  const { placeId } = req.params;
  try {
    const place = await pool.query("SELECT * FROM trip_places WHERE id=$1", [placeId]);
    if (place.rows.length === 0) {
      return res.status(404).json({ error: "Place not found" });
    }

    const isAdmin = req.membership.role === "admin";
    const isOwner = place.rows[0].user_id === req.userId;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Not allowed to delete this place" });
    }

    await pool.query("DELETE FROM trip_places WHERE id=$1", [placeId]);
    res.json({ message: "Place removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete place" });
  }
});

module.exports = router;