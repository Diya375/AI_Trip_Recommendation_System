import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");         
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

const handleLogin = async () => {
  setError("");
  setLoading(true);
  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (err) {
    if (err.response?.data?.needsVerification) {
      navigate("/verify", { state: { email } });
    } else {
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card fade-up" style={{ width: "100%", maxWidth: "420px", padding: "3rem 2.5rem", textAlign: "center" }}>
        <h1 className="cinzel" style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
          YatraVerse
        </h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "2.5rem", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
          Welcome Back Explorer
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        {error && (
          <p style={{ color: "#e57373", marginBottom: "1rem", fontSize: "0.85rem" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
        >
          {loading ? "Entering..." : "Enter YatraVerse"}
        </button>

        <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>
          New here?{" "}
          <Link to="/signup" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}