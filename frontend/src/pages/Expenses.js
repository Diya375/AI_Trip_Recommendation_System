import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import {
  Trash2, Receipt, Users, TrendingUp, ArrowRightLeft, ChevronRight, Plus, Minus,
  Utensils, Bus, Hotel, Target, ShoppingBag, Package,
  Compass, Mountain, Waves, TreePine, Tent, Map,
} from "lucide-react";

const CATEGORIES = ["Food", "Transport", "Accommodation", "Activities", "Shopping", "Other"];

const CATEGORY_CONFIG = {
  Food:          { Icon: Utensils,     color: "bg-red-500/10 text-red-400 border-red-500/20" },
  Transport:     { Icon: Bus,          color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  Accommodation: { Icon: Hotel,        color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  Activities:    { Icon: Target,       color: "bg-green-500/10 text-green-400 border-green-500/20" },
  Shopping:      { Icon: ShoppingBag,  color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  Other:         { Icon: Package,      color: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
};

// Same icon + color language as the trip hub, so the whole app reads as one product
const TRIP_STYLES = [
  { Icon: Compass, color: "#2f6f5e" },
  { Icon: Mountain, color: "#b8863b" },
  { Icon: Waves, color: "#3c6e8f" },
  { Icon: TreePine, color: "#5c7a3f" },
  { Icon: Tent, color: "#a85c48" },
  { Icon: Map, color: "#7d5a8c" },
];
function tripStyle(seed) {
  return TRIP_STYLES[seed % TRIP_STYLES.length];
}

export default function Expenses() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("Food");
  const [splitAmong, setSplitAmong] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    API.get("/trips/my").then((res) => setTrips(res.data)).finally(() => setTripsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTrip) return;
    setLoading(true);
    Promise.all([
      API.get(`/trips/${selectedTrip.id}/expenses`),
      API.get(`/trips/${selectedTrip.id}`),
    ]).then(([expRes, tripRes]) => {
      setExpenses(expRes.data);
      setMembers(tripRes.data.members);
      setSplitAmong(tripRes.data.members.length.toString());
    }).finally(() => setLoading(false));
  }, [selectedTrip]);

  const handleAdd = async () => {
    if (!name.trim() || !amount || !paidBy.trim() || !splitAmong) {
      alert("Please fill all fields.");
      return;
    }
    setAdding(true);
    try {
      const res = await API.post(`/trips/${selectedTrip.id}/expenses`, {
        name, amount: parseFloat(amount),
        paid_by_name: paidBy,
        category,
        split_among: parseInt(splitAmong),
      });
      setExpenses((prev) => [...prev, res.data]);
      setName(""); setAmount(""); setPaidBy(""); setCategory("Food");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add expense");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (expenseId) => {
    if (!window.confirm("Remove this expense?")) return;
    try {
      await API.delete(`/trips/${selectedTrip.id}/expenses/${expenseId}`);
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete");
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const fairShare = members.length > 0 ? totalSpent / members.length : 0;
  const paidMap = {};
  expenses.forEach((e) => {
    paidMap[e.paid_by_name] = (paidMap[e.paid_by_name] || 0) + parseFloat(e.amount);
  });
  const maxPaid = Math.max(1, ...members.map((m) => paidMap[m.name] || 0));
  const balances = members.map((m) => ({
    name: m.name,
    paid: paidMap[m.name] || 0,
    balance: (paidMap[m.name] || 0) - fairShare,
  }));

  // ── Trip selector screen ──
  if (!selectedTrip) {
    return (
      <DashboardLayout>
        <div className="fade-up max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="section-title">Expense Manager</h1>
            <p className="section-sub">Track and split costs fairly</p>
          </div>

          {tripsLoading ? (
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="card p-5 h-[80px] animate-pulse flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--border)] shrink-0" />
                  <div className="flex-1">
                    <div className="h-3.5 w-2/3 rounded bg-[var(--border)] mb-2" />
                    <div className="h-2.5 w-1/3 rounded bg-[var(--border)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="card text-center py-16">
              <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
                <Receipt size={24} className="text-[var(--accent)]" />
              </div>
              <p className="text-[var(--text-dim)] mb-6">You need a trip first to track expenses.</p>
              <button onClick={() => navigate("/create-trip")} className="btn btn-primary px-6 py-2.5">
                Create a Trip
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--text-dim)] mb-4 uppercase tracking-widest">
                Select a trip
              </p>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                {trips.map((trip, i) => {
                  const { Icon, color } = tripStyle(trip.id ?? i);
                  return (
                    <div
                      key={trip.id}
                      onClick={() => setSelectedTrip(trip)}
                      className="card card-hover cursor-pointer p-5 flex items-center gap-4 group"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                        style={{ background: `${color}1a`, color }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[var(--text)] truncate">{trip.name}</p>
                        <p className="text-xs text-[var(--text-dim)] mt-0.5 capitalize">{trip.role}</p>
                      </div>
                      <ChevronRight size={16} className="text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    );
  }

  const { color: tripColor } = tripStyle(selectedTrip.id ?? 0);

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <button
              onClick={() => setSelectedTrip(null)}
              className="text-sm text-[var(--text-dim)] bg-transparent border-none cursor-pointer p-0 mb-2 hover:text-[var(--accent)] transition-colors block"
            >
              ← All Trips
            </button>
            <h1 className="section-title mb-0">{selectedTrip.name}</h1>
            <p className="section-sub mb-0">{members.length} members · Expense Tracker</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: <Receipt size={18} />, label: "Total Spent",     value: `Rs. ${totalSpent.toLocaleString()}`, color: tripColor },
            { icon: <Users size={18} />,   label: "Fair Share Each", value: `Rs. ${Math.round(fairShare).toLocaleString()}`, color: "#3c6e8f" },
            { icon: <TrendingUp size={18} />, label: "Expenses",     value: expenses.length, color: "#b8863b" },
          ].map((s, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${s.color}1a`, color: s.color }}
              >
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider">{s.label}</p>
                <p className="text-lg font-bold text-[var(--text)] truncate">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1.5fr" }}>

          {/* Left col — add + settlement */}
          <div className="flex flex-col gap-5">

            {/* Add expense form */}
            <div className="card p-5">
              <h3 className="cinzel text-sm text-[var(--text)] mb-4 uppercase tracking-wider flex items-center gap-2">
                <Plus size={14} className="text-[var(--accent)]" /> Add Expense
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="What was it for?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)] text-sm pointer-events-none">Rs.</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input !pl-11"
                  />
                </div>
                <select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="input cursor-pointer"
                >
                  <option value="">Who paid?</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>

                {/* Category */}
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const { Icon } = CATEGORY_CONFIG[cat];
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs border transition-all cursor-pointer
                          ${category === cat
                            ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                            : "border-[var(--border)] text-[var(--text-dim)] bg-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
                      >
                        <Icon size={12} /> {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Split — stepper */}
                <div className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2">
                  <span className="text-xs text-[var(--text-dim)] shrink-0">Split among</span>
                  <div className="flex items-center gap-1 mx-auto">
                    <button
                      type="button"
                      onClick={() => setSplitAmong((v) => String(Math.max(1, (parseInt(v) || 1) - 1)))}
                      className="w-6 h-6 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-[var(--text)]">{splitAmong || 0}</span>
                    <button
                      type="button"
                      onClick={() => setSplitAmong((v) => String((parseInt(v) || 0) + 1))}
                      className="w-6 h-6 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-xs text-[var(--text-dim)] shrink-0">people</span>
                  {amount && splitAmong ? (
                    <span className="ml-auto text-xs font-semibold text-[var(--accent)] shrink-0">
                      = Rs. {(parseFloat(amount) / parseInt(splitAmong)).toFixed(0)} each
                    </span>
                  ) : null}
                </div>

                <button
                  onClick={handleAdd}
                  disabled={adding}
                  className="btn btn-primary py-3 text-sm disabled:opacity-70"
                >
                  {adding ? "Adding..." : "Add Expense"}
                </button>
              </div>
            </div>

            {/* Settlement */}
            {balances.length > 0 && totalSpent > 0 && (
              <div className="card p-5">
                <h3 className="cinzel text-sm text-[var(--text)] mb-4 uppercase tracking-wider flex items-center gap-2">
                  <ArrowRightLeft size={14} className="text-[var(--accent)]" /> Settlement
                </h3>
                <div className="flex flex-col gap-4">
                  {balances.map((b, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs text-white font-bold shrink-0">
                            {b.name[0].toUpperCase()}
                          </div>
                          <span className="text-sm text-[var(--text)] truncate">{b.name}</span>
                        </div>
                        <p className={`text-sm font-bold shrink-0 ${b.balance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {b.balance >= 0 ? `gets Rs. ${Math.round(b.balance)}` : `owes Rs. ${Math.round(Math.abs(b.balance))}`}
                        </p>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden ml-9">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${b.balance >= 0 ? "bg-emerald-400" : "bg-red-400"}`}
                          style={{ width: `${Math.min(100, (b.paid / maxPaid) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-dim)] mt-4 text-center">
                  Bar shows what each person paid, relative to the biggest contributor
                </p>
              </div>
            )}
          </div>

          {/* Right col — history */}
          <div className="card p-5">
            <h3 className="cinzel text-sm text-[var(--text)] mb-4 uppercase tracking-wider flex items-center gap-2">
              <Receipt size={14} className="text-[var(--accent)]" /> History
            </h3>

            {loading ? (
              <div className="flex flex-col gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-[62px] rounded-xl bg-[var(--bg)] border border-[var(--border)] animate-pulse" />
                ))}
              </div>
            ) : expenses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-3">
                  <Receipt size={20} className="text-[var(--accent)]" />
                </div>
                <p className="text-[var(--text-dim)] text-sm">No expenses yet. Add your first one!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto pr-1">
                {expenses.map((expense) => {
                  const cfg = CATEGORY_CONFIG[expense.category] || CATEGORY_CONFIG.Other;
                  const CatIcon = cfg.Icon;
                  return (
                    <div
                      key={expense.id}
                      className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-3 group hover:border-[var(--accent)]/40 transition-colors"
                    >
                      {/* Category icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cfg.color}`}>
                        <CatIcon size={16} />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text)] truncate">{expense.name}</p>
                        <p className="text-xs text-[var(--text-dim)] mt-0.5">
                          Paid by <span className="text-[var(--text)]">{expense.paid_by_name}</span>
                          {" · "}
                          Rs. {(parseFloat(expense.amount) / expense.split_among).toFixed(0)} × {expense.split_among}
                        </p>
                      </div>

                      {/* Amount */}
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-[var(--text)]">
                          Rs. {parseFloat(expense.amount).toLocaleString()}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.color}`}>
                          {expense.category}
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-dim)] hover:text-red-400 bg-transparent border-none cursor-pointer p-1 shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}