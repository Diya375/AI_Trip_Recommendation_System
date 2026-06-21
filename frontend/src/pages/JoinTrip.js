import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function JoinTrip() {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { redirectTo: `/join/${inviteCode}` } });
      return;
    }

    API.get(`/trips/preview/${inviteCode}`)
      .then((res) => setTrip(res.data))
      .catch((err) => setError(err.response?.data?.error || "Invalid invite link"));
  }, [inviteCode, navigate]);

  const handleJoin = async () => {
    setJoining(true);
    try {
      const res = await API.post(`/trips/join/${inviteCode}`);
      navigate(`/planner/${res.data.tripId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to join trip");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card fade-up" style={{ width: "100%", maxWidth: "420px", padding: "3rem 2.5rem", textAlign: "center" }}>
        {error ? (
          <>
            <p style={{ color: "#e74c3c", marginBottom: "1.5rem" }}>{error}</p>
            <button onClick={() => navigate("/dashboard")} className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
              Go to Dashboard
            </button>
          </>
        ) : !trip ? (
          <p style={{ color: "var(--text-dim)" }}>Loading invite...</p>
        ) : (
          <>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗺️</div>
            <h1 className="cinzel" style={{ fontSize: "1.8rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
              {trip.name}
            </h1>
            <p style={{ color: "var(--text-dim)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
              {trip.admin_name} invited you to join this trip
            </p>
            <button
              onClick={handleJoin}
              disabled={joining}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
            >
              {joining ? "Joining..." : "Join Trip"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}