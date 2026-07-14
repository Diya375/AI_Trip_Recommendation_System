import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { Map, Plus, ArrowRight, Compass } from "lucide-react";

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
      <p className="text-gray-400 text-sm">Loading...</p>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto px-4 sm:px-0">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-10">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest mb-1">
              <Map size={13} strokeWidth={2} />
              Trip Planner
            </p>
            <h1 className="cinzel text-3xl sm:text-4xl text-[var(--accent)] mb-2">
              Select a trip to view and manage
            </h1>
            <p className="text-gray-500 text-sm">Every trip you're planning or part of, in one place.</p>
          </div>
          <button
            onClick={() => navigate("/create-trip")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)]
              text-white text-sm font-semibold hover:opacity-90 transition-opacity border-none cursor-pointer shrink-0"
          >
            <Plus size={16} strokeWidth={2.5} /> New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white text-center py-14 sm:py-16 px-4">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mx-auto mb-5">
              <Compass size={22} strokeWidth={1.8} />
            </div>
            <p className="text-gray-500 mb-6 text-sm max-w-sm mx-auto">
              No trips yet. Create one and invite your travel companions!
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold
                hover:opacity-90 transition-opacity border-none cursor-pointer"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {trips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/planner/${trip.id}`)}
                className="rounded-2xl border border-gray-200 bg-white cursor-pointer group p-5 sm:p-6
                  flex flex-col gap-4 transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-md"
              >
                {/* Icon + role */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                    <Map size={18} strokeWidth={1.8} />
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize
                    ${trip.role === "admin"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-gray-100 text-gray-500"}`}
                  >
                    {trip.role}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <p className="cinzel text-lg text-gray-900 font-semibold leading-tight truncate">
                    {trip.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {trip.role === "admin" ? "You organised this trip" : "You joined this trip"}
                  </p>
                </div>

                {/* Open button */}
                <div className="flex items-center gap-1 text-xs text-[var(--accent)] font-medium mt-auto group-hover:gap-2 transition-all">
                  <span>Open Planner</span>
                  <ArrowRight size={13} strokeWidth={2.2} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}