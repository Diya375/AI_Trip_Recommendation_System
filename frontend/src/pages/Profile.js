import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { Check, X, Eye, EyeOff } from "lucide-react";

const TRAVEL_STYLES = ["Adventure", "Trekking", "Cultural", "Relaxing", "Wildlife", "Road Trip", "Beach", "Hidden Gems"];

const BADGES = [
  { id: "first_trip",    icon: "🛣️", label: "First Journey",     desc: "Created your first trip",          condition: (trips) => trips.length >= 1 },
  { id: "explorer",      icon: "🧭", label: "Explorer",           desc: "Joined 3 or more trips",           condition: (trips) => trips.length >= 3 },
  { id: "trip_master",   icon: "👑", label: "Trip Master",        desc: "Organised 3 or more trips",        condition: (trips) => trips.filter(t => t.role === "admin").length >= 3 },
  { id: "team_player",   icon: "🤝", label: "Team Player",        desc: "Joined a trip as member",          condition: (trips) => trips.filter(t => t.role === "member").length >= 1 },
  { id: "yatra_veteran", icon: "🏔️", label: "Yatra Veteran",      desc: "Been on 5 or more trips",          condition: (trips) => trips.length >= 5 },
  { id: "nepal_heart",   icon: "🇳🇵", label: "Heart of Nepal",    desc: "A true Nepal travel enthusiast",   condition: (trips) => trips.length >= 2 },
];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [selectedStyles, setSelectedStyles] = useState([]);

  useEffect(() => {
    Promise.all([API.get("/auth/me"), API.get("/trips/my")])
      .then(([userRes, tripsRes]) => {
        setUser(userRes.data);
        setTrips(tripsRes.data);
        setNewName(userRes.data.name);
        setNewEmail(userRes.data.email);
        setSelectedStyles(userRes.data.travel_styles || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (field) => {
    setSaving(true);
    try {
      const payload = field === "name" ? { name: newName } : { email: newEmail };
      await API.put("/auth/profile", payload);
      setUser((prev) => ({ ...prev, ...payload }));
      field === "name" ? setEditingName(false) : setEditingEmail(false);
      setSaveMsg(`${field === "name" ? "Name" : "Email"} updated!`);
      setTimeout(() => setSaveMsg(""), 2500);
    } catch {
      setSaveMsg("Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  const toggleStyle = async (style) => {
    const updated = selectedStyles.includes(style)
      ? selectedStyles.filter((s) => s !== style)
      : [...selectedStyles, style];
    setSelectedStyles(updated);
    try {
      await API.put("/auth/profile", { travel_styles: updated });
    } catch {}
  };

  const handlePasswordChange = async () => {
    setPasswordErr("");
    setPasswordMsg("");
    if (!currentPassword || !newPassword) return setPasswordErr("Please fill both fields.");
    if (newPassword.length < 6) return setPasswordErr("Min 6 characters.");
    setSavingPassword(true);
    try {
      await API.put("/auth/change-password", { currentPassword, newPassword });
      setPasswordMsg("Password changed!");
      setCurrentPassword(""); setNewPassword("");
      setShowPasswordForm(false);
      setTimeout(() => setPasswordMsg(""), 3000);
    } catch (err) {
      setPasswordErr(err.response?.data?.error || "Failed.");
    } finally {
      setSavingPassword(false);
    }
  };

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";
  const adminTrips = trips.filter((t) => t.role === "admin");
  const memberTripsCount = trips.filter((t) => t.role === "member").length;
  const earnedBadges = BADGES.filter((b) => b.condition(trips));
  const lockedBadges = BADGES.filter((b) => !b.condition(trips));

  // traveler rank
  const rank =
    trips.length === 0 ? { label: "Newcomer",       emoji: "🌱" } :
    trips.length < 3   ? { label: "Wanderer",        emoji: "🚶" } :
    trips.length < 6   ? { label: "Explorer",        emoji: "🧭" } :
    trips.length < 10  ? { label: "Adventurer",      emoji: "⛰️" } :
                         { label: "Yatra Legend",     emoji: "🏔️" };

  if (loading) return (
    <DashboardLayout>
      <p className="text-[var(--text-dim)]">Loading...</p>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="fade-up max-w-2xl mx-auto">

        {/* ── HERO ── */}
        <div className="card p-8 mb-5 text-center relative overflow-hidden">
          {/* background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 40%)" }}
          />

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-[var(--accent)] flex items-center justify-center cinzel text-3xl font-bold text-white mx-auto mb-4 relative">
            {initials}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border)] flex items-center justify-center text-sm">
              {rank.emoji}
            </div>
          </div>

          <h1 className="cinzel text-2xl text-[var(--text)] mb-1">{user?.name}</h1>
          <p className="text-sm text-[var(--text-dim)] mb-1">{user?.email}</p>
          <p className="text-xs text-[var(--text-dim)] opacity-60 mb-4">Explorer since {memberSince}</p>

          {/* Rank badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full px-4 py-1.5 mb-6">
            <span>{rank.emoji}</span>
            <span className="text-sm font-semibold text-[var(--accent)]">{rank.label}</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: "🛣️", value: trips.length,       label: "Total Trips" },
              { emoji: "👑", value: adminTrips.length,   label: "Organised" },
              { emoji: "🤝", value: memberTripsCount,    label: "Joined" },
            ].map((s, i) => (
              <div key={i} className="bg-[var(--bg)] rounded-xl py-3 border border-[var(--border)]">
                <p className="text-xl mb-0.5">{s.emoji}</p>
                <p className="text-xl font-bold text-[var(--text)]">{s.value}</p>
                <p className="text-xs text-[var(--text-dim)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRAVEL STYLE ── */}
        <div className="card p-6 mb-5">
          <h3 className="cinzel text-base text-[var(--text)] mb-1">🎒 My Travel Style</h3>
          <p className="text-xs text-[var(--text-dim)] mb-4">Select all that describe you — this helps personalize your experience.</p>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 cursor-pointer
                  ${selectedStyles.includes(style)
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text-dim)] bg-transparent hover:border-[var(--accent)]"
                  }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* ── BADGES ── */}
        <div className="card p-6 mb-5">
          <h3 className="cinzel text-base text-[var(--text)] mb-1">🏅 Yatra Badges</h3>
          <p className="text-xs text-[var(--text-dim)] mb-4">Earned through your journeys on YatraVerse.</p>

          {/* Earned */}
          {earnedBadges.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-3">
                  <span className="text-2xl shrink-0">{badge.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{badge.label}</p>
                    <p className="text-xs text-[var(--text-dim)]">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Locked */}
          {lockedBadges.length > 0 && (
            <>
              <p className="text-xs text-[var(--text-dim)] mb-3 uppercase tracking-widest">Locked</p>
              <div className="grid grid-cols-2 gap-3">
                {lockedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-3 opacity-40">
                    <span className="text-2xl shrink-0 grayscale">{badge.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">🔒 {badge.label}</p>
                      <p className="text-xs text-[var(--text-dim)]">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── RECENT TRIPS ── */}
        {trips.length > 0 && (
          <div className="card p-6 mb-5">
            <h3 className="cinzel text-base text-[var(--text)] mb-4">🗺️ Recent Trips</h3>
            <div className="flex flex-col gap-2">
              {trips.slice(0, 4).map((trip) => (
                <div key={trip.id} className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3">
                  <span className="text-sm text-[var(--text)] font-medium">🛣️ {trip.name}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium
                    ${trip.role === "admin"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--border)] text-[var(--text-dim)]"}`}>
                    {trip.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACCOUNT SETTINGS ── */}
        <div className="card p-6 mb-5">
          <h3 className="cinzel text-base text-[var(--text)] mb-4">⚙️ Account Settings</h3>

          {saveMsg && <p className="text-green-400 text-sm mb-3">{saveMsg}</p>}

          {/* Name */}
          <div className="mb-4">
            <label className="text-xs text-[var(--text-dim)] uppercase tracking-widest block mb-2">Full Name</label>
            {editingName ? (
              <div className="flex gap-2">
                <input value={newName} onChange={(e) => setNewName(e.target.value)} className="input flex-1" autoFocus onKeyDown={(e) => e.key === "Enter" && handleSave("name")} />
                <button onClick={() => handleSave("name")} disabled={saving} className="btn btn-primary px-4"><Check size={15} /></button>
                <button onClick={() => { setEditingName(false); setNewName(user.name); }} className="px-3 rounded-xl border border-[var(--border)] text-[var(--text-dim)] bg-transparent cursor-pointer"><X size={15} /></button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3">
                <span className="text-sm text-[var(--text)]">{user?.name}</span>
                <button onClick={() => setEditingName(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline">Edit</button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs text-[var(--text-dim)] uppercase tracking-widest block mb-2">Email Address</label>
            {editingEmail ? (
              <div className="flex gap-2">
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="input flex-1" autoFocus onKeyDown={(e) => e.key === "Enter" && handleSave("email")} />
                <button onClick={() => handleSave("email")} disabled={saving} className="btn btn-primary px-4"><Check size={15} /></button>
                <button onClick={() => { setEditingEmail(false); setNewEmail(user.email); }} className="px-3 rounded-xl border border-[var(--border)] text-[var(--text-dim)] bg-transparent cursor-pointer"><X size={15} /></button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3">
                <span className="text-sm text-[var(--text)]">{user?.email}</span>
                <button onClick={() => setEditingEmail(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline">Edit</button>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-[var(--text-dim)] uppercase tracking-widest block mb-2">Password</label>
            {!showPasswordForm ? (
              <div className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3">
                <span className="text-sm text-[var(--text)] tracking-widest">••••••••••</span>
                <button onClick={() => setShowPasswordForm(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline">Change</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4">
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input w-full pr-11" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-dim)] p-0">
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} placeholder="New password (min 6 characters)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input w-full pr-11" />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-dim)] p-0">
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordErr && <p className="text-xs text-red-400">{passwordErr}</p>}
                {passwordMsg && <p className="text-xs text-green-400">{passwordMsg}</p>}
                <div className="flex gap-2">
                  <button onClick={handlePasswordChange} disabled={savingPassword} className="btn btn-primary flex-1 py-2 text-sm">{savingPassword ? "Saving..." : "Update Password"}</button>
                  <button onClick={() => { setShowPasswordForm(false); setCurrentPassword(""); setNewPassword(""); setPasswordErr(""); }} className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--text-dim)] bg-transparent cursor-pointer">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}