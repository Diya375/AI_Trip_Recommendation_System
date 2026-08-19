const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");
const preferenceController = require("../controllers/preferenceController");

const router = express.Router();

router.post("/:id/preferences", verifyToken, checkTripMembership, preferenceController.savePreferences);
router.get("/:id/preferences", verifyToken, checkTripMembership, preferenceController.getPreferences);

module.exports = router;