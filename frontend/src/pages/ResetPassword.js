import { useState } from "react";
import API from "../services/api";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultEmail = location.state?.email || "";

  const [email, setEmail] = useState(defaultEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await API.post("/auth/reset-password", { email, code, newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card fade-up" style={{ width: "100%", maxWidth: "420px", padding: "3rem 2.5rem", textAlign: "center" }}>
        <h1 className="cinzel" style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
          New Password
        </h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Enter the code from your email and your new password
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          {!defaultEmail && (
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          )}
          <input
            type="text"
            placeholder="6-digit reset code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input"
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
              style={{ paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "var(--text-dim)",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && <p style={{ color: "#e57373", marginBottom: "1rem", fontSize: "0.85rem" }}>{error}</p>}
        {message && <p style={{ color: "#81c784", marginBottom: "1rem", fontSize: "0.85rem" }}>{message}</p>}

        <button
          onClick={handleReset}
          disabled={loading || !code || !newPassword || !email}
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
        >
          {loading ? "Resetting..." : "Reset Password"}
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
