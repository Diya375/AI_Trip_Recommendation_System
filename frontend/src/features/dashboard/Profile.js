import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import {
  Check, X, Eye, EyeOff, Map, Compass, Crown, Handshake, Mountain,
  MountainSnow, Heart, Sprout, Footprints, Backpack, Award, Settings, Lock,
} from "lucide-react";

const TRAVEL_STYLES = ["Adventure", "Trekking", "Cultural", "Relaxing", "Wildlife", "Road Trip", "Beach", "Hidden Gems"];

const BADGES = [
  { id: "first_trip",    icon: Map,        label: "First Journey",   desc: "Created your first trip",        condition: (trips) => trips.length >= 1 },
  { id: "explorer",      icon: Compass,    label: "Explorer",        desc: "Joined 3 or more trips",         condition: (trips) => trips.length >= 3 },
  { id: "trip_master",   icon: Crown,      label: "Trip Master",     desc: "Organised 3 or more trips",      condition: (trips) => trips.filter(t => t.role === "admin").length >= 3 },
  { id: "team_player",   icon: Handshake,  label: "Team Player",     desc: "Joined a trip as member",        condition: (trips) => trips.filter(t => t.role === "member").length >= 1 },
  { id: "yatra_veteran", icon: Mountain,   label: "Yatra Veteran",   desc: "Been on 5 or more trips",        condition: (trips) => trips.length >= 5 },
  { id: "nepal_heart",   icon: Heart,      label: "Heart of Nepal",  desc: "A true Nepal travel enthusiast", condition: (trips) => trips.length >= 2 },
];

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 " +
  "placeholder:text-gray-400 outline-none focus:border-[var(--accent)]/50 transition-colors";

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

  const rank =
    trips.length === 0 ? { label: "Newcomer",   icon: Sprout } :
    trips.length < 3   ? { label: "Wanderer",    icon: Footprints } :
    trips.length < 6   ? { label: "Explorer",    icon: Compass } :
    trips.length < 10  ? { label: "Adventurer",  icon: Mountain } :
                          { label: "Yatra Legend", icon: MountainSnow };
  const RankIcon = rank.icon;

  if (loading) return (
    <DashboardLayout>
      <p className="text-gray-400 text-sm">Loading...</p>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="fade-up max-w-2xl mx-auto px-4 sm:px-0">

        {/* ── HERO ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 mb-5 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 40%)" }}
          />

          {/* Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--accent)] flex items-center justify-center cinzel text-2xl sm:text-3xl font-bold text-white mx-auto mb-4 relative">
            {initials}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-[var(--accent)]">
              <RankIcon size={13} strokeWidth={2} />
            </div>
          </div>

          <h1 className="cinzel text-xl sm:text-2xl text-gray-900 mb-1 break-words">{user?.name}</h1>
          <p className="text-sm text-gray-500 mb-1 break-words">{user?.email}</p>
          <p className="text-xs text-gray-400 mb-4">Explorer since {memberSince}</p>

          {/* Rank badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full px-4 py-1.5 mb-6">
            <RankIcon size={14} strokeWidth={2} className="text-[var(--accent)]" />
            <span className="text-sm font-semibold text-[var(--accent)]">{rank.label}</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {[
              { icon: Map,       value: trips.length,     label: "Total Trips" },
              { icon: Crown,     value: adminTrips.length, label: "Organised" },
              { icon: Handshake, value: memberTripsCount,  label: "Joined" },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl py-3 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mx-auto mb-1.5">
                  <s.icon size={15} strokeWidth={1.8} />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRAVEL STYLE ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Backpack size={16} strokeWidth={1.8} />
            </div>
            <h2 className="cinzel text-base text-gray-900">My Travel Style</h2>
          </div>
          <p className="text-xs text-gray-400 mb-4 ml-11">Select all that describe you — this helps personalize your experience.</p>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className={`px-3.5 py-1.5 rounded-full text-sm border transition-all duration-200 cursor-pointer
                  ${selectedStyles.includes(style)
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-gray-200 text-gray-500 bg-white hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
                  }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* ── BADGES ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Award size={16} strokeWidth={1.8} />
            </div>
            <h2 className="cinzel text-base text-gray-900">Yatra Badges</h2>
          </div>
          <p className="text-xs text-gray-400 mb-4 ml-11">Earned through your journeys on YatraVerse.</p>

          {earnedBadges.length > 0 && (
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-4">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                    <badge.icon size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{badge.label}</p>
                    <p className="text-xs text-gray-400 truncate">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {lockedBadges.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Locked</p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {lockedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3 opacity-60">
                    <div className="w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                      <badge.icon size={16} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-600 truncate flex items-center gap-1">
                        <Lock size={11} strokeWidth={2} /> {badge.label}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── RECENT TRIPS ── */}
        {trips.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                <Map size={16} strokeWidth={1.8} />
              </div>
              <h2 className="cinzel text-base text-gray-900">Recent Trips</h2>
            </div>
            <div className="flex flex-col gap-2">
              {trips.slice(0, 4).map((trip) => (
                <div key={trip.id} className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <span className="text-sm text-gray-900 font-medium truncate">{trip.name}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0
                    ${trip.role === "admin"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-gray-200 text-gray-500"}`}>
                    {trip.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACCOUNT SETTINGS ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Settings size={16} strokeWidth={1.8} />
            </div>
            <h2 className="cinzel text-base text-gray-900">Account Settings</h2>
          </div>

          {saveMsg && <p className="text-green-600 text-sm mb-3">{saveMsg}</p>}

          {/* Name */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>
            {editingName ? (
              <div className="flex flex-col xs:flex-row gap-2">
                <input value={newName} onChange={(e) => setNewName(e.target.value)} className={`${inputClass} flex-1`} autoFocus onKeyDown={(e) => e.key === "Enter" && handleSave("name")} />
                <div className="flex gap-2">
                  <button onClick={() => handleSave("name")} disabled={saving} className="px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white border-none cursor-pointer hover:opacity-90 transition-opacity"><Check size={15} /></button>
                  <button onClick={() => { setEditingName(false); setNewName(user.name); }} className="px-3 py-2.5 rounded-xl border border-gray-200 text-gray-400 bg-white cursor-pointer hover:text-gray-600 transition-colors"><X size={15} /></button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-900 truncate">{user?.name}</span>
                <button onClick={() => setEditingName(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline shrink-0">Edit</button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
            {editingEmail ? (
              <div className="flex flex-col xs:flex-row gap-2">
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className={`${inputClass} flex-1`} autoFocus onKeyDown={(e) => e.key === "Enter" && handleSave("email")} />
                <div className="flex gap-2">
                  <button onClick={() => handleSave("email")} disabled={saving} className="px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white border-none cursor-pointer hover:opacity-90 transition-opacity"><Check size={15} /></button>
                  <button onClick={() => { setEditingEmail(false); setNewEmail(user.email); }} className="px-3 py-2.5 rounded-xl border border-gray-200 text-gray-400 bg-white cursor-pointer hover:text-gray-600 transition-colors"><X size={15} /></button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-900 truncate">{user?.email}</span>
                <button onClick={() => setEditingEmail(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline shrink-0">Edit</button>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Password</label>
            {!showPasswordForm ? (
              <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-900 tracking-widest">••••••••••</span>
                <button onClick={() => setShowPasswordForm(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline shrink-0">Change</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={`${inputClass} pr-11`} />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 p-0">
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} placeholder="New password (min 6 characters)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`${inputClass} pr-11`} />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 p-0">
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordErr && <p className="text-xs text-red-500">{passwordErr}</p>}
                {passwordMsg && <p className="text-xs text-green-600">{passwordMsg}</p>}
                <div className="flex flex-col xs:flex-row gap-2">
                  <button onClick={handlePasswordChange} disabled={savingPassword} className="flex-1 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity border-none cursor-pointer">
                    {savingPassword ? "Saving..." : "Update Password"}
                  </button>
                  <button onClick={() => { setShowPasswordForm(false); setCurrentPassword(""); setNewPassword(""); setPasswordErr(""); }} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 bg-white cursor-pointer hover:text-gray-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}