import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const redirectTo = location.state?.redirectTo;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/verify", { email, code });
      setMessage("Email verified! Redirecting to login...");
      setTimeout(() => navigate("/login", { state: { redirectTo } }), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    try {
      await API.post("/auth/resend-code", { email });
      setMessage("New code sent to your email");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend code");
    }
  };

  return (
    <div>
      <h2>Verify your email</h2>
      <p>We sent a 6-digit code to {email}</p>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
        />
        <button type="submit">Verify</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button onClick={handleResend}>Resend code</button>
    </div>
  );
}