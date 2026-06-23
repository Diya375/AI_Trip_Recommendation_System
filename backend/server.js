const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const tripsRoutes = require("./routes/trips");
const pool = require("./db");

const app = express();

// CORS FIX (ALLOW BOTH PORTS)
app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"],
  credentials: true
}));

// SAFE preflight handler
app.options(/.*/, cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Trip Backend Running");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "DB connection failed" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});