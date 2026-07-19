Expenses.js

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import {
  DollarSign, ArrowLeft, ArrowRight, Wallet, Users, Plus,
  ArrowRightLeft, Trash2, Receipt, Search, Share2, Download,
  UtensilsCrossed, Bus, BedDouble, Activity, ShoppingBag, Package,
} from "lucide-react";

/* ─── Constants ──────────────────────────────────────────── */
const CATEGORIES = ["Food","Transport","Accommodation","Activities","Shopping","Other"];

const CAT = {
  Food:          { icon: UtensilsCrossed, color: "#d65a47" },
  Transport:     { icon: Bus,             color: "#3b82f6" },
  Accommodation: { icon: BedDouble,       color: "#8b5cf6" },
  Activities:    { icon: Activity,        color: "#10b981" },
  Shopping:      { icon: ShoppingBag,     color: "#f59e0b" },
  Other:         { icon: Package,         color: "#6b7280" },
};

const input = "w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text)] placeholder:text-[var(--text-dim)]/50 outline-none focus:border-[var(--accent)]/50 transition-colors";

/* ─── Donut Chart ────────────────────────────────────────── */
function DonutChart({ data, total, hovered, onHover }) {
  let offset = 25;
  const sectors = data.filter(d => d.value > 0).map(d => {
    const pct = (d.value / total) * 100;
    const sector = { ...d, pct, dashArray: `${pct} ${100 - pct}`, dashOffset: 100 - offset + 25 };
    offset += pct;
    return sector;
  });

  return (
    <div className="relative w-36 h-36 shrink-0">
      <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="var(--border)" strokeWidth="3.5" />
        {sectors.map((s, i) => (
          <circle key={i} cx="21" cy="21" r="15.9"
            fill="transparent" stroke={s.color}
            strokeWidth={hovered === s.name ? "5" : "3.5"}
            strokeDasharray={s.dashArray} strokeDashoffset={s.dashOffset}
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => onHover(s.name)} onMouseLeave={() => onHover(null)}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        {hovered
          ? <>
              <p className="text-[9px] text-[var(--text-dim)] uppercase font-bold">{hovered}</p>
              <p className="text-sm font-bold text-[var(--text)]">
                {((data.find(d => d.name === hovered)?.value / total) * 100).toFixed(0)}%
              </p>
            </>
          : <p className="text-[10px] text-[var(--text-dim)] font-semibold">breakdown</p>
        }
      </div>
    </div>
  );
}

/* ─── Settlement Engine ──────────────────────────────────── */
function calcSettlements(balances) {
  const d = balances.filter(b => b.balance < -1).map(b => ({ ...b }));
  const c = balances.filter(b => b.balance >  1).map(b => ({ ...b }));
  d.sort((a,b) => a.balance - b.balance);
  c.sort((a,b) => b.balance - a.balance);
  const tx = []; let i = 0, j = 0;
  while (i < d.length && j < c.length) {
    const amt = Math.min(-d[i].balance, c[j].balance);
    if (amt > 1) tx.push({ from: d[i].name, to: c[j].name, amount: Math.round(amt) });
    d[i].balance += amt; c[j].balance -= amt;
    if (Math.abs(d[i].balance) < 1) i++;
    if (Math.abs(c[j].balance) < 1) j++;
  }
  return tx;
}

/* ─── Main ───────────────────────────────────────────────── */
export default function Expenses() {
  const { user }     = useAuth();
  const navigate     = useNavigate();
  const nameRef      = useRef(null);

  const [trips,        setTrips]        = useState([]);
  const [trip,         setTrip]         = useState(null);
  const [members,      setMembers]      = useState([]);
  const [expenses,     setExpenses]     = useState([]);
  const [loading,      setLoading]      = useState(false);

  // Add form
  const [name,         setName]         = useState("");
  const [amount,       setAmount]       = useState("");
  const [paidBy,       setPaidBy]       = useState("");
  const [category,     setCategory]     = useState("Food");
  const [splitAmong,   setSplitAmong]   = useState("");
  const [notes,        setNotes]        = useState("");
  const [adding,       setAdding]       = useState(false);

  // Filters
  const [search,       setSearch]       = useState("");
  const [catFilter,    setCatFilter]    = useState(null);
  const [payerFilter,  setPayerFilter]  = useState("");
  const [hoveredCat,   setHoveredCat]   = useState(null);
  const [checked,      setChecked]      = useState({});

  // Hub filters
  const [hubSearch,    setHubSearch]    = useState("");
  const [hubRole,      setHubRole]      = useState("all");

  useEffect(() => { API.get("/trips/my").then(r => setTrips(r.data)); }, []);

  useEffect(() => {
    if (!trip) return;
    setLoading(true);
    Promise.all([API.get(`/trips/${trip.id}/expenses`), API.get(`/trips/${trip.id}`)])
      .then(([e, t]) => {
        setExpenses(e.data);
        setMembers(t.data.members);
        setSplitAmong(t.data.members.length.toString());
        setChecked({});
      })
      .finally(() => setLoading(false));
  }, [trip]);

  const addExpense = async () => {
    if (!name.trim() || !amount || !paidBy || !splitAmong) return alert("Fill all fields.");
    setAdding(true);
    try {
      const finalName = name.trim() + (notes.trim() ? ` (${notes.trim()})` : "");
      const res = await API.post(`/trips/${trip.id}/expenses`, {
        name: finalName, amount: parseFloat(amount),
        paid_by_name: paidBy, category, split_among: parseInt(splitAmong),
      });
      setExpenses(p => [...p, res.data]);
      setName(""); setAmount(""); setPaidBy(""); setNotes(""); setCategory("Food");
    } catch (e) { alert(e.response?.data?.error || "Failed"); }
    finally { setAdding(false); }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Remove this expense?")) return;
    try { await API.delete(`/trips/${trip.id}/expenses/${id}`); setExpenses(p => p.filter(e => e.id !== id)); }
    catch (e) { alert(e.response?.data?.error || "Failed"); }
  };

  // Derived values
  const total     = expenses.reduce((s, e) => s + parseFloat(e.amount), 0);
  const fairShare = members.length ? total / members.length : 0;
  const paidMap   = expenses.reduce((m, e) => ({ ...m, [e.paid_by_name]: (m[e.paid_by_name] || 0) + parseFloat(e.amount) }), {});
  const balances  = members.map(m => ({ name: m.name, paid: paidMap[m.name] || 0, balance: (paidMap[m.name] || 0) - fairShare }));
  const myMember  = members.find(m => m.email?.toLowerCase() === user?.email?.toLowerCase() || m.name?.toLowerCase() === user?.name?.toLowerCase());
  const myBalance = myMember ? (paidMap[myMember.name] || 0) - fairShare : 0;

  const catData = CATEGORIES.map(c => ({ name: c, value: expenses.filter(e => e.category === c).reduce((s, e) => s + parseFloat(e.amount), 0), color: CAT[c].color }));

  const settlements = calcSettlements(balances);

  const filtered = expenses
    .filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()))
    .filter(e => !catFilter  || e.category === catFilter)
    .filter(e => !payerFilter || e.paid_by_name === payerFilter);

  const shareReport = () => {
    const cats = catData.filter(c => c.value > 0).map(c => `• ${c.name}: Rs. ${c.value.toLocaleString()} (${((c.value/total)*100).toFixed(0)}%)`).join("\n");
    const settle = settlements.length ? settlements.map(s => `• ${s.from} → ${s.to}: Rs. ${s.amount.toLocaleString()}`).join("\n") : "• All settled!";
    navigator.clipboard.writeText(`*${trip.name} — Expense Report*\nTotal: Rs. ${total.toLocaleString()} | Fair Share: Rs. ${Math.round(fairShare).toLocaleString()}\n\n*Breakdown:*\n${cats}\n\n*Settlements:*\n${settle}`);
    alert("Report copied to clipboard!");
  };

  const exportCSV = () => {
    if (!filtered.length) return;
    const rows = filtered.map(e => {
      const m = e.name.match(/^(.*?)\s*\((.*?)\)$/);
      return [`"${(m?m[1]:e.name).replace(/"/g,'""')}"`,`"${(m?m[2]:'').replace(/"/g,'""')}"`,e.amount,`"${e.paid_by_name}"`,`"${e.category}"`,e.split_among].join(",");
    });
    const csv = "Name,Notes,Amount,Paid By,Category,Splits\n" + rows.join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = `${trip.name.replace(/\s+/g,"_")}_expenses.csv`;
    a.click();
  };

  /* ─── Hub Screen ─────────────────────────────────────────── */
  if (!trip) {
    const hubTrips = trips
      .filter(t => t.name.toLowerCase().includes(hubSearch.toLowerCase()))
      .filter(t => hubRole === "all" || t.role === hubRole);

    return (
      <DashboardLayout>
        <div className="fade-up max-w-4xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--text-dim)] mb-1">Expense Tracking</p>
              <h1 className="cinzel text-3xl font-bold text-[var(--text)]">Split Ledger</h1>
              <p className="text-sm text-[var(--text-dim)] mt-0.5">Select a trip to track and split costs fairly</p>
            </div>
            <button onClick={() => navigate("/create-trip")} className="btn btn-primary text-sm flex items-center gap-2">
              <Plus size={15} /> New Trip
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
              <input value={hubSearch} onChange={e => setHubSearch(e.target.value)} placeholder="Search trips…"
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] placeholder:text-[var(--text-dim)]/50 outline-none focus:border-[var(--accent)]/50" />
            </div>
            <div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-1 bg-[var(--bg-card)]">
              {[["all","All"],["admin","Mine"],["member","Joined"]].map(([k,l]) => (
                <button key={k} onClick={() => setHubRole(k)}
                  className={`px-3 py-1 text-xs rounded-full border-none cursor-pointer transition-colors font-semibold
                    ${hubRole === k ? "bg-[var(--accent)] text-white" : "text-[var(--text-dim)] hover:text-[var(--text)] bg-transparent"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Trip cards */}
          {trips.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--border)] text-center py-16">
              <Wallet size={32} className="mx-auto mb-3 text-[var(--text-dim)]/40" strokeWidth={1.3} />
              <p className="cinzel text-lg text-[var(--text)] mb-1">No trips yet</p>
              <p className="text-sm text-[var(--text-dim)] mb-5">Create a trip first to start tracking expenses.</p>
              <button onClick={() => navigate("/create-trip")} className="btn btn-primary px-6 py-2.5">Create Trip</button>
            </div>
          ) : (
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
              {hubTrips.map(t => (
                <div key={t.id} onClick={() => setTrip(t)}
                  className="card card-hover cursor-pointer group overflow-hidden flex flex-col"
                  style={{ padding: 0 }}>
                  {/* accent bar top */}
                  <div className="h-1.5" style={{ background: t.role === "admin" ? "var(--accent)" : "#3b82f6" }} />
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    <div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                        ${t.role === "admin" ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-blue-50 text-blue-600"}`}>
                        {t.role === "admin" ? "Organizer" : "Member"}
                      </span>
                    </div>
                    <h3 className="cinzel text-base font-bold text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors">{t.name}</h3>
                    <p className="text-[10px] text-[var(--text-dim)] uppercase font-semibold">Code: {t.invite_code}</p>
                    <div className="flex items-center gap-1 text-xs text-[var(--accent)] font-semibold mt-auto pt-2 border-t border-[var(--border)]/50 group-hover:gap-2 transition-all">
                      Open ledger <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </DashboardLayout>
    );
  }

  /* ─── Ledger Screen ──────────────────────────────────────── */
  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <button onClick={() => setTrip(null)} className="flex items-center gap-1 text-xs text-[var(--accent)] bg-transparent border-none cursor-pointer hover:underline mb-2 p-0 font-semibold">
              <ArrowLeft size={12} /> All Trips
            </button>
            <h1 className="cinzel text-2xl font-bold text-[var(--text)]">{trip.name}</h1>
            <p className="text-sm text-[var(--text-dim)] mt-0.5">{members.length} members · Split ledger</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={shareReport} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text)] hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors">
              <Share2 size={13} /> Copy Report
            </button>
            <button onClick={exportCSV} disabled={!expenses.length} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text)] hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors disabled:opacity-40">
              <Download size={13} /> CSV
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Wallet size={17} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--text)] cinzel">Rs. {total.toLocaleString()}</p>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">Total Spent</p>
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Users size={17} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--text)] cinzel">Rs. {Math.round(fairShare).toLocaleString()}</p>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">Fair Share / Person</p>
            </div>
          </div>
          <div className={`rounded-2xl border p-5 flex items-center gap-4 ${myBalance >= 0 ? "border-emerald-200/50 bg-emerald-50/10" : "border-rose-200/50 bg-rose-50/10"}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${myBalance >= 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"}`}>
              <DollarSign size={17} strokeWidth={2} />
            </div>
            <div>
              <p className={`text-xl font-bold cinzel ${myBalance >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                {myBalance >= 0 ? "+" : "-"}Rs. {Math.round(Math.abs(myBalance)).toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-dim)] mt-0.5">{myBalance >= 0 ? "You are owed" : "You owe"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr_1.5fr]">

          {/* Left — Add form + Settlement */}
          <div className="flex flex-col gap-5">

            {/* Add Expense */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
              <h2 className="cinzel text-base font-bold text-[var(--text)] mb-4">Add Expense</h2>
              <div className="flex flex-col gap-3">
                <input ref={nameRef} placeholder="What was purchased?" value={name} onChange={e => setName(e.target.value)} className={input} />
                <input placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} className={input} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Amount (Rs.)" value={amount} onChange={e => setAmount(e.target.value)} className={input} />
                  <select value={paidBy} onChange={e => setPaidBy(e.target.value)} className={`${input} cursor-pointer`}>
                    <option value="">Paid by…</option>
                    {members.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                  </select>
                </div>

                {/* Category pills */}
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategory(c)}
                      className={`px-3 py-1 text-xs rounded-full border cursor-pointer transition-all font-semibold
                        ${category === c ? "bg-[var(--accent)] border-[var(--accent)] text-white" : "border-[var(--border)] text-[var(--text-dim)] bg-transparent hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"}`}>
                      {c}
                    </button>
                  ))}
                </div>

                {/* Split config */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]/50 text-xs">
                  <span className="text-[var(--text-dim)] font-medium">Split among</span>
                  <input type="number" min="1" value={splitAmong} onChange={e => setSplitAmong(e.target.value)}
                    className="w-10 text-center bg-transparent border-none outline-none text-[var(--text)] font-bold" />
                  <span className="text-[var(--text-dim)] font-medium">people</span>
                  {amount && splitAmong && (
                    <span className="ml-auto text-[var(--accent)] font-bold">
                      = Rs. {Math.round(parseFloat(amount) / parseInt(splitAmong)).toLocaleString()} each
                    </span>
                  )}
                </div>

                <button onClick={addExpense} disabled={adding}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-all border-none cursor-pointer">
                  <Plus size={15} /> {adding ? "Adding…" : "Add Expense"}
                </button>
              </div>
            </div>

            {/* Optimal Settlements */}
            {balances.length > 0 && total > 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowRightLeft size={16} className="text-[var(--accent)]" strokeWidth={1.8} />
                  <h2 className="cinzel text-base font-bold text-[var(--text)]">Settle Up</h2>
                </div>
                <p className="text-xs text-[var(--text-dim)] mb-4">Minimum transfers to clear all group debt.</p>
                {settlements.length === 0 ? (
                  <div className="text-center py-4 rounded-xl border border-dashed border-emerald-300/30 bg-emerald-50/10">
                    <p className="text-sm font-bold text-emerald-600">🎉 Everyone's settled up!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {settlements.map((s, i) => (
                      <div key={i} onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                          ${checked[i] ? "opacity-50 line-through border-[var(--border)] bg-[var(--bg-subtle)]" : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/30"}`}>
                        <input type="checkbox" checked={!!checked[i]} readOnly className="cursor-pointer accent-[var(--accent)]" />
                        <div className="flex-1 text-sm">
                          <span className="font-bold text-[var(--text)]">{s.from}</span>
                          <span className="text-[var(--text-dim)] mx-1.5">pays</span>
                          <span className="font-bold text-[var(--text)]">{s.to}</span>
                        </div>
                        <span className="font-bold text-[var(--accent)] text-sm shrink-0">Rs. {s.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right — Chart + History */}
          <div className="flex flex-col gap-5">

            {/* Category Chart */}
            {total > 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
                <h2 className="cinzel text-base font-bold text-[var(--text)] mb-4">Spending Breakdown</h2>
                <div className="flex items-center gap-6">
                  <DonutChart data={catData} total={total} hovered={hoveredCat} onHover={setHoveredCat} />
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {catData.filter(c => c.value > 0).map((c, i) => (
                      <div key={i} onClick={() => setCatFilter(catFilter === c.name ? null : c.name)}
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all text-xs
                          ${catFilter === c.name ? "border-[var(--accent)] bg-[var(--accent)]/5 ring-1 ring-[var(--accent)]/20" : "border-[var(--border)] hover:bg-[var(--bg-subtle)]"}`}>
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                        <div className="min-w-0">
                          <p className="font-semibold text-[var(--text)] truncate">{c.name}</p>
                          <p className="text-[var(--text-dim)]">{((c.value/total)*100).toFixed(0)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {catFilter && (
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-[var(--text-dim)]">Filtering: <strong className="text-[var(--text)]">{catFilter}</strong></span>
                    <button onClick={() => setCatFilter(null)} className="text-red-500 bg-transparent border-none cursor-pointer font-semibold hover:underline">Clear</button>
                  </div>
                )}
              </div>
            )}

            {/* Expense History */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="cinzel text-base font-bold text-[var(--text)]">History</h2>
                <span className="text-xs text-[var(--text-dim)]">{filtered.length} entries</span>
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] placeholder:text-[var(--text-dim)]/50 outline-none focus:border-[var(--accent)]/50" />
                </div>
                <select value={payerFilter} onChange={e => setPayerFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] outline-none cursor-pointer">
                  <option value="">All payers</option>
                  {members.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                </select>
              </div>

              {/* List */}
              {loading ? (
                <p className="text-[var(--text-dim)] text-sm animate-pulse text-center py-6">Loading…</p>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border border-dashed border-[var(--border)] rounded-xl">
                  <Receipt size={24} className="text-[var(--text-dim)]/40 mb-2" strokeWidth={1.3} />
                  <p className="text-sm text-[var(--text-dim)]">{expenses.length === 0 ? "No expenses yet." : "Nothing matches."}</p>
                  {expenses.length === 0 && <button onClick={() => nameRef.current?.focus()} className="text-xs text-[var(--accent)] hover:underline mt-1 bg-transparent border-none cursor-pointer">Add first entry</button>}
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-0.5">
                  {filtered.map(e => {
                    const m = e.name.match(/^(.*?)\s*\((.*?)\)$/);
                    const displayName = m ? m[1] : e.name;
                    const comment     = m ? m[2] : "";
                    const cfg = CAT[e.category] || CAT.Other;
                    const Icon = cfg.icon;
                    return (
                      <div key={e.id} className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-3 hover:border-[var(--accent)]/30 transition-all group">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg.color + "18", color: cfg.color }}>
                          <Icon size={15} strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[var(--text)] truncate">{displayName}</p>
                          <p className="text-[10px] text-[var(--text-dim)] truncate">
                            {e.paid_by_name}
                            {comment && <span className="ml-1 italic opacity-70">· {comment}</span>}
                            {" · "}Rs. {Math.round(parseFloat(e.amount)/e.split_among).toLocaleString()} × {e.split_among}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-[var(--text)]">Rs. {parseFloat(e.amount).toLocaleString()}</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: cfg.color + "18", color: cfg.color }}>{e.category}</span>
                        </div>
                        <button onClick={() => deleteExpense(e.id)} className="text-[var(--text-dim)] hover:text-red-500 bg-transparent border-none cursor-pointer p-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}