const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const aiController = require("../controllers/aiController");

const router = express.Router();

router.post("/chat", verifyToken, aiController.chat);
router.post("/trip-plan", verifyToken, aiController.tripPlan);
router.post("/final-recommendation", verifyToken, aiController.finalRecommendation);
router.get("/history", verifyToken, aiController.getHistory);
router.post("/history", verifyToken, aiController.saveHistory);
router.delete("/history", verifyToken, aiController.clearHistory);

module.exports = router;
