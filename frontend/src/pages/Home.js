import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
  Map, DollarSign, Compass, Bot, User, ArrowRight,
  Crown, Plus, Sparkles, MapPin, Search, Star,
  Sunrise, Sun, Moon, Info, ListChecks, UserPlus,
  Mountain, MessageCircle, Building2, PlayCircle,
} from "lucide-react";

// Reusing the same destination photos already used on the Explore page —
// only 4 images are pulled in here, matching the 4 Hidden Gems cards below.
import raraImg     from "../assets/explore/rara.png";
import ilamImg     from "../assets/explore/ilam.png";
import bandipurImg from "../assets/explore/bandipur.png";
import mustangImg  from "../assets/explore/uppermustang.png";

const mainLinks = [
  { label: "Plan Journey",    path: "/planner",  icon: Map,        desc: "Create and manage your trips" },
  { label: "Expense Manager", path: "/expenses", icon: DollarSign, desc: "Track and split costs fairly" },
  { label: "Explore Nepal",   path: "/explore",  icon: Compass,    desc: "Discover hidden destinations" },
  { label: "AI Assistant",    path: "/assistant",icon: Bot,        desc: "Your personal travel guide" },
  { label: "Profile",         path: "/profile",  icon: User,       desc: "Manage your account" },
];

const gems = [
  { name: "Rara Lake",     tagline: "Nepal's hidden blue jewel",       image: raraImg },
  { name: "Ilam",          tagline: "Tea gardens & eastern serenity",  image: ilamImg },
  { name: "Bandipur",      tagline: "Frozen in time medieval town",    image: bandipurImg },
  { name: "Upper Mustang", tagline: "The last forbidden kingdom",      image: mustangImg },
];

// Popular pre-built itineraries — kept icon-only, no extra images
const itineraries = [
  { title: "Pokhara 3 Days",    tag: "Nepal",    note: "Lakeside & paragliding" },
  { title: "Everest Base Camp", tag: "Trek",     note: "12 days, classic route" },
  { title: "Chitwan 2 Nights",  tag: "Wildlife", note: "Jungle safari escape" },
  { title: "Bali 5 Days",       tag: "SE Asia",  note: "Under ₹60k" },
];

const trendingDestinations = [
  "Kathmandu", "Pokhara", "Chitwan", "Lumbini", "Mustang", "Bandipur",
];

const testimonials = [
  {
    quote: "Planned my whole Pokhara trip in one evening — the day-by-day budget breakdown saved me so much back-and-forth.",
    name: "Aarav Shrestha",
    meta: "Kathmandu · Pokhara, Solo",
  },
  {
    quote: "We split expenses for a 5-person trek without a single argument about who owed what. Genuinely useful.",
    name: "Nisha Gurung",
    meta: "Pokhara · EBC, Group",
  },
  {
    quote: "The AI assistant suggested a route through Bandipur I'd never have found on my own. Loved it.",
    name: "Rohan Thapa",
    meta: "Biratnagar · Bandipur, Family",
  },
];

const tips = [
  "October–November is the best time to trek in Nepal.",
  "Always carry water purification tablets on mountain trails.",
  "Dress in layers — temperatures change drastically with altitude.",
  "Learn a few Nepali words — locals absolutely love it.",
  "Pack light — porters are available but minimalism helps.",
];

const knowBeforeYouGo = [
  { label: "Currency",   value: "Nepali Rupee (NPR)" },
  { label: "Language",   value: "Nepali, widely spoken English" },
  { label: "Best Season", value: "Oct–Nov & Mar–May" },
  { label: "Visa",       value: "On arrival for most nationalities" },
];

const defaultChecklist = [
  { id: 1, label: "Passport / citizenship ID", checked: true },
  { id: 2, label: "Travel insurance", checked: false },
  { id: 3, label: "Trekking permits (TIMS)", checked: false },
  { id: 4, label: "Cash in NPR", checked: false },
  { id: 5, label: "First-aid kit", checked: false },
];

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [tipIndex, setTipIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [checklist, setChecklist] = useState(defaultChecklist);

  useEffect(() => {
    API.get("/auth/me").then((res) => setUser(res.data)).catch(() => {});
    API.get("/trips/my").then((res) => setTrips(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const GreetingIcon = hour < 12 ? Sunrise : hour < 17 ? Sun : Moon;

  const handleSearch = () => {
    if (query.trim()) navigate(`/planner?q=${encodeURIComponent(query.trim())}`);
  };

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };
  const checkedCount = checklist.filter((i) => i.checked).length;

  const recentTrip = trips[0];

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto">

        {/* ── HERO GREETING ── */}
        <div className="mb-6">
          <p className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest mb-1">
            <GreetingIcon size={13} strokeWidth={2} />
            {greeting}
          </p>
          <h1 className="cinzel text-4xl text-[var(--accent)] mb-2">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Welcome to YatraVerse"}
          </h1>
          <p className="text-gray-500 text-sm">Where will your next journey take you?</p>
        </div>

        {/* ── HERO SEARCH BAR ── */}
        <div className="mb-10 p-2 rounded-2xl border border-gray-200 bg-white flex items-center gap-2 shadow-sm">
          <div className="pl-3 text-gray-300">
            <Search size={18} strokeWidth={2} />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Try 'Pokhara 3 days under ₹15,000' or 'best treks in October'"
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 py-2"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold
              hover:opacity-90 transition-opacity border-none cursor-pointer shrink-0"
          >
            Search
          </button>
        </div>

        {/* ── CONTINUE PLANNING ── */}
        {recentTrip && (
          <div className="mb-10 p-5 rounded-2xl border border-gray-200 bg-white flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <PlayCircle size={18} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Continue Planning</p>
              <p className="text-sm text-gray-900 font-medium truncate">{recentTrip.name}</p>
            </div>
            <button
              onClick={() => navigate(`/planner/${recentTrip.id}`)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-[var(--accent)] font-semibold
                hover:border-[var(--accent)]/50 transition-all cursor-pointer bg-transparent shrink-0"
            >
              Resume
            </button>
          </div>
        )}

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
        <div className="mb-4">
          <p className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest pl-1">
            <Compass size={13} strokeWidth={2} />
            Quick Access
          </p>
        </div>
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

      

        {/* ── HIDDEN GEMS (real photos) ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="cinzel text-xl text-gray-900 flex items-center gap-2">
              <Mountain size={18} strokeWidth={1.8} className="text-[var(--accent)]" />
              Popular Itineraries
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
                className="rounded-2xl border border-gray-200 bg-white cursor-pointer overflow-hidden
                  transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-md"
              >
                <img src={gem.image} alt={gem.name} className="w-full h-28 object-cover" />
                <div className="p-4">
                  <p className="cinzel text-sm text-gray-900 font-semibold">{gem.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{gem.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRENDING DESTINATIONS ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <MapPin size={16} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="cinzel text-lg text-gray-900 leading-tight">Trending Destinations</h2>
              <p className="text-xs text-gray-400">Jump straight into planning</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {trendingDestinations.map((place) => (
              <button
                key={place}
                onClick={() => navigate(`/planner?q=${encodeURIComponent(place)}`)}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700
                  hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all cursor-pointer"
              >
                {place}
              </button>
            ))}
          </div>
        </div>

        {/* ── KNOW BEFORE YOU GO + PACKING CHECKLIST ── */}
        <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                <Info size={16} strokeWidth={1.8} />
              </div>
              <h2 className="cinzel text-base text-gray-900">Know Before You Go</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {knowBeforeYouGo.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-400">{f.label}</span>
                  <span className="text-gray-800 font-medium text-right">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                  <ListChecks size={16} strokeWidth={1.8} />
                </div>
                <h2 className="cinzel text-base text-gray-900">Packing Checklist</h2>
              </div>
              <span className="text-xs text-gray-400">{checkedCount}/{checklist.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 text-sm cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="accent-[var(--accent)] w-4 h-4 cursor-pointer"
                  />
                  <span className={item.checked ? "text-gray-400 line-through" : "text-gray-700"}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* ── PLAN WITH FRIENDS ── */}
        <div className="mb-10 p-5 rounded-2xl border border-gray-200 bg-white flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
            <UserPlus size={18} strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900 font-medium">Plan a trip with friends or family</p>
            <p className="text-xs text-gray-500 mt-0.5">Invite others to a trip and split costs automatically as you go.</p>
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
          <h2 className="cinzel text-xl text-gray-900 mb-1 flex items-center gap-2">
            <MessageCircle size={18} strokeWidth={1.8} className="text-[var(--accent)]" />
            Loved by Travelers
          </h2>
          <p className="text-xs text-gray-400 mb-4">Real trips planned across Nepal and beyond</p>

          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-3">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-snug">"{t.quote}"</p>
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                  <p className="text-[11px] text-gray-400">{t.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABOUT ── */}
        <div className="mb-4 p-6 rounded-2xl border border-gray-200 bg-white flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
            <Building2 size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="cinzel text-lg text-gray-900 mb-1">About YatraVerse</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
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