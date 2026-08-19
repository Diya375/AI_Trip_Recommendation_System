const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");
const tripPlanController = require("../controllers/tripPlanController");

const router = express.Router();

router.post("/:id/plan", verifyToken, checkTripMembership, tripPlanController.saveTripPlan);
router.get("/:id/plan", verifyToken, checkTripMembership, tripPlanController.getTripPlan);

module.exports = router;
