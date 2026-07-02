import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { Plus, Search, Compass, Mountain, Waves, TreePine, Map, Tent, ArrowRight, MapPinned } from "lucide-react";

// Cycle through a small set of icons + accent-adjacent colors so every
// trip card reads distinctly at a glance, without needing per-trip data.
const CARD_STYLES = [
  { Icon: Compass, color: "#2f6f5e" },
  { Icon: Mountain, color: "#b8863b" },
  { Icon: Waves, color: "#3c6e8f" },
  { Icon: TreePine, color: "#5c7a3f" },
  { Icon: Tent, color: "#a85c48" },
  { Icon: Map, color: "#7d5a8c" },
];
function cardStyle(seed) {
  return CARD_STYLES[seed % CARD_STYLES.length];
}

export default function PlannerHub() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    API.get("/trips/my")
      .then((res) => setTrips(res.data))
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredTrips = useMemo(() => {
    if (!query.trim()) return trips;
    return trips.filter((t) => t.name?.toLowerCase().includes(query.trim().toLowerCase()));
  }, [trips, query]);

  const adminCount = trips.filter((t) => t.role === "admin").length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="section-title">Trip Planner</h1>
              <p className="section-sub">Select a trip to view and manage</p>
            </div>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-6 h-[176px] animate-pulse">
                <div className="w-12 h-12 rounded-2xl bg-[var(--border)] mb-6" />
                <div className="h-4 w-3/4 rounded bg-[var(--border)] mb-2" />
                <div className="h-3 w-1/2 rounded bg-[var(--border)]" />
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="fade-up max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="section-title">Trip Planner</h1>
            <p className="section-sub">
              {trips.length === 0
                ? "Select a trip to view and manage"
                : `${trips.length} trip${trips.length !== 1 ? "s" : ""} · you organise ${adminCount}`}
            </p>
          </div>
          <button
            onClick={() => navigate("/create-trip")}
            className="btn btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 text-sm hover:-translate-y-0.5 transition-transform"
          >
            <Plus size={16} />
            New Trip
          </button>
        </div>

        {/* Search — only worth showing once there's something to filter */}
        {trips.length > 4 && (
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your trips…"
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-full pl-10 pr-4 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        )}

        {trips.length === 0 ? (
          <div className="card text-center py-16 px-8">
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-5">
              <MapPinned size={28} className="text-[var(--accent)]" />
            </div>
            <p className="cinzel text-lg text-[var(--text)] mb-2">No trips yet</p>
            <p className="text-[var(--text-dim)] text-sm mb-6 max-w-xs mx-auto">
              Create one and invite your travel companions to start planning together.
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="btn btn-primary inline-flex items-center gap-1.5 px-6 py-3"
            >
              <Plus size={16} />
              Create Your First Trip
            </button>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="card text-center py-14 px-8">
            <p className="text-[var(--text-dim)] text-sm">
              No trips match "<span className="text-[var(--text)]">{query}</span>".
            </p>
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {filteredTrips.map((trip, i) => {
              const { Icon, color } = cardStyle(trip.id ?? i);
              return (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/planner/${trip.id}`)}
                  className="card card-hover cursor-pointer p-6 flex flex-col gap-4 group relative overflow-hidden"
                >
                  {/* Accent top bar */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{ background: color }}
                  />

                  {/* Icon + role */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                      style={{ background: `${color}1a`, color }}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium
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
                  <div className="flex items-center gap-1 text-xs text-[var(--accent)] mt-auto font-medium">
                    <span>Open Planner</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}