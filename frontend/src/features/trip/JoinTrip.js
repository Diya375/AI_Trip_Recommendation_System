import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { AlertTriangle, Compass, ArrowRight, Loader2 } from "lucide-react";

export default function JoinTrip() {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { redirectTo: `/join/${inviteCode}` } });
      return;
    }

    API.get(`/trips/preview/${inviteCode}`)
      .then((res) => setTrip(res.data))
      .catch((err) => setError(err.response?.data?.error || "Invalid invite link"))
      .finally(() => setLoading(false));
  }, [inviteCode, navigate]);

  const handleJoin = async () => {
    setJoining(true);
    try {
      const res = await API.post(`/trips/join/${inviteCode}`);
      navigate(`/planner/${res.data.tripId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to join trip");
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-10">
      <div className="fade-up w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-6 sm:px-10 py-10 sm:py-12 text-center shadow-sm">

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <Loader2 size={22} className="text-[var(--accent)] animate-spin" />
            <p className="text-[var(--text-dim)] text-sm">Loading invite...</p>
          </div>

        ) : error ? (
          <>
            <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-6">
              <AlertTriangle size={22} strokeWidth={1.8} />
            </div>
            <h1 className="cinzel text-2xl text-[var(--accent)] mb-3">Invalid Link</h1>
            <p className="text-red-500 text-sm mb-8">{error}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full px-5 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold
                hover:opacity-90 transition-opacity border-none cursor-pointer"
            >
              Go to Dashboard
            </button>
          </>

        ) : (
          <>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mx-auto mb-6">
              <Compass size={26} strokeWidth={1.8} />
            </div>

            <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1">
              You've been invited to join
            </p>
            <h1 className="cinzel text-2xl sm:text-3xl font-bold text-[var(--accent)] mb-2 break-words">
              {trip.name}
            </h1>
            <p className="text-sm text-[var(--text-dim)] mb-8">
              Organized by{" "}
              <span className="text-[var(--text)] font-semibold">{trip.admin_name}</span>
            </p>

            <button
              onClick={handleJoin}
              disabled={joining}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)]
                text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed
                transition-opacity border-none cursor-pointer"
            >
              {joining ? "Joining..." : (
                <>
                  Join Trip <ArrowRight size={15} strokeWidth={2.2} />
                </>
              )}
            </button>

            <p className="text-xs text-[var(--text-dim)] mt-4">
              You'll be taken to the trip planner after joining.
            </p>
          </>
        )}
      </div>
    </div>
  );
}