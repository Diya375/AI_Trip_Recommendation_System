import { useState } from "react";
import API from "../../services/api";
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
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-[24px] bg-white p-10 text-center shadow-xl shadow-slate-200/50">
        <h1 className="cinzel text-3xl font-bold text-[var(--accent)] mb-2">
          Recover Account
        </h1>
        <p className="mb-10 text-sm text-[var(--text-dim)]">
          Enter your email to reset your password
        </p>

        <div className="mb-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}
        {message && <p className="mb-4 text-sm text-emerald-500">{message}</p>}

        <button
          onClick={handleForgot}
          disabled={loading || !email}
          className="w-full rounded-full bg-[#0f172a] px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Sending..." : "Send Reset Code"}
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
