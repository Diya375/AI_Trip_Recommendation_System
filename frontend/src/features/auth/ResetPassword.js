import { useState } from "react";
import API from "../../services/api";
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
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-[24px] bg-white p-10 text-center shadow-xl shadow-slate-200/50">
        <h1 className="cinzel text-3xl font-bold text-[var(--accent)] mb-2">
          New Password
        </h1>
        <p className="mb-10 text-sm text-[var(--text-dim)]">
          Enter the code from your email and your new password
        </p>

        <div className="mb-6 flex flex-col gap-4">
          {!defaultEmail && (
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          )}
          <input
            type="text"
            placeholder="6-digit reset code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[var(--text-dim)]"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}
        {message && <p className="mb-4 text-sm text-emerald-500">{message}</p>}

        <button
          onClick={handleReset}
          disabled={loading || !code || !newPassword || !email}
          className="w-full rounded-full bg-[#0f172a] px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="mt-8 text-sm text-[var(--text-dim)]">
          Remember your password?{' '}
          <Link to="/login" className="text-[var(--accent)] no-underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
