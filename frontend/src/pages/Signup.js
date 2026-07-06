import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import anthem from "../assets/audio/reshamfiriri.mp3";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo;
   const {login} = useAuth();
     useEffect(() => {
    const audio = new Audio(anthem);
    audio.volume = 0.25;
    audio.play().catch((err) => {
      console.log("Audio play failed:", err);
    });
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleSignup = async () => {
    setError("");
    try {
      await API.post("/auth/signup", { name, email, password });
      navigate("/verify", { state: { email, redirectTo } });
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        credential: credentialResponse.credential,
      });
      login(res.data.token);
      navigate(redirectTo || "/dashboard");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div
      className="page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card fade-up"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "3rem 2.5rem",
          textAlign: "center",
        }}
      >
        <h1
          className="cinzel"
          style={{
            fontSize: "2.2rem",
            color: "var(--accent)",
            marginBottom: "0.5rem",
          }}
        >
          Join YatraVerse
        </h1>
        <p
          style={{
            color: "var(--text-dim)",
            marginBottom: "2.5rem",
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
          }}
        >
          Begin Your Journey
        </p>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google sign-in failed.")}
            theme="filled_black"
            shape="pill"
            text="signup_with"
            size="large"
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--text-dim)] uppercase tracking-widest">
            or
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          {/* Password with Lucide Eye toggle */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              style={{ width: "100%", paddingRight: "44px" }}
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
                color: "var(--text-dim)",
                display: "flex",
                alignItems: "center",
                padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p
            style={{
              color: "#e74c3c",
              fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
        >
          Create Account
        </button>

        <p
          style={{
            marginTop: "2rem",
            fontSize: "0.85rem",
            color: "var(--text-dim)",
          }}
        >
          Already a traveler?{" "}
          <Link
            to="/login"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
