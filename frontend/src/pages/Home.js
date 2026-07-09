import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
  Map, DollarSign, Compass, Bot, User, ArrowRight,
  Crown, Plus, Sparkles, MapPin,
} from "lucide-react";

const mainLinks = [
  { label: "Plan Journey",    path: "/planner",  icon: Map,        desc: "Create and manage your trips" },
  { label: "Expense Manager", path: "/expenses", icon: DollarSign, desc: "Track and split costs fairly" },
  { label: "Explore Nepal",   path: "/explore",  icon: Compass,    desc: "Discover hidden destinations" },
  { label: "AI Assistant",    path: "/assistant",icon: Bot,        desc: "Your personal travel guide" },
  { label: "Profile",         path: "/profile",  icon: User,       desc: "Manage your account" },
];

// No images yet — cards show a placeholder until real photos are added
const gems = [
  { name: "Rara Lake",     tagline: "Nepal's hidden blue jewel",       image: null },
  { name: "Ilam",          tagline: "Tea gardens & eastern serenity",  image: null },
  { name: "Bandipur",      tagline: "Frozen in time medieval town",    image: null },
  { name: "Upper Mustang", tagline: "The last forbidden kingdom",      image: null },
];

const tips = [
  "October–November is the best time to trek in Nepal.",
  "Always carry water purification tablets on mountain trails.",
  "Dress in layers — temperatures change drastically with altitude.",
  "Learn a few Nepali words — locals absolutely love it.",
  "Pack light — porters are available but minimalism helps.",
];

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    API.get("/auth/me").then((res) => setUser(res.data)).catch(() => {});
    API.get("/trips/my").then((res) => setTrips(res.data)).catch(() => {});
  }, []);

  // rotate travel tip every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto">

        {/* ── HERO GREETING ── */}
        <div className="mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{greeting}</p>
          <h1 className="cinzel text-4xl text-[var(--accent)] mb-2">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Welcome to YatraVerse"}
          </h1>
          <p className="text-gray-500 text-sm">Where will your next journey take you?</p>
        </div>

        {/* ── QUICK STATS ── */}
        {trips.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                <Map size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">{trips.length}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Your Trips</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-500 shrink-0">
                <Crown size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">
                  {trips.filter((t) => t.role === "admin").length}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">As Admin</p>
              </div>
            </div>

            <div
              onClick={() => navigate("/planner")}
              className="rounded-2xl bg-[var(--accent)] p-5 flex items-center gap-4 cursor-pointer
                hover:opacity-90 transition-opacity"
            >
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                <Plus size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">Start planning</p>
                <p className="text-xs text-white/70 uppercase tracking-wider mt-1">New Trip</p>
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN NAV CARDS ── */}
        <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}>
          {mainLinks.map(({ label, path, icon: Icon, desc }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="rounded-2xl border border-gray-200 bg-white cursor-pointer group p-5
                flex flex-col gap-3 transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="cinzel text-sm text-gray-900 font-semibold mb-0.5">{label}</h3>
                <p className="text-xs text-gray-500 leading-snug">{desc}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-gray-300 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all mt-auto self-end"
              />
            </div>
          ))}
        </div>

        {/* ── ROTATING TRAVEL TIP ── */}
        <div className="mb-10 p-5 rounded-2xl border border-gray-200 bg-white flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
            <Sparkles size={18} strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Travel Tip</p>
            <p className="text-sm text-gray-900 transition-all duration-500">{tips[tipIndex]}</p>
          </div>
        </div>

        {/* ── HIDDEN GEMS ── */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="cinzel text-xl text-gray-900">Hidden Gems of Nepal</h2>
            <button
              onClick={() => navigate("/explore")}
              className="text-xs text-[var(--accent)] flex items-center gap-1 bg-transparent border-none cursor-pointer hover:underline"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {gems.map((gem) => (
              <div
                key={gem.name}
                onClick={() => navigate("/explore")}
                className="rounded-2xl border border-gray-200 bg-white cursor-pointer overflow-hidden
                  transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-md"
              >
                {gem.image ? (
                  <img src={gem.image} alt={gem.name} className="w-full h-28 object-cover" />
                ) : (
                  <div className="w-full h-28 bg-gray-100 flex items-center justify-center">
                    <MapPin size={20} className="text-gray-300" strokeWidth={1.4} />
                  </div>
                )}
                <div className="p-4">
                  <p className="cinzel text-sm text-gray-900 font-semibold">{gem.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{gem.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}