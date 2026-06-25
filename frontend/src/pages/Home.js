import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { Map, DollarSign, Compass, Bot, User, ArrowRight } from "lucide-react";

const mainLinks = [
  { label: "Plan Journey",     path: "/planner",   icon: <Map size={22} />,        desc: "Create and manage your trips" },
  { label: "Expense Manager",  path: "/expenses",  icon: <DollarSign size={22} />, desc: "Track and split costs fairly" },
  { label: "Explore Nepal",    path: "/explore",   icon: <Compass size={22} />,    desc: "Discover hidden destinations" },
  { label: "AI Assistant",     path: "/assistant", icon: <Bot size={22} />,        desc: "Your personal travel guide" },
  { label: "Profile",          path: "/profile",   icon: <User size={22} />,       desc: "Manage your account" },
];

const gems = [
  { name: "Rara Lake",     emoji: "🏔️", tagline: "Nepal's hidden blue jewel" },
  { name: "Ilam",          emoji: "🍵", tagline: "Tea gardens & eastern serenity" },
  { name: "Bandipur",      emoji: "🏘️", tagline: "Frozen in time medieval town" },
  { name: "Upper Mustang", emoji: "🏜️", tagline: "The last forbidden kingdom" },
];

const tips = [
  { emoji: "🌤️", tip: "October–November is the best time to trek in Nepal." },
  { emoji: "💧", tip: "Always carry water purification tablets on mountain trails." },
  { emoji: "🧢", tip: "Dress in layers — temperatures change drastically with altitude." },
  { emoji: "🤝", tip: "Learn a few Nepali words — locals absolutely love it." },
  { emoji: "🎒", tip: "Pack light — porters are available but minimalism helps." },
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

        {/* Hero greeting */}
        <div className="mb-10">
          <p className="text-sm text-[var(--text-dim)] tracking-widest uppercase mb-1">
            {greeting} 🙏
          </p>
          <h1 className="cinzel text-4xl text-[var(--accent)] mb-2">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Welcome to YatraVerse"}
          </h1>
          <p className="text-[var(--text-dim)] text-base">
            Where will your next journey take you?
          </p>
        </div>

        {/* Quick stats */}
        {trips.length > 0 && (
          <div className="flex gap-4 mb-10 flex-wrap">
            <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3">
              <span className="text-xl">🛣️</span>
              <div>
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider">Your Trips</p>
                <p className="text-lg font-bold text-[var(--text)]">{trips.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3">
              <span className="text-xl">👑</span>
              <div>
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider">As Admin</p>
                <p className="text-lg font-bold text-[var(--text)]">
                  {trips.filter((t) => t.role === "admin").length}
                </p>
              </div>
            </div>
            <div
              onClick={() => navigate("/planner")}
              className="flex items-center gap-3 bg-[var(--accent)] rounded-xl px-4 py-3 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-xl">➕</span>
              <div>
                <p className="text-xs text-white/70 uppercase tracking-wider">New Trip</p>
                <p className="text-sm font-semibold text-white">Start planning</p>
              </div>
            </div>
          </div>
        )}

        {/* Main nav cards */}
        <div className="grid gap-3 mb-12" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
          {mainLinks.map(({ label, path, icon, desc }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="card card-hover cursor-pointer group p-5 flex flex-col gap-3"
            >
              <div className="text-[var(--accent)] group-hover:scale-110 transition-transform duration-200 w-fit">
                {icon}
              </div>
              <div>
                <h3 className="cinzel text-sm text-[var(--text)] font-semibold mb-0.5">{label}</h3>
                <p className="text-xs text-[var(--text-dim)] leading-snug">{desc}</p>
              </div>
              <ArrowRight size={14} className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors mt-auto self-end" />
            </div>
          ))}
        </div>

        {/* Rotating travel tip */}
        <div className="mb-12 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center gap-4">
          <span className="text-2xl shrink-0">{tips[tipIndex].emoji}</span>
          <div>
            <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-0.5">Travel Tip</p>
            <p className="text-sm text-[var(--text)] transition-all duration-500">{tips[tipIndex].tip}</p>
          </div>
        </div>

        {/* Hidden gems */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="cinzel text-xl text-[var(--text)]">Hidden Gems of Nepal</h2>
            <button
              onClick={() => navigate("/explore")}
              className="text-xs text-[var(--accent)] flex items-center gap-1 bg-transparent border-none cursor-pointer hover:underline"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            {gems.map((gem) => (
              <div
                key={gem.name}
                onClick={() => navigate("/explore")}
                className="card card-hover cursor-pointer p-5 flex items-center gap-4"
              >
                <span className="text-3xl shrink-0">{gem.emoji}</span>
                <div>
                  <p className="cinzel text-sm text-[var(--accent)] font-semibold">{gem.name}</p>
                  <p className="text-xs text-[var(--text-dim)] mt-0.5 leading-snug">{gem.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}