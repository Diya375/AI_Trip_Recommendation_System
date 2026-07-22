import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import {
  Map, DollarSign, Compass, Bot, User, ArrowRight,
  Crown, Plus, Sparkles, MapPin, Star,
  Sunrise, Sun, Moon, ListChecks, UserPlus,
  Mountain, MessageCircle, Building2, PlayCircle,
} from "lucide-react";

import raraImg     from "../../assets/explore/rara.png";
import ilamImg     from "../../assets/explore/ilam.png";
import bandipurImg from "../../assets/explore/bandipur.png";
import mustangImg  from "../../assets/explore/uppermustang.png";

const mainLinks = [
  { label: "Plan Journey",    path: "/planner",   icon: Map,        desc: "Create and manage your trips" },
  { label: "Expense Manager", path: "/expenses",  icon: DollarSign, desc: "Track and split costs fairly" },
  { label: "Explore Nepal",   path: "/explore",   icon: Compass,    desc: "Discover hidden destinations" },
  { label: "AI Assistant",    path: "/assistant", icon: Bot,        desc: "Your personal travel guide" },
  { label: "Profile",         path: "/profile",   icon: User,       desc: "Manage your account" },
];

const gems = [
  { name: "Rara Lake",     tagline: "Nepal's hidden blue jewel",    image: raraImg },
  { name: "Ilam",          tagline: "Tea gardens & eastern serenity", image: ilamImg },
  { name: "Bandipur",      tagline: "Frozen in time medieval town", image: bandipurImg },
  { name: "Upper Mustang", tagline: "The last forbidden kingdom",   image: mustangImg },
];

const tips = [
  "October–November is the best time to trek in Nepal.",
  "Always carry water purification tablets on mountain trails.",
  "Dress in layers — temperatures change drastically with altitude.",
  "Learn a few Nepali words — locals absolutely love it.",
  "Pack light — porters are available but minimalism helps.",
];

const knowBeforeYouGo = [
  { label: "Currency",     value: "Nepali Rupee (NPR)" },
  { label: "Language",     value: "Nepali, widely spoken English" },
  { label: "Best Season",  value: "Oct–Nov & Mar–May" },
  { label: "Visa",         value: "On arrival for most nationalities" },
];

const defaultChecklist = [
  { id: 1, label: "Passport / citizenship ID",  checked: true },
  { id: 2, label: "Travel insurance",           checked: false },
  { id: 3, label: "Trekking permits (TIMS)",    checked: false },
  { id: 4, label: "Cash in NPR",                checked: false },
  { id: 5, label: "First-aid kit",              checked: false },
];

const testimonials = [
  {
    quote: "Planned my whole Pokhara trip in one evening — the budget breakdown saved me so much back-and-forth.",
    name: "Aarav Shrestha",
    meta: "Kathmandu · Pokhara, Solo",
  },
  {
    quote: "We split expenses for a 5-person trek without a single argument. Genuinely useful.",
    name: "Nisha Gurung",
    meta: "Pokhara · EBC, Group",
  },
  {
    quote: "The AI suggested a route through Bandipur I'd never have found on my own. Loved it.",
    name: "Rohan Thapa",
    meta: "Biratnagar · Bandipur, Family",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [user,      setUser]      = useState(null);
  const [trips,     setTrips]     = useState([]);
  const [tipIndex,  setTipIndex]  = useState(0);
  const [checklist, setChecklist] = useState(defaultChecklist);

  useEffect(() => {
    API.get("/auth/me").then((r) => setUser(r.data)).catch(() => {});
    API.get("/trips/my").then((r) => setTrips(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTipIndex((p) => (p + 1) % tips.length), 4000);
    return () => clearInterval(t);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const GreetingIcon = hour < 12 ? Sunrise : hour < 17 ? Sun : Moon;

  const toggleCheck = (id) =>
    setChecklist((p) => p.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));

  const checkedCount = checklist.filter((i) => i.checked).length;
  const recentTrip  = trips[0];
  const adminCount  = trips.filter((t) => t.role === "admin").length;

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto">

        {/* ── GREETING ── */}
        <div className="mb-8">
          <p className="flex items-center gap-1.5 text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1">
            <GreetingIcon size={13} strokeWidth={2} />
            {greeting} 🙏
          </p>
          <h1 className="cinzel text-4xl text-[var(--accent)] mb-1">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Welcome to YatraVerse"}
          </h1>
          <p className="text-sm text-[var(--text-dim)]">Where will your next journey take you?</p>
        </div>

        {/* ── CONTINUE PLANNING ── */}
        {recentTrip && (
          <div className="mb-8 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <PlayCircle size={18} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-0.5">Continue Planning</p>
              <p className="text-sm text-[var(--text)] font-semibold truncate">{recentTrip.name}</p>
            </div>
            <button
              onClick={() => navigate(`/planner/${recentTrip.id}`)}
              className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--accent)]
                font-semibold hover:border-[var(--accent)]/50 transition-all cursor-pointer bg-transparent shrink-0"
            >
              Resume →
            </button>
          </div>
        )}

        {/* ── STATS ── */}
        {trips.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: <Map size={18} strokeWidth={1.8} />,   label: "Your Trips",  value: trips.length,  color: "text-[var(--accent)] bg-[var(--accent)]/10" },
              { icon: <Crown size={18} strokeWidth={1.8} />, label: "As Admin",    value: adminCount,    color: "text-yellow-500 bg-yellow-500/10" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--text)] leading-none">{s.value}</p>
                  <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              </div>
            ))}

            <div
              onClick={() => navigate("/create-trip")}
              className="rounded-2xl bg-[var(--accent)] p-5 flex items-center gap-4 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                <Plus size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">New Trip</p>
                <p className="text-xs text-white/70 uppercase tracking-wider mt-1">Start planning</p>
              </div>
            </div>
          </div>
        )}

        {/* ── QUICK ACCESS ── */}
        <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-3 pl-1">Quick Access</p>
        <div className="grid gap-3 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
          {mainLinks.map(({ label, path, icon: Icon, desc }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] cursor-pointer
                group p-5 flex flex-col gap-3 transition-all duration-200
                hover:border-[var(--accent)]/40 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="cinzel text-sm text-[var(--text)] font-semibold mb-0.5">{label}</h3>
                <p className="text-xs text-[var(--text-dim)] leading-snug">{desc}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all mt-auto self-end"
              />
            </div>
          ))}
        </div>

        {/* ── TRAVEL TIP ── */}
        <div className="mb-10 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
            <Sparkles size={18} strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-0.5">Travel Tip</p>
            <p className="text-sm text-[var(--text)] transition-all duration-500">{tips[tipIndex]}</p>
          </div>
        </div>

        {/* ── HIDDEN GEMS ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="cinzel text-xl text-[var(--text)] flex items-center gap-2">
              <Mountain size={18} strokeWidth={1.8} className="text-[var(--accent)]" />
              Hidden Gems of Nepal
            </h2>
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
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] cursor-pointer
                  overflow-hidden transition-all duration-200 hover:border-[var(--accent)]/40 hover:shadow-md group"
              >
                <div className="overflow-hidden h-32">
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="cinzel text-sm text-[var(--text)] font-semibold">{gem.name}</p>
                  <p className="text-xs text-[var(--text-dim)] mt-0.5 leading-snug">{gem.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KNOW BEFORE YOU GO + CHECKLIST ── */}
        <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                <MapPin size={16} strokeWidth={1.8} />
              </div>
              <h2 className="cinzel text-base text-[var(--text)]">Know Before You Go</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {knowBeforeYouGo.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-sm border-b border-[var(--border)] pb-2 last:border-0 last:pb-0">
                  <span className="text-[var(--text-dim)]">{f.label}</span>
                  <span className="text-[var(--text)] font-medium text-right">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                  <ListChecks size={16} strokeWidth={1.8} />
                </div>
                <h2 className="cinzel text-base text-[var(--text)]">Packing Checklist</h2>
              </div>
              <span className="text-xs text-[var(--text-dim)]">{checkedCount}/{checklist.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {checklist.map((item) => (
                <label key={item.id} className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    className="accent-[var(--accent)] w-4 h-4 cursor-pointer"
                  />
                  <span className={item.checked ? "text-[var(--text-dim)] line-through" : "text-[var(--text)]"}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ── PLAN WITH FRIENDS ── */}
        <div className="mb-10 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
            <UserPlus size={18} strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-[var(--text)] font-semibold">Plan a trip with friends or family</p>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">Invite others and split costs automatically as you go.</p>
          </div>
          <button
            onClick={() => navigate("/planner")}
            className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold
              hover:opacity-90 transition-opacity border-none cursor-pointer shrink-0"
          >
            Invite
          </button>
        </div>

        {/* ── TESTIMONIALS ── */}
        <div className="mb-10">
          <h2 className="cinzel text-xl text-[var(--text)] mb-1 flex items-center gap-2">
            <MessageCircle size={18} strokeWidth={1.8} className="text-[var(--accent)]" />
            Loved by Travelers
          </h2>
          <p className="text-xs text-[var(--text-dim)] mb-4">Real trips planned across Nepal and beyond</p>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex flex-col gap-3">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm text-[var(--text)] leading-snug">"{t.quote}"</p>
                <div className="mt-auto pt-2 border-t border-[var(--border)]">
                  <p className="text-xs font-semibold text-[var(--text)]">{t.name}</p>
                  <p className="text-[11px] text-[var(--text-dim)]">{t.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <div className="mb-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
            <Building2 size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="cinzel text-lg text-[var(--text)] mb-1">About YatraVerse</h2>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed">
              YatraVerse is your AI travel companion for planning trips across Nepal and beyond.
              Build day-by-day itineraries, split expenses with your group, and get personal
              recommendations for hidden gems most guidebooks miss — all in one place.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}