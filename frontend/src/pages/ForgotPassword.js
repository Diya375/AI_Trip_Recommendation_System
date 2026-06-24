import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      setTimeout(() => navigate("/reset-password", { state: { email } }), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card fade-up" style={{ width: "100%", maxWidth: "420px", padding: "3rem 2.5rem", textAlign: "center" }}>
        <h1 className="cinzel" style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
          Recover Account
        </h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Enter your email to reset your password
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        {error && <p style={{ color: "#e57373", marginBottom: "1rem", fontSize: "0.85rem" }}>{error}</p>}
        {message && <p style={{ color: "#81c784", marginBottom: "1rem", fontSize: "0.85rem" }}>{message}</p>}

        <button
          onClick={handleForgot}
          disabled={loading || !email}
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
        >
          {loading ? "Sending..." : "Send Reset Code"}
        </button>

        <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>
          Remember your password?{" "}
          <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
