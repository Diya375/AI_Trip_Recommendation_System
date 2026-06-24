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
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setVerifying(true);
    try {
      await API.post("/auth/verify", { email, code });
      setMessage("Email verified! Redirecting...");
      setTimeout(() => navigate("/login", { state: { redirectTo } }), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    setResending(true);
    try {
      await API.post("/auth/resend-code", { email });
      setMessage("New code sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl px-10 py-12 text-center shadow-xl fade-up">

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center text-2xl mx-auto mb-6">
          ✉️
        </div>

        {/* Title */}
        <h1 className="cinzel text-3xl font-bold text-[var(--accent)] mb-2">
          Verify Email
        </h1>

        <p className="text-sm text-[var(--text-dim)] tracking-wide mb-1">
          We sent a 6-digit code to
        </p>
        <p className="text-sm font-semibold text-[var(--text)] mb-8 break-all">
          {email}
        </p>

        {/* Form */}
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full text-center text-3xl font-bold tracking-[0.5em] pl-6 py-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-dim)] outline-none focus:border-[var(--accent)] transition-colors"
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          {message && (
            <p className="text-sm text-green-400">{message}</p>
          )}

          <button
            type="submit"
            disabled={verifying || code.length < 6}
            className="w-full py-3 rounded-xl text-base font-semibold bg-[var(--accent)] text-white transition-opacity disabled:opacity-50 hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
          >
            {verifying ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {/* Resend */}
        <p className="mt-6 text-sm text-[var(--text-dim)]">
          Didn't receive it?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-[var(--accent)] bg-none border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:underline"
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        </p>

      </div>
    </div>
  );
}