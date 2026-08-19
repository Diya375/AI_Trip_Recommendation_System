const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");
const placeController = require("../controllers/placeController");

const router = express.Router();

router.get("/:id/places", verifyToken, checkTripMembership, placeController.getPlaces);
router.post("/:id/places", verifyToken, checkTripMembership, placeController.addPlace);
router.delete("/:id/places/:placeId", verifyToken, checkTripMembership, placeController.deletePlace);

module.exports = router;