const express = require("express");
const verifyToken = require("../middleware/authmiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/google", authController.googleAuth);
router.get("/me", verifyToken, authController.getMe);
router.post("/verify", authController.verifyEmail);
router.post("/resend-code", authController.resendCode);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.put("/profile", verifyToken, authController.updateProfile);
router.put("/change-password", verifyToken, authController.changePassword);

module.exports = router;