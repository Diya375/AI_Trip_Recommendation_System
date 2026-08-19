const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.get("/", verifyToken, notificationController.getNotifications);
router.put("/:id/read", verifyToken, notificationController.markAsRead);
router.put("/read-all", verifyToken, notificationController.markAllAsRead);

module.exports = router;
