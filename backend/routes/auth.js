const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const verifyToken = require("../middleware/authmiddleware");  
const { sendVerificationEmail } = require("../utils/mailer");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

 
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (existing.rows.length > 0) {
      if (existing.rows[0].is_verified) {
        return res.status(400).json({ error: "Email already registered. Please log in." });
      }

      // Email exists but was never verified — let them retry signup cleanly
      const hashedPassword = await bcrypt.hash(password, 10);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 10 * 60 * 1000);

      await pool.query(
        `UPDATE users SET name=$1, password=$2, verification_code=$3, verification_expires=$4
         WHERE email=$5`,
        [name, hashedPassword, code, expires, email]
      );

      await sendVerificationEmail(email, code);

      return res.json({ message: "Signup successful, check your email for the verification code" });
    }

    // Brand new email — normal insert
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

 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.rows[0].is_verified) {
    return res.status(403).json({ error: "Email not verified", needsVerification: true });
  }

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid) {
    return res.status(401).json({ error: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user.rows[0].id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login succesfull", token });
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id=$1",
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/verify", async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    if (user.is_verified) {
      return res.status(400).json({ error: "Email already verified" });
    }
    if (user.verification_code !== code) {
      return res.status(400).json({ error: "Invalid code" });
    }
    if (new Date() > new Date(user.verification_expires)) {
      return res.status(400).json({ error: "Code expired, please request a new one" });
    }

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

router.post("/resend-code", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    if (result.rows[0].is_verified) {
      return res.status(400).json({ error: "Email already verified" });
    }

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

module.exports = router;