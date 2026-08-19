const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const checkTripMembership = require("../middleware/checkTripMembership");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.get("/:id/comments", verifyToken, checkTripMembership, commentController.getComments);
router.post("/:id/comments", verifyToken, checkTripMembership, commentController.addComment);

module.exports = router;