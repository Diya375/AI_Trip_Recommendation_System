import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
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

/* ---------- trip image ---------- */
/* One real photo per trip (uploaded by the user), not a generated illustration.
   Looks for trip.image / trip.coverImage / trip.imageUrl — adjust the field name
   to whatever your backend actually returns. Falls back to a plain neutral
   placeholder for trips that don't have an image yet. */

function TripImage({ trip, className }) {
  const src = trip.image || trip.coverImage || trip.imageUrl;

  if (!src) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center`}
      >
        <Map size={22} className="text-gray-300" strokeWidth={1.4} />
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
    <div className="card p-5 flex items-center gap-4">
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
        <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}

// Compact calendar with real month navigation and a selectable date,
// mirrors the Timeline calendar module in the reference but is actually interactive.
function MiniCalendar({ onSelectDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today);

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

  const goToToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelected(today);
    onSelectDate?.(today);
  };

  const handleSelect = (day) => {
    if (!day) return;
    const picked = new Date(viewYear, viewMonth, day);
    setSelected(picked);
    onSelectDate?.(picked);
  };

  const isSameDay = (a, day) =>
    day != null &&
    a.getFullYear() === viewYear &&
    a.getMonth() === viewMonth &&
    a.getDate() === day;

  const isToday = (day) => isSameDay(today, day);
  const isSelected = (day) => isSameDay(selected, day);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors cursor-pointer"
        >
          ‹
        </button>
        <button
          onClick={goToToday}
          className="cinzel text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          title="Jump to today"
        >
          {monthName} {viewYear}
        </button>
        <button
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors cursor-pointer"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <span
            key={d}
            className="text-[10px] text-[var(--text-dim)] uppercase"
          >
            {d}
          </span>
        ))}
        {cells.map((day, i) => (
          <button
            key={i}
            onClick={() => handleSelect(day)}
            disabled={!day}
            className={`text-xs w-6 h-6 mx-auto flex items-center justify-center rounded-full transition-colors
              ${!day ? "invisible" : "cursor-pointer"}
              ${
                isSelected(day)
                  ? "bg-[var(--accent)] text-white font-semibold"
                  : isToday(day)
                    ? "border border-[var(--accent)] text-[var(--accent)] font-semibold"
                    : "text-[var(--text)] hover:bg-[var(--border)]"
              }`}
          >
            {day || ""}
          </button>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between">
        <p className="text-[11px] text-[var(--text-dim)]">
          {selected.toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
        <Compass size={14} className="text-[var(--text-dim)]" />
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
    e.stopPropagation();
    if (!window.confirm(`Delete "${tripName}"? This can't be undone.`)) return;
    try {
      await API.delete(`/trips/${tripId}`);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
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

  // Newest first — prefer createdAt if the API provides it, otherwise fall back
  // to id (assumes numeric/sequential or string-sortable ids from the backend).
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
        <p className="text-[var(--text-dim)]">Loading...</p>
      </DashboardLayout>
    );

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto">
        {/* ── HERO GREETING ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1">
              {greeting}
            </p>
            <h1 className="cinzel text-4xl text-[var(--accent)] mb-1">
              {user.name.split(" ")[0]}'s Dashboard
            </h1>
            <p className="text-sm text-[var(--text-dim)]">
              Your journey at a glance
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center cinzel text-xl font-bold text-white shrink-0">
            {initials}
          </div>
        </div>

        {/* ── FEATURED TRIP + CALENDAR ── */}
        <div
          className="grid gap-4 mb-8"
          style={{ gridTemplateColumns: "2fr 1fr" }}
        >
          {featuredTrip && (
            <div
              onClick={() => navigate(`/planner/${featuredTrip.id}`)}
              className="relative rounded-2xl border border-gray-200 cursor-pointer overflow-hidden
                p-8 flex items-center justify-between gap-6 bg-white
                hover:border-[var(--accent)]/50 hover:shadow-md transition-all duration-200"
            >
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                  {featuredTrip.role === "admin"
                    ? "Currently organising"
                    : "Currently joined"}
                </p>
                <h2 className="cinzel text-4xl text-gray-900 mb-4">
                  {featuredTrip.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-[var(--accent)] font-medium">
                  Open planner <ArrowRight size={15} />
                </div>
              </div>
              <div className="w-36 h-28 rounded-xl overflow-hidden shrink-0">
                <TripImage trip={featuredTrip} className="w-full h-full" />
              </div>
            </div>
          )}

          <MiniCalendar />
        </div>

        {/* ── STATS ROW (donut rings) ── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
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
            color="#60a5fa"
          />
        </div>

        {/* ── TRIPS SECTION ── */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="cinzel text-xl text-[var(--text)]">
            {featuredTrip ? "All Trips" : "Your Trips"}
          </h2>
          <button
            onClick={() => navigate("/create-trip")}
            className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <Plus size={15} /> New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="card text-center py-16">
            <Map
              size={40}
              className="mx-auto mb-4 text-[var(--text-dim)]"
              strokeWidth={1.3}
            />
            <p className="cinzel text-xl text-[var(--text)] mb-2">
              No trips yet
            </p>
            <p className="text-sm text-[var(--text-dim)] mb-6">
              Start planning your first journey with your travel companions.
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="btn btn-primary px-6 py-3"
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
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-full bg-[var(--bg-card)] border border-[var(--border)]
                    text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
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
                      className={`px-3 py-1.5 text-xs rounded-full transition-colors cursor-pointer
                        ${
                          roleFilter === tab.key
                            ? "bg-[var(--accent)] text-white font-medium"
                            : "text-[var(--text-dim)] hover:text-[var(--text)]"
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer
                      ${viewMode === "grid" ? "bg-[var(--accent)] text-white" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer
                      ${viewMode === "list" ? "bg-[var(--accent)] text-white" : "text-[var(--text-dim)] hover:text-[var(--text)]"}`}
                  >
                    <Rows3 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {visibleTrips.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white text-center py-12">
                <Search
                  size={28}
                  className="mx-auto mb-3 text-gray-300"
                  strokeWidth={1.3}
                />
                <p className="text-sm text-gray-500">
                  No trips match your search.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                }}
              >
                {visibleTrips.map((trip, i) => {
                  return (
                    <div
                      key={trip.id}
                      onClick={() => navigate(`/planner/${trip.id}`)}
                      className="relative rounded-2xl border border-gray-200 cursor-pointer group
                        bg-white overflow-hidden transition-all duration-200
                        hover:border-[var(--accent)]/50 hover:shadow-md"
                    >
                      <div className="h-28 w-full overflow-hidden">
                        <TripImage trip={trip} className="w-full h-full" />
                      </div>

                      <div className="flex items-center gap-3 px-5 pt-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="cinzel text-base font-semibold text-gray-900 leading-tight truncate">
                            {trip.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {trip.role === "admin"
                              ? "You organised this"
                              : "You joined this trip"}
                          </p>
                        </div>

                        {trip.role === "admin" ? (
                          <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[var(--accent)] text-white font-medium shrink-0">
                            <Crown size={10} /> Admin
                          </span>
                        ) : (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 shrink-0">
                            Member
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between px-5 py-3 mt-2">
                        <span className="text-xs text-gray-400">
                          Open planner
                        </span>
                        <div className="flex items-center gap-1">
                          {trip.role === "admin" && (
                            <button
                              onClick={(e) =>
                                handleDelete(e, trip.id, trip.name)
                              }
                              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                          <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-[var(--accent)] transition-all">
                            <ArrowRight
                              size={13}
                              className="text-gray-400 group-hover:text-white transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  onClick={() => navigate("/create-trip")}
                  className="rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer
                    flex items-center justify-center gap-3 p-5
                    hover:border-[var(--accent)]/50 transition-all duration-200 group min-h-[92px]"
                >
                  <div className="w-9 h-9 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center group-hover:border-[var(--accent)]/50 transition-colors">
                    <Plus
                      size={16}
                      className="text-gray-400 group-hover:text-[var(--accent)] transition-colors"
                    />
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                    New Trip
                  </p>
                </div>
              </div>
            ) : (
              // List view — compact rows, better for scanning many trips
              <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden">
                {visibleTrips.map((trip, i) => {
                  return (
                    <div
                      key={trip.id}
                      onClick={() => navigate(`/planner/${trip.id}`)}
                      className="flex items-center gap-4 px-5 py-4 cursor-pointer group hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <TripImage trip={trip} className="w-full h-full" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="cinzel text-sm font-semibold text-gray-900 truncate">
                          {trip.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {trip.role === "admin"
                            ? "You organised this"
                            : "You joined this trip"}
                        </p>
                      </div>

                      {trip.role === "admin" ? (
                        <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[var(--accent)] text-white font-medium shrink-0">
                          <Crown size={10} /> Admin
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 shrink-0">
                          Member
                        </span>
                      )}

                      {trip.role === "admin" && (
                        <button
                          onClick={(e) => handleDelete(e, trip.id, trip.name)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}

                      <ArrowRight
                        size={15}
                        className="text-gray-300 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
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
