import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    Promise.all([API.get("/auth/me"), API.get("/trips/my")])
      .then(([userRes, tripsRes]) => {
        setUser(userRes.data);
        setTrips(tripsRes.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleDelete = async (e, tripId, tripName) => {
    e.stopPropagation(); // prevent the card's onClick (navigate to planner) from firing

    const confirmed = window.confirm(`Delete "${tripName}"? This will remove it for all members and can't be undone.`);
    if (!confirmed) return;

    try {
      await API.delete(`/trips/${tripId}`);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete trip");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p style={{ color: "var(--text-dim)" }}>Loading...</p>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
        <div>
          <h2 className="section-title">Dashboard</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>Your journey at a glance</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--bg-card)", padding: "0.5rem 1rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>
            👤
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
            Welcome back, {user.name}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 className="cinzel" style={{ fontSize: "1.25rem", color: "var(--text)" }}>Your Trips</h2>
        <button
          onClick={() => navigate("/create-trip")}
          className="btn btn-primary"
          style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}
        >
          + Create New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗺️</div>
          <p style={{ color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            No trips yet. Start planning your first journey.
          </p>
          <button
            onClick={() => navigate("/create-trip")}
            className="btn btn-primary"
            style={{ padding: "0.75rem 1.5rem" }}
          >
            Create Your First Trip
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => navigate(`/planner/${trip.id}`)}
              className="card card-hover"
              style={{ cursor: "pointer", position: "relative" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.5rem" }}>🛣️</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {trip.role === "admin" && (
                    <>
                      <span style={{ fontSize: "0.7rem", padding: "0.25rem 0.6rem", borderRadius: "20px", background: "var(--accent)", color: "#fff" }}>
                        Admin
                      </span>
                      <button
                        onClick={(e) => handleDelete(e, trip.id, trip.name)}
                        title="Delete trip"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "1rem",
                          padding: "0.2rem",
                          color: "var(--text-dim)",
                          lineHeight: 1,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#e74c3c"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-dim)"}
                      >
                        ⛔
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p style={{ fontWeight: 600, color: "var(--text)", fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                {trip.name}
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                Tap to view planner
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}