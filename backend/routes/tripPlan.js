const express = require("express");
const pool = require("../config/db");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");

const router = express.Router();

// Save (or overwrite) the AI-generated plan for a trip — admin only
router.post("/:id/plan", verifyToken, checkTripMembership, async (req, res) => {
  const { id } = req.params;
  const { plan } = req.body;

  if (req.membership.role !== "admin") {
    return res.status(403).json({ error: "Only the trip admin can save the plan." });
  }
  if (!plan?.trim()) {
    return res.status(400).json({ error: "Plan content is required." });
  }

  try {
    await pool.query(
      `INSERT INTO trip_plans (trip_id, plan, generated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (trip_id)
       DO UPDATE SET plan = $2, generated_at = NOW()`,
      [id, plan.trim()]
    );
    res.json({ message: "Plan saved successfully." });
  } catch (err) {
    console.error("SAVE PLAN ERROR:", err.message);
    res.status(500).json({ error: "Failed to save trip plan." });
  }
});

// Get the shared AI plan for a trip — all members can read
router.get("/:id/plan", verifyToken, checkTripMembership, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT plan, generated_at FROM trip_plans WHERE trip_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.json({ plan: null });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET PLAN ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch trip plan." });
  }
});

module.exports = router;
