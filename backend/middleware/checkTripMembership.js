const pool = require("../config/db");

module.exports = async function checkTripMembership(req, res, next) {
  const { id } = req.params;
  try {
    const membership = await pool.query(
      "SELECT * FROM trip_members WHERE trip_id=$1 AND user_id=$2",
      [id, req.userId]
    );
    if (membership.rows.length === 0) {
      return res.status(403).json({ error: "You are not a member of this trip" });
    }
    req.membership = membership.rows[0]; // { role, ... } — avoids re-querying for role checks
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to verify trip membership" });
  }
};