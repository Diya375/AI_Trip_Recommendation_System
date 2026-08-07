const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");
const tripController = require("../controllers/tripController");

const router = express.Router();

router.post("/", verifyToken, tripController.upload.single("image"), tripController.createTrip);
router.get("/preview/:inviteCode", verifyToken, tripController.previewTrip);
router.post("/join/:inviteCode", verifyToken, tripController.joinTrip);
router.get("/my", verifyToken, tripController.listMyTrips);
router.get("/:id", verifyToken, checkTripMembership, tripController.getTrip);
router.delete("/:id", verifyToken, checkTripMembership, tripController.deleteTrip);
router.post("/:id/accept-recommendation", verifyToken, checkTripMembership, tripController.acceptRecommendation);

module.exports = router;