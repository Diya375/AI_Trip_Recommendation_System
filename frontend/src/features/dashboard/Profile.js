import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import {
  Check, X, Eye, EyeOff, Map, Compass, Crown, Handshake,
  Mountain, MountainSnow, Heart, Sprout, Footprints, Backpack,
  Award, Settings, Lock, ArrowRight,
} from "lucide-react";

const TRAVEL_STYLES = ["Adventure","Trekking","Cultural","Relaxing","Wildlife","Road Trip","Beach","Hidden Gems"];

const RANKS = [
  { min: 0,  label: "Newcomer",    icon: Sprout,       next: "Wanderer",    nextAt: 1  },
  { min: 1,  label: "Wanderer",    icon: Footprints,   next: "Explorer",    nextAt: 3  },
  { min: 3,  label: "Explorer",    icon: Compass,      next: "Adventurer",  nextAt: 6  },
  { min: 6,  label: "Adventurer",  icon: Mountain,     next: "Yatra Legend",nextAt: 10 },
  { min: 10, label: "Yatra Legend",icon: MountainSnow, next: null,          nextAt: 10 },
];

const BADGES = [
  { id: "first_trip",  icon: Map,       label: "First Journey",  desc: "Created your first trip",   ok: t => t.length >= 1 },
  { id: "explorer",    icon: Compass,   label: "Explorer",       desc: "3 or more trips",           ok: t => t.length >= 3 },
  { id: "trip_master", icon: Crown,     label: "Trip Master",    desc: "Organised 3+ trips",        ok: t => t.filter(x=>x.role==="admin").length >= 3 },
  { id: "team_player", icon: Handshake, label: "Team Player",    desc: "Joined a trip as member",   ok: t => t.filter(x=>x.role==="member").length >= 1 },
  { id: "veteran",     icon: Mountain,  label: "Yatra Veteran",  desc: "5 or more trips",           ok: t => t.length >= 5 },
  { id: "heart",       icon: Heart,     label: "Heart of Nepal", desc: "2+ trips completed",        ok: t => t.length >= 2 },
];

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text)] placeholder:text-[var(--text-dim)]/50 outline-none focus:border-[var(--accent)]/50 transition-colors";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser]       = useState(null);
  const [trips, setTrips]     = useState([]);
  const [loading, setLoading] = useState(true);

  const [editName,    setEditName]    = useState(false);
  const [editEmail,   setEditEmail]   = useState(false);
  const [newName,     setNewName]     = useState("");
  const [newEmail,    setNewEmail]    = useState("");
  const [saving,      setSaving]      = useState(false);
  const [saveMsg,     setSaveMsg]     = useState("");

  const [showPwForm,  setShowPwForm]  = useState(false);
  const [curPw,       setCurPw]       = useState("");
  const [newPw,       setNewPw]       = useState("");
  const [showCur,     setShowCur]     = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [pwMsg,       setPwMsg]       = useState("");
  const [pwErr,       setPwErr]       = useState("");
  const [savingPw,    setSavingPw]    = useState(false);

  const [styles,      setStyles]      = useState([]);

  useEffect(() => {
    Promise.all([API.get("/auth/me"), API.get("/trips/my")])
      .then(([u, t]) => {
        setUser(u.data); setTrips(t.data);
        setNewName(u.data.name); setNewEmail(u.data.email);
        setStyles(u.data.travel_styles || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async (field) => {
    setSaving(true);
    const payload = field === "name" ? { name: newName } : { email: newEmail };
    try {
      await API.put("/auth/profile", payload);
      setUser(p => ({ ...p, ...payload }));
      field === "name" ? setEditName(false) : setEditEmail(false);
      setSaveMsg("Saved!"); setTimeout(() => setSaveMsg(""), 2000);
    } catch { setSaveMsg("Failed."); } finally { setSaving(false); }
  };

  const toggleStyle = async (s) => {
    const next = styles.includes(s) ? styles.filter(x => x !== s) : [...styles, s];
    setStyles(next);
    try { await API.put("/auth/profile", { travel_styles: next }); } catch {}
  };

  const changePw = async () => {
    setPwErr(""); setPwMsg("");
    if (!curPw || !newPw) return setPwErr("Fill both fields.");
    if (newPw.length < 6) return setPwErr("Min 6 characters.");
    setSavingPw(true);
    try {
      await API.put("/auth/change-password", { currentPassword: curPw, newPassword: newPw });
      setPwMsg("Password updated!"); setCurPw(""); setNewPw(""); setShowPwForm(false);
      setTimeout(() => setPwMsg(""), 3000);
    } catch (e) { setPwErr(e.response?.data?.error || "Failed."); }
    finally { setSavingPw(false); }
  };

  if (loading) return <DashboardLayout><p className="text-[var(--text-dim)]">Loading…</p></DashboardLayout>;
  if (!user) return null;

  const initials = user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const since = user.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "";
  const adminCount  = trips.filter(t => t.role === "admin").length;
  const memberCount = trips.filter(t => t.role === "member").length;

  const rank = RANKS.slice().reverse().find(r => trips.length >= r.min) || RANKS[0];
  const RankIcon = rank.icon;
  const progress = rank.nextAt > rank.min
    ? Math.round(((trips.length - rank.min) / (rank.nextAt - rank.min)) * 100)
    : 100;

  const earned = BADGES.filter(b => b.ok(trips));
  const locked = BADGES.filter(b => !b.ok(trips));

  return (
    <DashboardLayout>
      <div className="fade-up max-w-2xl mx-auto space-y-5">

        {/* ── Hero Card ── */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
          {/* Subtle accent band */}
          <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }} />
          <div className="p-6 sm:p-8 text-center">
            {/* Avatar */}
            <div className="relative inline-flex mb-4">
              <div className="w-20 h-20 rounded-full bg-[var(--accent)] flex items-center justify-center cinzel text-2xl font-bold text-white">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                <RankIcon size={13} strokeWidth={2} />
              </div>
            </div>

            <h1 className="cinzel text-xl font-bold text-[var(--text)]">{user.name}</h1>
            <p className="text-sm text-[var(--text-dim)] mt-0.5">{user.email}</p>
            <p className="text-xs text-[var(--text-dim)]/60 mt-0.5">Explorer since {since}</p>

            {/* Rank badge */}
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <RankIcon size={13} className="text-[var(--accent)]" />
              <span className="text-sm font-bold text-[var(--accent)]">{rank.label}</span>
            </div>

            {/* Progress to next rank */}
            {rank.next && (
              <div className="mt-4 max-w-xs mx-auto text-left">
                <div className="flex justify-between text-[10px] text-[var(--text-dim)] mb-1">
                  <span className="font-semibold">{rank.label}</span>
                  <span>{trips.length} / {rank.nextAt} trips → <strong className="text-[var(--text)]">{rank.next}</strong></span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: Map,       label: "Trips",     val: trips.length },
                { icon: Crown,     label: "Organised", val: adminCount },
                { icon: Handshake, label: "Joined",    val: memberCount },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]/50 py-3">
                  <p className="text-xl font-bold text-[var(--text)] cinzel">{s.val}</p>
                  <p className="text-[10px] text-[var(--text-dim)] uppercase font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Travel Style ── */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Backpack size={15} strokeWidth={1.8} />
            </div>
            <h2 className="cinzel text-base font-bold text-[var(--text)]">Travel Preferences</h2>
          </div>
          <p className="text-xs text-[var(--text-dim)] mb-3 ml-11">Pick your styles — used to personalise AI recommendations.</p>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_STYLES.map(s => (
              <button key={s} onClick={() => toggleStyle(s)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all
                  ${styles.includes(s)
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text-dim)] bg-[var(--bg-card)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Badges ── */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Award size={15} strokeWidth={1.8} />
            </div>
            <h2 className="cinzel text-base font-bold text-[var(--text)]">Achievements</h2>
          </div>
          <p className="text-xs text-[var(--text-dim)] mb-4 ml-11">Milestones earned through your journeys.</p>

          {earned.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {earned.map(b => (
                <div key={b.id} className="flex items-center gap-3 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 p-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                    <b.icon size={15} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[var(--text)] truncate">{b.label}</p>
                    <p className="text-[10px] text-[var(--text-dim)] truncate">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {locked.length > 0 && (
            <>
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] mb-2">Locked</p>
              <div className="grid grid-cols-2 gap-2.5 opacity-50">
                {locked.map(b => (
                  <div key={b.id} className="flex items-center gap-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] p-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--border)] flex items-center justify-center text-[var(--text-dim)] shrink-0">
                      <b.icon size={15} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[var(--text-dim)] truncate flex items-center gap-1">
                        <Lock size={10} /> {b.label}
                      </p>
                      <p className="text-[10px] text-[var(--text-dim)] truncate">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Account Settings ── */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Settings size={15} strokeWidth={1.8} />
            </div>
            <h2 className="cinzel text-base font-bold text-[var(--text)]">Account Settings</h2>
          </div>

          {saveMsg && <p className="text-xs text-green-600 font-semibold mb-3">{saveMsg}</p>}

          {/* Name */}
          <div className="mb-3">
            <label className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] font-bold block mb-1.5">Full Name</label>
            {editName ? (
              <div className="flex gap-2">
                <input value={newName} onChange={e => setNewName(e.target.value)} className={`${inputClass} flex-1`} autoFocus onKeyDown={e => e.key === "Enter" && save("name")} />
                <button onClick={() => save("name")} disabled={saving} className="px-3 py-2 rounded-xl bg-[var(--accent)] text-white border-none cursor-pointer hover:opacity-90"><Check size={14} /></button>
                <button onClick={() => { setEditName(false); setNewName(user.name); }} className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-dim)] cursor-pointer hover:text-[var(--text)]"><X size={14} /></button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[var(--bg-subtle)] border border-[var(--border)]/50 rounded-xl px-4 py-2.5">
                <span className="text-sm text-[var(--text)] font-medium">{user.name}</span>
                <button onClick={() => setEditName(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline font-semibold">Edit</button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] font-bold block mb-1.5">Email</label>
            {editEmail ? (
              <div className="flex gap-2">
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className={`${inputClass} flex-1`} autoFocus onKeyDown={e => e.key === "Enter" && save("email")} />
                <button onClick={() => save("email")} disabled={saving} className="px-3 py-2 rounded-xl bg-[var(--accent)] text-white border-none cursor-pointer hover:opacity-90"><Check size={14} /></button>
                <button onClick={() => { setEditEmail(false); setNewEmail(user.email); }} className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-dim)] cursor-pointer hover:text-[var(--text)]"><X size={14} /></button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[var(--bg-subtle)] border border-[var(--border)]/50 rounded-xl px-4 py-2.5">
                <span className="text-sm text-[var(--text)] font-medium">{user.email}</span>
                <button onClick={() => setEditEmail(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline font-semibold">Edit</button>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] font-bold block mb-1.5">Password</label>
            {!showPwForm ? (
              <div className="flex items-center justify-between bg-[var(--bg-subtle)] border border-[var(--border)]/50 rounded-xl px-4 py-2.5">
                <span className="text-sm text-[var(--text)] tracking-widest">••••••••</span>
                <button onClick={() => setShowPwForm(true)} className="text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline font-semibold">Change</button>
              </div>
            ) : (
              <div className="bg-[var(--bg-subtle)] border border-[var(--border)]/50 rounded-xl p-4 flex flex-col gap-3">
                <div className="relative">
                  <input type={showCur ? "text" : "password"} placeholder="Current password" value={curPw} onChange={e => setCurPw(e.target.value)} className={`${inputClass} pr-10`} />
                  <button onClick={() => setShowCur(!showCur)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] bg-transparent border-none cursor-pointer p-0">
                    {showCur ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} placeholder="New password (6+ chars)" value={newPw} onChange={e => setNewPw(e.target.value)} className={`${inputClass} pr-10`} />
                  <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] bg-transparent border-none cursor-pointer p-0">
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {pwErr && <p className="text-xs text-red-500 font-semibold">{pwErr}</p>}
                {pwMsg && <p className="text-xs text-green-600 font-semibold">{pwMsg}</p>}
                <div className="flex gap-2">
                  <button onClick={changePw} disabled={savingPw} className="flex-1 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 border-none cursor-pointer">
                    {savingPw ? "Saving…" : "Update Password"}
                  </button>
                  <button onClick={() => { setShowPwForm(false); setCurPw(""); setNewPw(""); setPwErr(""); }} className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--text-dim)] bg-[var(--bg-card)] cursor-pointer hover:text-[var(--text)]">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          <h2 className="cinzel text-sm font-bold text-[var(--text)] mb-3">Quick Navigation</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Go to Dashboard",      path: "/dashboard" },
              { label: "View Planner",          path: "/planner" },
              { label: "Manage Expenses",       path: "/expenses" },
              { label: "Open AI Assistant",     path: "/assistant" },
            ].map(({ label, path }) => (
              <button key={path} onClick={() => navigate(path)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all cursor-pointer group text-left">
                <span className="text-sm text-[var(--text)] font-medium">{label}</span>
                <ArrowRight size={14} className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}