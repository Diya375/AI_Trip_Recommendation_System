import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

export default function PlannerHub() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    API.get("/trips/my")
      .then((res) => setTrips(res.data))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return (
    <DashboardLayout>
      <p className="text-[var(--text-dim)]">Loading...</p>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="fade-up max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="section-title">Trip Planner</h1>
            <p className="section-sub">Select a trip to view and manage</p>
          </div>
          <button
            onClick={() => navigate("/create-trip")}
            className="btn btn-primary px-5 py-2.5 text-sm"
          >
            + New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-4xl mb-4">🗺️</p>
            <p className="text-[var(--text-dim)] mb-6">
              No trips yet. Create one and invite your travel companions!
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="btn btn-primary px-6 py-3"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {trips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/planner/${trip.id}`)}
                className="card card-hover cursor-pointer p-6 flex flex-col gap-4 group"
              >
                {/* Icon + role */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl">
                    🛣️
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                    ${trip.role === "admin"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--border)] text-[var(--text-dim)]"}`}
                  >
                    {trip.role}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <p className="cinzel text-lg text-[var(--text)] font-semibold leading-tight">
                    {trip.name}
                  </p>
                  <p className="text-xs text-[var(--text-dim)] mt-1">
                    {trip.role === "admin" ? "You organised this trip" : "You joined this trip"}
                  </p>
                </div>

                {/* Open button */}
                <div className="flex items-center gap-1 text-xs text-[var(--accent)] mt-auto group-hover:gap-2 transition-all">
                  <span>Open Planner</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}