import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import {
  Plus,
  Trash2,
  Crown,
  Map,
  ArrowRight,
  Compass,
  Search,
  LayoutGrid,
  Rows3,
} from "lucide-react";

function TripImage({ trip, className }) {
  const src = trip.image || trip.coverImage || trip.imageUrl;

  if (!src) {
    return (
      <div
        className={`${className} bg-[var(--bg-subtle)] flex items-center justify-center border border-[var(--border)]/40`}
      >
        <Map size={22} className="text-[var(--text-dim)]/30" strokeWidth={1.4} />
      </div>
    );
  }

  return (
    <img src={src} alt={trip.name} className={`${className} object-cover`} />
  );
}

/* ---------- small building blocks ---------- */

// Circular "ring" stat, echoes the donut-chart feel of the reference's Expenses widget
function RingStat({ value, max, label, count, color }) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="card p-5 flex items-center gap-4 text-left border-[var(--border)] bg-[var(--bg-card)]">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="shrink-0 -rotate-90"
      >
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="6"
        />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - pct * c}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text
          x="32"
          y="32"
          textAnchor="middle"
          dominantBaseline="central"
          className="cinzel"
          fontSize="18"
          fill="var(--text)"
          transform="rotate(90 32 32)"
        >
          {count}
        </text>
      </svg>
      <div>
        <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider font-semibold">
          {label}
        </p>
      </div>
    </div>
  );
}

// Compact calendar with real month navigation and a selectable date,
// displays scheduled trip dates visually across the calendar days
function MiniCalendar({ trips, tripDates, onSaveDates }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today);

  // Scheduler Form States
  const [activeTripId, setActiveTripId] = useState("");
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString("default", {
    month: "long",
  });
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingBlanks = (firstDay + 6) % 7; // convert to Mon-first grid

  const cells = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const goToMonth = (delta) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const handleSelect = (day) => {
    if (!day) return;
    const picked = new Date(viewYear, viewMonth, day);
    setSelected(picked);
  };

  const checkTripActiveOnDay = (day) => {
    if (!day) return null;
    const cellDate = new Date(viewYear, viewMonth, day);

    // Find if any trip is scheduled on this date
    for (const trip of trips) {
      const dates = tripDates[trip.id];
      if (dates && dates.startDate && dates.endDate) {
        const start = new Date(dates.startDate + "T00:00:00");
        const end = new Date(dates.endDate + "T23:59:59");
        if (cellDate >= start && cellDate <= end) {
          return { trip, dates };
        }
      }
    }
    return null;
  };

  const handleSave = () => {
    if (!activeTripId || !startInput || !endInput) return;
    onSaveDates?.(activeTripId, startInput, endInput);
    setIsEditing(false);
    setActiveTripId("");
    setStartInput("");
    setEndInput("");
  };

  return (
    <div className="card p-5 text-left border-[var(--border)] bg-[var(--bg-card)]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg-subtle)] border-none transition-colors cursor-pointer bg-transparent"
        >
          ‹
        </button>
        <span className="cinzel text-xs text-[var(--text)] font-bold">
          {monthName} {viewYear}
        </span>
        <button
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg-subtle)] border-none transition-colors cursor-pointer bg-transparent"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center mb-2.5">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <span
            key={d}
            className="text-[10px] text-[var(--text-dim)] uppercase font-bold"
          >
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          const tripInfo = checkTripActiveOnDay(day);
          const isToday = day != null && today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
          return (
            <button
              key={i}
              onClick={() => handleSelect(day)}
              disabled={!day}
              title={tripInfo ? `${tripInfo.trip.name} (${tripInfo.dates.startDate} to ${tripInfo.dates.endDate})` : undefined}
              className={`text-xs w-6 h-6 mx-auto flex items-center justify-center rounded-full transition-all relative border-none bg-transparent
                ${!day ? "invisible" : "cursor-pointer font-semibold"}
                ${tripInfo
                  ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-dashed border-[var(--accent)]/30 font-bold"
                  : isToday
                    ? "border-2 border-[var(--accent)] text-[var(--accent)] font-bold"
                    : "text-[var(--text)] hover:bg-[var(--bg-subtle)]"
                }`}
            >
              {day || ""}
              {tripInfo && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Trip Scheduler Form */}
      <div className="mt-4 pt-3 border-t border-[var(--border)]">
        {!isEditing ? (
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text)]">Schedule & Timelines</span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-[var(--accent)] hover:underline font-bold bg-transparent border-none cursor-pointer"
            >
              + Schedule Trip
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-[var(--text-dim)] uppercase font-bold">Schedule Dates</p>
            <select
              value={activeTripId}
              onChange={(e) => setActiveTripId(e.target.value)}
              className="w-full px-2 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] outline-none cursor-pointer font-semibold"
            >
              <option value="">Choose trip...</option>
              {trips.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] text-[var(--text-dim)] uppercase font-bold block mb-1">Start Date</label>
                <input
                  type="date"
                  value={startInput}
                  onChange={(e) => setStartInput(e.target.value)}
                  className="w-full px-2 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] outline-none font-semibold"
                />
              </div>
              <div>
                <label className="text-[9px] text-[var(--text-dim)] uppercase font-bold block mb-1">End Date</label>
                <input
                  type="date"
                  value={endInput}
                  onChange={(e) => setEndInput(e.target.value)}
                  className="w-full px-2 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] outline-none font-semibold"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-1">
              <button
                onClick={() => setIsEditing(false)}
                className="px-2.5 py-1 text-[10px] rounded-lg border border-[var(--border)] text-[var(--text-dim)] bg-transparent cursor-pointer hover:bg-[var(--bg-subtle)] font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!activeTripId || !startInput || !endInput}
                className="px-2.5 py-1 text-[10px] rounded-lg bg-[var(--accent)] text-white border-none cursor-pointer font-bold hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Display scheduled list */}
        {Object.keys(tripDates).length > 0 && !isEditing && (
          <div className="mt-3 flex flex-col gap-1.5 max-h-24 overflow-y-auto pr-0.5">
            {trips
              .filter(t => tripDates[t.id])
              .map(t => {
                const dates = tripDates[t.id];
                return (
                  <div key={t.id} className="flex items-center justify-between text-[10px] bg-[var(--bg-subtle)] p-2 rounded-lg border border-[var(--border)]/40">
                    <span className="font-bold text-[var(--text)] truncate max-w-[125px]">{t.name}</span>
                    <span className="text-[var(--text-dim)] font-semibold">{new Date(dates.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ➔ {new Date(dates.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- main page ---------- */

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tripDates, setTripDates] = useState({});

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

  // Load scheduler trip dates map from localStorage
  useEffect(() => {
    if (trips.length > 0) {
      const datesMap = {};
      trips.forEach((t) => {
        const stored = localStorage.getItem(`trip_dates_${t.id}`);
        if (stored) datesMap[t.id] = JSON.parse(stored);
      });
      setTripDates(datesMap);
    }
  }, [trips]);

  const handleSaveDates = (tripId, startDate, endDate) => {
    const updatedRange = { startDate, endDate };
    localStorage.setItem(`trip_dates_${tripId}`, JSON.stringify(updatedRange));
    setTripDates((prev) => ({ ...prev, [tripId]: updatedRange }));
  };

  const handleDelete = async (e, tripId, tripName) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${tripName}"? This can't be undone.`)) return;
    try {
      await API.delete(`/trips/${tripId}`);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
      localStorage.removeItem(`trip_dates_${tripId}`);
      setTripDates((prev) => {
        const updated = { ...prev };
        delete updated[tripId];
        return updated;
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete trip");
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const adminTrips = trips.filter((t) => t.role === "admin");
  const memberTrips = trips.filter((t) => t.role === "member");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // all | admin | member
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // Newest first
  const sortedTrips = [...trips].sort((a, b) => {
    if (a.createdAt && b.createdAt)
      return new Date(b.createdAt) - new Date(a.createdAt);
    return b.id > a.id ? 1 : b.id < a.id ? -1 : 0;
  });

  const featuredTrip = sortedTrips[0]; // newest trip, shown in the hero panel
  const restTrips = sortedTrips.slice(1);

  const visibleTrips = restTrips
    .filter((t) => roleFilter === "all" || t.role === roleFilter)
    .filter((t) => t.name.toLowerCase().includes(search.trim().toLowerCase()));

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (loading)
    return (
      <DashboardLayout>
        <p className="text-[var(--text-dim)] animate-pulse">Loading dashboard...</p>
      </DashboardLayout>
    );

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto text-left">
        {/* ── HERO GREETING ── */}
        <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-4">
          <div>
            <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1.5 font-bold">
              {greeting}
            </p>

            <h1 className="cinzel text-3.5xl font-bold text-[var(--text)]">Dashboard</h1>

            <p className="text-sm text-[var(--text-dim)]">
              Welcome back, {user.name} · Travel overview
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center cinzel text-lg font-bold text-white shrink-0">
            {initials}
          </div>
        </div>

        {/* ── FEATURED TRIP + CALENDAR ── */}
        <div
          className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-[2.1fr_1.1fr]"
        >
          {featuredTrip ? (
            <div
              onClick={() => navigate(`/planner/${featuredTrip.id}`)}
              className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] cursor-pointer overflow-hidden
                p-8 flex flex-col justify-between md:flex-row md:items-center gap-6
                hover:border-[var(--accent)]/55 hover:shadow-md transition-all duration-200"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-2 font-bold">
                  {featuredTrip.role === "admin"
                    ? "Currently organising"
                    : "Currently joined"}
                </p>
                <h2 className="cinzel text-3xl font-bold text-[var(--text)] mb-4 truncate" title={featuredTrip.name}>
                  {featuredTrip.name}
                </h2>

                {tripDates[featuredTrip.id] && (
                  <p className="text-xs text-[var(--text-dim)] mb-4 font-semibold">
                    📅 Schedule: {tripDates[featuredTrip.id].startDate} to {tripDates[featuredTrip.id].endDate}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-[var(--accent)] font-bold">
                  Open planner <ArrowRight size={15} />
                </div>
              </div>
              <div className="w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-[var(--border)]/40 shadow-sm">
                <TripImage trip={featuredTrip} className="w-full h-full" />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col justify-center items-center text-center gap-3">
              <Compass size={32} className="text-[var(--text-dim)]/40 animate-spin-slow" />
              <p className="text-[var(--text)] font-semibold text-sm">No recent active trip</p>
              <button
                onClick={() => navigate("/create-trip")}
                className="btn btn-primary px-4 py-2 text-xs"
              >
                Create a Trip
              </button>
            </div>
          )}

          <MiniCalendar trips={trips} tripDates={tripDates} onSaveDates={handleSaveDates} />
        </div>

        {/* ── STATS ROW (donut rings) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <RingStat
            value={trips.length}
            max={Math.max(trips.length, 1)}
            count={trips.length}
            label="Total Trips"
            color="var(--accent)"
          />
          <RingStat
            value={adminTrips.length}
            max={Math.max(trips.length, 1)}
            count={adminTrips.length}
            label="Organised"
            color="#eab308"
          />
          <RingStat
            value={memberTrips.length}
            max={Math.max(trips.length, 1)}
            count={memberTrips.length}
            label="Joined"
            color="#3b82f6"
          />
        </div>

        {/* ── TRIPS SECTION ── */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="cinzel text-xl text-[var(--text)] font-bold">
            {featuredTrip ? "All Other Portfolios" : "Your Trips"}
          </h2>
          <button
            onClick={() => navigate("/create-trip")}
            className="btn btn-primary px-5 py-2.5 text-xs font-bold"
          >
            + New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="card text-center py-16 border-[var(--border)] bg-[var(--bg-card)]">
            <Map
              size={40}
              className="mx-auto mb-4 text-[var(--text-dim)]/40"
              strokeWidth={1.3}
            />
            <p className="cinzel text-xl text-[var(--text)] mb-2 font-bold">
              No trips yet
            </p>
            <p className="text-sm text-[var(--text-dim)] mb-6">
              Start planning your first journey with your travel companions.
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="btn btn-primary px-6 py-3 font-bold"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <>
            {/* Controls: search, role tabs, view toggle */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trips..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-[var(--bg-card)] border border-[var(--border)]
                    text-[var(--text)] placeholder:text-[var(--text-dim)]/50 focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full border border-[var(--border)] p-1 bg-[var(--bg-card)]">
                  {[
                    { key: "all", label: "All" },
                    { key: "admin", label: "Organised" },
                    { key: "member", label: "Joined" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setRoleFilter(tab.key)}
                      className={`px-3.5 py-1.5 text-xs rounded-full border-none transition-colors cursor-pointer font-semibold
                        ${roleFilter === tab.key
                          ? "bg-[var(--accent)] text-white font-bold"
                          : "text-[var(--text-dim)] hover:text-[var(--text)] bg-transparent"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center rounded-full border border-[var(--border)] p-1 bg-[var(--bg-card)]">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`w-7 h-7 border-none rounded-full flex items-center justify-center transition-colors cursor-pointer bg-transparent
                      ${viewMode === "grid" ? "bg-[var(--accent)] text-white" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}
                  >
                    <LayoutGrid size={13} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`w-7 h-7 border-none rounded-full flex items-center justify-center transition-colors cursor-pointer bg-transparent
                      ${viewMode === "list" ? "bg-[var(--accent)] text-white" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}
                  >
                    <Rows3 size={13} />
                  </button>
                </div>
              </div>
            </div>

            {visibleTrips.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-center py-12">
                <Search
                  size={28}
                  className="mx-auto mb-3 text-[var(--text-dim)]/40"
                  strokeWidth={1.3}
                />
                <p className="text-sm text-[var(--text-dim)] font-semibold">
                  No other trips match your search.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div
                className="grid gap-5"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                }}
              >
                {visibleTrips.map((trip, i) => {
                  return (
                    <div
                      key={trip.id}
                      onClick={() => navigate(`/planner/${trip.id}`)}
                      className="card card-hover cursor-pointer group flex flex-col gap-4 text-left relative overflow-hidden"
                      style={{ padding: "0" }}
                    >
                      <div className="h-28 w-full overflow-hidden relative bg-gradient-to-br from-[#426856]/40 to-[#2c3531]/40 shrink-0">
                        <TripImage trip={trip} className="w-full h-full" />
                      </div>

                      <div className="px-5 pt-3 flex-1 flex flex-col gap-1.5">
                        <h3 className="cinzel text-base font-bold text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors">
                          {trip.name}
                        </h3>

                        {tripDates[trip.id] && (
                          <p className="text-[10px] text-[var(--text-dim)] font-semibold">
                            📅 {tripDates[trip.id].startDate} to {tripDates[trip.id].endDate}
                          </p>
                        )}

                        <p className="text-[10px] text-[var(--text-dim)] uppercase font-bold mt-1">
                          {trip.role === "admin"
                            ? "Organizer"
                            : "Companion"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)]/40">
                        <span className="text-xs text-[var(--accent)] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Open planner <ArrowRight size={13} />
                        </span>

                        {trip.role === "admin" && (
                          <button
                            onClick={(e) =>
                              handleDelete(e, trip.id, trip.name)
                            }
                            className="w-7 h-7 border-none rounded-full flex items-center justify-center text-[var(--text-dim)] hover:text-red-500 hover:bg-red-50/10 transition-colors cursor-pointer bg-transparent"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div
                  onClick={() => navigate("/create-trip")}
                  className="rounded-2xl border-2 border-dashed border-[var(--border)] bg-transparent cursor-pointer
                    flex items-center justify-center gap-3 p-5
                    hover:border-[var(--accent)]/55 transition-all duration-200 group min-h-[140px]"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)]/55 transition-colors">
                    <Plus
                      size={15}
                      className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors"
                    />
                  </div>
                  <p className="text-xs text-[var(--text-dim)] font-semibold group-hover:text-[var(--text)] transition-colors">
                    New Portfolio
                  </p>
                </div>
              </div>
            ) : (
              // List view — compact rows
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] divide-y divide-[var(--border)]/65 overflow-hidden">
                {visibleTrips.map((trip, i) => {
                  return (
                    <div
                      key={trip.id}
                      onClick={() => navigate(`/planner/${trip.id}`)}
                      className="flex items-center gap-4 px-5 py-4 cursor-pointer group hover:bg-[var(--bg-subtle)]/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[var(--border)]/40">
                        <TripImage trip={trip} className="w-full h-full" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="cinzel text-sm font-bold text-[var(--text)] truncate">
                          {trip.name}
                        </h3>
                        <p className="text-xs text-[var(--text-dim)] font-medium">
                          {trip.role === "admin" ? "Organized by you" : "Joined by you"}
                          {tripDates[trip.id] && ` · 📅 ${tripDates[trip.id].startDate} to ${tripDates[trip.id].endDate}`}
                        </p>
                      </div>

                      {trip.role === "admin" ? (
                        <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-[var(--accent)] text-white font-bold shrink-0">
                          <Crown size={10} /> Admin
                        </span>
                      ) : (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-dim)] font-bold shrink-0">
                          Member
                        </span>
                      )}

                      {trip.role === "admin" && (
                        <button
                          onClick={(e) => handleDelete(e, trip.id, trip.name)}
                          className="w-8 h-8 border-none rounded-full flex items-center justify-center text-[var(--text-dim)] hover:text-red-500 hover:bg-red-50/10 transition-colors cursor-pointer shrink-0 bg-transparent"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}

                      <ArrowRight
                        size={15}
                        className="text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
