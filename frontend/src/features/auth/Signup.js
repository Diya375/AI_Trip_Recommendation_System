import { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import anthem from "../../assets/audio/reshamfiriri.mp3";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

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
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-[24px] bg-white p-10 text-center shadow-xl shadow-slate-200/50">
        <h1 className="cinzel text-3xl font-bold text-[var(--accent)] mb-2">
          Join YatraVerse
        </h1>
        <p className="mb-10 text-sm text-[var(--text-dim)] tracking-[0.05em]">
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

        <div className="mb-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />

          {/* Password with Lucide Eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="mb-4 text-sm text-rose-500">
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          className="w-full rounded-full bg-[#0f172a] px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-900"
        >
          Create Account
        </button>

        <p className="mt-8 text-sm text-[var(--text-dim)]">
          Already a traveler?{' '}
          <Link to="/login" className="text-[var(--accent)] no-underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
