const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const verifyToken = require("../middleware/authmiddleware");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/mailer");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── SIGNUP ──
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (existing.rows.length > 0) {
      if (existing.rows[0].is_verified) {
        return res.status(400).json({ error: "Email already registered. Please log in." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 10 * 60 * 1000);
      await pool.query(
        `UPDATE users SET name=$1, password=$2, verification_code=$3, verification_expires=$4 WHERE email=$5`,
        [name, hashedPassword, code, expires, email]
      );
      await sendVerificationEmail(email, code);
      return res.json({ message: "Signup successful, check your email for the verification code" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      `INSERT INTO users (name, email, password, is_verified, verification_code, verification_expires)
       VALUES ($1, $2, $3, false, $4, $5)`,
      [name, email, hashedPassword, code, expires]
    );
    await sendVerificationEmail(email, code);
    res.json({ message: "Signup successful, check your email for the verification code" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Signup failed" });
  }
});

// ── LOGIN ──
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    if (!user.is_verified) {
      return res.status(403).json({ error: "Email not verified", needsVerification: true });
    }

    if (!user.password) {
      return res.status(401).json({ error: "This account uses Google sign-in. Please sign in with Google." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ── GOOGLE AUTH ──
router.post("/google", async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    let user = result.rows[0];

    if (!user) {
      const newUser = await pool.query(
        `INSERT INTO users (name, email, password, is_verified, google_id)
         VALUES ($1, $2, '', true, $3) RETURNING *`,
        [name, email, googleId]
      );
      user = newUser.rows[0];
    } else if (!user.google_id) {
      await pool.query(
        "UPDATE users SET google_id=$1, is_verified=true WHERE email=$2",
        [googleId, email]
      );
      user = (await pool.query("SELECT * FROM users WHERE email=$1", [email])).rows[0];
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Google auth error:", err.message);
    res.status(401).json({ error: "Google authentication failed" });
  }
});

// ── ME ──
router.get("/me", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id=$1",
      [req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// ── VERIFY EMAIL ──
router.post("/verify", async (req, res) => {
  const { email, code } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const user = result.rows[0];
    if (user.is_verified) return res.status(400).json({ error: "Email already verified" });
    if (user.verification_code !== code) return res.status(400).json({ error: "Invalid code" });
    if (new Date() > new Date(user.verification_expires)) return res.status(400).json({ error: "Code expired, please request a new one" });

    await pool.query(
      "UPDATE users SET is_verified=true, verification_code=NULL, verification_expires=NULL WHERE email=$1",
      [email]
    );
    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ── RESEND CODE ──
router.post("/resend-code", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    if (result.rows[0].is_verified) return res.status(400).json({ error: "Email already verified" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      "UPDATE users SET verification_code=$1, verification_expires=$2 WHERE email=$3",
      [code, expires, email]
    );
    await sendVerificationEmail(email, code);
    res.json({ message: "Verification code resent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to resend code" });
  }
});

// ── FORGOT PASSWORD ──
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      "UPDATE users SET reset_code=$1, reset_expires=$2 WHERE email=$3",
      [code, expires, email]
    );
    await sendPasswordResetEmail(email, code);
    res.json({ message: "Password reset code sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to process forgot password request" });
  }
});

// ── RESET PASSWORD ──
router.post("/reset-password", async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const user = result.rows[0];
    if (!user.reset_code || user.reset_code !== code) return res.status(400).json({ error: "Invalid reset code" });
    if (new Date() > new Date(user.reset_expires)) return res.status(400).json({ error: "Reset code expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE users SET password=$1, reset_code=NULL, reset_expires=NULL WHERE email=$2",
      [hashedPassword, email]
    );
    res.json({ message: "Password reset successfully. You can now log in." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

// ── UPDATE PROFILE ──
router.put("/profile", verifyToken, async (req, res) => {
  const { name, email, travel_styles } = req.body;
  try {
    const fields = [];
    const values = [];
    let i = 1;
    if (name) { fields.push(`name=$${i++}`); values.push(name); }
    if (email) { fields.push(`email=$${i++}`); values.push(email); }
    if (travel_styles) { fields.push(`travel_styles=$${i++}`); values.push(travel_styles); }
    if (!fields.length) return res.status(400).json({ error: "Nothing to update" });
    values.push(req.userId);
    await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id=$${i}`, values);
    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ── CHANGE PASSWORD ──
router.put("/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [req.userId]);
    const user = result.rows[0];
    if (!user.password) return res.status(400).json({ error: "This account uses Google sign-in." });
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ error: "Current password is incorrect" });
    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password=$1 WHERE id=$2", [hashed, req.userId]);
    res.json({ message: "Password changed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to change password" });
  }
});

module.exports = router;