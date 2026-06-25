import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="card fade-up w-full max-w-md px-10 py-12 text-center">

        {loading ? (
          <p className="text-[var(--text-dim)] text-sm">Loading invite...</p>

        ) : error ? (
          <>
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-2xl mx-auto mb-6">
              ⚠️
            </div>
            <h1 className="cinzel text-2xl text-[var(--accent)] mb-3">Invalid Link</h1>
            <p className="text-red-400 text-sm mb-6">{error}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-primary w-full py-3 text-base"
            >
              Go to Dashboard
            </button>
          </>

        ) : (
          <>
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-3xl mx-auto mb-6">
              🛣️
            </div>

            <p className="text-sm text-[var(--text-dim)] tracking-wide mb-1">
              You've been invited to join
            </p>
            <h1 className="cinzel text-3xl font-bold text-[var(--accent)] mb-2">
              {trip.name}
            </h1>
            <p className="text-sm text-[var(--text-dim)] mb-8">
              Organized by{" "}
              <span className="text-[var(--text)] font-semibold">{trip.admin_name}</span>
            </p>

            <button
              onClick={handleJoin}
              disabled={joining}
              className="btn btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {joining ? "Joining..." : "Join Trip 🚀"}
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