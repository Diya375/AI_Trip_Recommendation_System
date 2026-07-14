import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import {
  DollarSign, ArrowLeft, ArrowRight, Wallet, Users, Plus,
  ArrowRightLeft, Trash2, ChevronRight, Receipt,
  UtensilsCrossed, Bus, BedDouble, Activity, ShoppingBag, Package,
  Mountain, Waves, Tent, Map, Plane, Navigation, Route, Leaf,
} from "lucide-react";

const CATEGORIES = ["Food", "Transport", "Accommodation", "Activities", "Shopping", "Other"];

const CATEGORY_CONFIG = {
  Food:          { icon: UtensilsCrossed, bg: "bg-red-50",    text: "text-red-500" },
  Transport:     { icon: Bus,             bg: "bg-blue-50",   text: "text-blue-500" },
  Accommodation: { icon: BedDouble,       bg: "bg-purple-50", text: "text-purple-500" },
  Activities:    { icon: Activity,        bg: "bg-green-50",  text: "text-green-500" },
  Shopping:      { icon: ShoppingBag,     bg: "bg-yellow-50", text: "text-yellow-500" },
  Other:         { icon: Package,         bg: "bg-gray-100",  text: "text-gray-500" },
};

const TRIP_ICONS = [Mountain, Waves, Tent, Map, Plane, Navigation, Route, Leaf];

export default function Expenses() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
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

  const nameInputRef = useRef(null);

  useEffect(() => {
    API.get("/trips/my").then((res) => setTrips(res.data));
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
  const balances = members.map((m) => ({
    name: m.name,
    paid: paidMap[m.name] || 0,
    balance: (paidMap[m.name] || 0) - fairShare,
  }));

  const focusAddForm = () => {
    nameInputRef.current?.focus();
    nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 " +
    "placeholder:text-gray-400 outline-none focus:border-[var(--accent)]/50 transition-colors";

  // ---------- Trip selector screen ----------
  if (!selectedTrip) {
    return (
      <DashboardLayout>
        <div className="fade-up max-w-5xl mx-auto px-4 sm:px-0">

          <div className="mb-6 sm:mb-10">
            <p className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest mb-1">
              <DollarSign size={13} strokeWidth={2} />
              Expense Manager
            </p>
            <h1 className="cinzel text-3xl sm:text-4xl text-[var(--accent)] mb-2">
              Track and split costs fairly
            </h1>
            <p className="text-gray-500 text-sm">Choose a trip to see its ledger.</p>
          </div>

          {trips.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 flex flex-col items-center text-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                <Wallet size={18} strokeWidth={1.8} />
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                You need a trip first before you can start tracking expenses.
              </p>
              <button
                onClick={() => navigate("/create-trip")}
                className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold
                  hover:opacity-90 transition-opacity border-none cursor-pointer"
              >
                Create a Trip
              </button>
            </div>
          ) : (
            <>
              <p className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest mb-4 pl-1">
                <ChevronRight size={13} strokeWidth={2} />
                Select a trip
              </p>
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
              >
                {trips.map((trip, i) => {
                  const TripIcon = TRIP_ICONS[i % TRIP_ICONS.length];
                  return (
                    <div
                      key={trip.id}
                      onClick={() => setSelectedTrip(trip)}
                      className="rounded-2xl border border-gray-200 bg-white cursor-pointer group p-5
                        flex items-center gap-4 transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-md"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                        <TripIcon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="cinzel text-sm text-gray-900 font-semibold truncate">{trip.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 capitalize">{trip.role}</p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-gray-300 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0"
                      />
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

  // ---------- Trip ledger screen ----------
  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto px-4 sm:px-0">

        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <button
            onClick={() => setSelectedTrip(null)}
            className="flex items-center gap-1 text-xs text-[var(--accent)] bg-transparent border-none
              cursor-pointer hover:underline mb-2 p-0"
          >
            <ArrowLeft size={12} /> All Trips
          </button>
          <h1 className="cinzel text-3xl sm:text-4xl text-[var(--accent)] mb-2 break-words">
            {selectedTrip.name}
          </h1>
          <p className="text-gray-500 text-sm">{members.length} members · Expense Tracker</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Wallet size={18} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900 leading-none truncate">
                Rs. {totalSpent.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Total Spent</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Users size={18} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900 leading-none truncate">
                Rs. {Math.round(fairShare).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Fair Share Each</p>
            </div>
          </div>

          <div
            onClick={focusAddForm}
            className="rounded-2xl bg-[var(--accent)] p-5 flex items-center gap-4 cursor-pointer
              hover:opacity-90 transition-opacity"
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
              <Plus size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Add Expense</p>
              <p className="text-xs text-white/70 uppercase tracking-wider mt-1">New Entry</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-[1fr_1.4fr]">

          {/* Left col — add + settlement */}
          <div className="flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">

            {/* Add expense form */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Plus size={16} strokeWidth={1.8} />
                </div>
                <h2 className="cinzel text-base text-gray-900">Add Expense</h2>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder="What was it for?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Amount (Rs.)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={inputClass}
                  />
                  <select
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Who paid?</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const active = category === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border cursor-pointer transition-all
                          ${active
                            ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                            : "border-gray-200 bg-white text-gray-500 hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Split */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5">
                  <span className="text-xs text-gray-400">Split among</span>
                  <input
                    type="number" min="1"
                    value={splitAmong}
                    onChange={(e) => setSplitAmong(e.target.value)}
                    className="w-12 text-center bg-transparent border-none outline-none text-gray-900 font-bold text-sm"
                  />
                  <span className="text-xs text-gray-400">people</span>
                  {amount && splitAmong && (
                    <span className="w-full sm:w-auto sm:ml-auto text-xs font-semibold text-[var(--accent)]">
                      = Rs. {(parseFloat(amount) / parseInt(splitAmong)).toFixed(0)} each
                    </span>
                  )}
                </div>

                <button
                  onClick={handleAdd}
                  disabled={adding}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)]
                    text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity
                    border-none cursor-pointer"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  {adding ? "Adding..." : "Add Expense"}
                </button>
              </div>
            </div>

            {/* Settlement */}
            {balances.length > 0 && totalSpent > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                    <ArrowRightLeft size={16} strokeWidth={1.8} />
                  </div>
                  <h2 className="cinzel text-base text-gray-900">Settlement</h2>
                </div>

                <div className="flex flex-col gap-2.5">
                  {balances.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 text-sm border-b border-gray-100 pb-2.5 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs text-white font-bold shrink-0">
                          {b.name[0].toUpperCase()}
                        </div>
                        <span className="text-gray-800 truncate">{b.name}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`font-bold ${b.balance >= 0 ? "text-green-600" : "text-red-500"}`}>
                          {b.balance >= 0 ? `+Rs. ${Math.round(b.balance)}` : `-Rs. ${Math.round(Math.abs(b.balance))}`}
                        </p>
                        <p className="text-xs text-gray-400">paid Rs. {Math.round(b.paid)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">Green gets back · red owes</p>
              </div>
            )}
          </div>

          {/* Right col — history */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Receipt size={16} strokeWidth={1.8} />
                </div>
                <h2 className="cinzel text-base text-gray-900">History</h2>
              </div>
              <span className="text-xs text-gray-400">{expenses.length} entries</span>
            </div>

            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : expenses.length === 0 ? (
              <div className="text-center py-12 sm:py-16 border border-dashed border-gray-200 rounded-xl">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mx-auto mb-3">
                  <Receipt size={18} strokeWidth={1.8} />
                </div>
                <p className="text-gray-400 text-sm">No expenses yet. Add your first one!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-[420px] lg:max-h-[560px] overflow-y-auto pr-1">
                {expenses.map((expense) => {
                  const cfg = CATEGORY_CONFIG[expense.category] || CATEGORY_CONFIG.Other;
                  const CatIcon = cfg.icon;
                  return (
                    <div
                      key={expense.id}
                      className="flex flex-wrap sm:flex-nowrap items-center gap-3 rounded-xl border border-gray-100 p-3 group
                        hover:border-[var(--accent)]/30 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.text}`}>
                        <CatIcon size={16} strokeWidth={1.8} />
                      </div>

                      <div className="flex-1 min-w-[140px]">
                        <p className="text-sm font-semibold text-gray-900 truncate">{expense.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          Paid by <span className="text-gray-700">{expense.paid_by_name}</span>
                          {" · "}
                          Rs. {(parseFloat(expense.amount) / expense.split_among).toFixed(0)} × {expense.split_among}
                        </p>
                      </div>

                      <div className="text-right shrink-0 ml-auto sm:ml-0">
                        <p className="text-sm font-bold text-gray-900">
                          Rs. {parseFloat(expense.amount).toLocaleString()}
                        </p>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                          {expense.category}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity
                          text-gray-300 hover:text-red-500 bg-transparent border-none cursor-pointer p-1 shrink-0"
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