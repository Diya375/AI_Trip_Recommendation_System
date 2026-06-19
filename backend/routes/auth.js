const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

const JWT_SECRET =process.env.JWT_SECRET;

// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    res.json({ message: "User created successfully" });
  } catch (err) {
     console.log(err);
    res.status(400).json({ error: "Signup failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
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

  res.json({message:"Login succesfull", token});
});

module.exports = router;