import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import anthem from "../assets/audio/reshamfiriri.mp3";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const params = new URLSearchParams(location.search);
  const redirectTo = location.state?.redirectTo || params.get("redirectTo") || "/dashboard";

  useEffect(() => {
    const audio = new Audio(anthem);
    audio.volume = 0.75;
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.currentTime = 0; };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate(redirectTo);
  }, []);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      navigate(redirectTo);
    } catch (err) {
      if (err.response?.data?.needsVerification) {
        navigate("/verify", { state: { email, redirectTo } });
      } else {
        setError(err.response?.data?.error || "Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        credential: credentialResponse.credential,
      });
      login(res.data.token);
      navigate(redirectTo);
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "2rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow — bottom left */}
      <div style={{
        position: "absolute",
        bottom: "-100px",
        left: "-80px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,128,96,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Ambient glow — top right */}
      <div style={{
        position: "absolute",
        top: "-80px",
        right: "-60px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(22,107,79,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="card fade-up" style={{ width: "100%", maxWidth: "420px", padding: "3rem 2.5rem", textAlign: "center", position: "relative", zIndex: 1 }}>

        <h1 className="cinzel text-4xl text-[var(--accent)] mb-2">YatraVerse</h1>
        <p className="text-sm text-[var(--text-dim)] tracking-widest mb-8">
          Welcome Back Explorer
        </p>

        {/* Google Sign In */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google sign-in failed.")}
            theme="filled_black"
            shape="pill"
            text="signin_with"
            size="large"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--text-dim)] uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Email/password form */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-dim)] flex items-center p-0"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-[var(--accent)] text-sm no-underline hover:underline">
            Forgot Password?
          </Link>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary w-full py-3 text-base disabled:opacity-60 mb-6"
        >
          {loading ? "Entering..." : "Enter YatraVerse"}
        </button>

        <p className="text-sm text-[var(--text-dim)]">
          New here?{" "}
          <Link to="/signup" state={{ redirectTo }} className="text-[var(--accent)] no-underline hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}