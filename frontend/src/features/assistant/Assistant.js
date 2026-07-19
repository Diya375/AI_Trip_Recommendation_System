import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { Trash2, Sparkles, Send, Loader2, Copy, Check, ChevronDown, Bot } from "lucide-react";

const SUGGESTIONS = [
  "Best hidden gems near Pokhara 🏔️",
  "Day-by-day itinerary for Annapurna circuit",
  "Average daily budget breakdown for Nepal travel",
  "Local food must-tries and restaurant tips 🍜",
  "Safe transport options across Nepal 🚌",
  "Best trekking seasons and weather guide",
];

function renderText(text) {
  return text.split("\n").map((line, i) => {
    const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <p key={i} className="my-0.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

export default function Assistant() {
  const location = useLocation();
  const navigate  = useNavigate();
  const tripData  = location.state;
  const endRef    = useRef(null);

  const [trips,          setTrips]          = useState([]);
  const [selectedId,     setSelectedId]     = useState(tripData?.tripId || null);
  const [selectedName,   setSelectedName]   = useState(tripData?.tripName || null);
  const [messages,       setMessages]       = useState([]);
  const [input,          setInput]          = useState("");
  const [loading,        setLoading]        = useState(false);
  const [generating,     setGenerating]     = useState(false);
  const [histLoading,    setHistLoading]    = useState(false);
  const [copiedIdx,      setCopiedIdx]      = useState(null);
  const [showTripDrop,   setShowTripDrop]   = useState(false);

  useEffect(() => {
    API.get("/trips/my").then(r => setTrips(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setHistLoading(true);
    const url = selectedId ? `/ai/history?trip_id=${selectedId}` : "/ai/history";
    API.get(url)
      .then(r => {
        if (r.data.length > 0) {
          setMessages(r.data.map(m => ({ sender: m.sender, text: m.message })));
        } else {
          setMessages([{ sender: "ai", text: selectedId
            ? `Chat context loaded for **"${selectedName}"**. Ask me anything or generate a group plan!`
            : "Hello! I'm **YatraVerse AI** — your Nepal travel guide. Ask me about destinations, budgets, itineraries, or anything trip-related." }]);
        }
      })
      .catch(() => setMessages([{ sender: "ai", text: "Ready to help you plan your next adventure in Nepal!" }]))
      .finally(() => setHistLoading(false));
  }, [selectedId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const persist = async (sender, message) => {
    try { await API.post("/ai/history", { sender, message, trip_id: selectedId }); } catch {}
  };

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setMessages(p => [...p, { sender: "user", text: msg }]);
    setInput("");
    setLoading(true);
    await persist("user", msg);
    try {
      const res = await API.post("/ai/chat", { message: msg });
      setMessages(p => [...p, { sender: "ai", text: res.data.reply }]);
      await persist("ai", res.data.reply);
    } catch {
      setMessages(p => [...p, { sender: "ai", text: "Something went wrong. Please try again." }]);
    } finally { setLoading(false); }
  };

  const generatePlan = async () => {
    if (!tripData?.preferences?.length) return;
    setGenerating(true);
    const userMsg = `Generate a detailed group trip plan for **"${tripData.tripName}"** based on all members' submitted preferences.`;
    setMessages(p => [...p, { sender: "user", text: userMsg }]);
    await persist("user", userMsg);
    try {
      const res = await API.post("/ai/trip-plan", { tripName: tripData.tripName, members: tripData.members, preferences: tripData.preferences });
      setMessages(p => [...p, { sender: "ai", text: res.data.plan }]);
      await persist("ai", res.data.plan);
    } catch { setMessages(p => [...p, { sender: "ai", text: "Failed to generate plan." }]); }
    finally { setGenerating(false); }
  };

  const clearHistory = async () => {
    if (!window.confirm("Clear this chat history?")) return;
    try {
      await API.delete(selectedId ? `/ai/history?trip_id=${selectedId}` : "/ai/history");
      setMessages([{ sender: "ai", text: "Chat cleared. Ask me anything about Nepal travel!" }]);
    } catch { alert("Failed to clear."); }
  };

  const copyMsg = (text, i) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="fade-up max-w-3xl mx-auto flex flex-col h-[calc(100vh-5rem)]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
              <Bot size={18} strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="cinzel text-xl font-bold text-[var(--text)]">AI Travel Assistant</h1>
              <p className="text-xs text-[var(--text-dim)]">Powered by YatraVerse · Nepal specialist</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Trip selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTripDrop(!showTripDrop)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer font-semibold"
              >
                {selectedName || "General Chat"}
                <ChevronDown size={12} />
              </button>
              {showTripDrop && (
                <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-lg z-10 overflow-hidden">
                  <button
                    onClick={() => { setSelectedId(null); setSelectedName(null); setShowTripDrop(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-colors border-none bg-transparent cursor-pointer font-semibold"
                  >
                    General Chat
                  </button>
                  {trips.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setSelectedId(t.id); setSelectedName(t.name); setShowTripDrop(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-colors border-none bg-transparent cursor-pointer border-t border-[var(--border)]/50"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-xs text-[var(--text-dim)] hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
            >
              <Trash2 size={12} /> Clear
            </button>
          </div>
        </div>

        {/* ── Generate Plan Banner (only when navigated with tripData) ── */}
        {tripData?.preferences?.length > 0 && selectedId === tripData?.tripId && (
          <div className="mb-3 flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 shrink-0">
            <div>
              <p className="text-sm font-bold text-[var(--text)]">{tripData.tripName}</p>
              <p className="text-xs text-[var(--text-dim)]">{tripData.preferences.length} of {tripData.members?.length} members have submitted preferences</p>
            </div>
            <button
              onClick={generatePlan}
              disabled={generating}
              className="btn btn-primary flex items-center gap-2 px-4 py-2 text-xs shrink-0"
            >
              <Sparkles size={13} />
              {generating ? "Generating…" : "Generate Plan"}
            </button>
          </div>
        )}

        {/* ── Chat messages ── */}
        <div className="flex-1 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col p-4 gap-3 min-h-0">
          {histLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[var(--text-dim)] text-sm animate-pulse">Loading history…</p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="relative group max-w-[80%]">
                    <div className={`px-4 py-3 text-sm rounded-2xl
                      ${msg.sender === "user"
                        ? "bubble-user"
                        : "bubble-ai text-[var(--text)]"}`}>
                      {renderText(msg.text)}
                    </div>
                    {msg.sender === "ai" && (
                      <button
                        onClick={() => copyMsg(msg.text, i)}
                        className="absolute -right-7 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[var(--text-dim)] hover:text-[var(--text)] bg-transparent border-none cursor-pointer"
                      >
                        {copiedIdx === i ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {(loading || generating) && (
                <div className="flex justify-start">
                  <div className="bubble-ai px-4 py-3 flex items-center gap-2 text-sm text-[var(--text-dim)]">
                    <Loader2 size={13} className="animate-spin text-[var(--accent)]" />
                    {generating ? "Formulating your trip plan…" : "Typing…"}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </>
          )}
        </div>

        {/* ── Quick Suggestions ── */}
        <div className="flex gap-2 overflow-x-auto py-2 shrink-0" style={{ scrollbarWidth: "none" }}>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => send(s)}
              disabled={loading}
              className="shrink-0 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-xs text-[var(--text-dim)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all cursor-pointer whitespace-nowrap disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>

        {/* ── Input ── */}
        <div className="flex gap-3 shrink-0">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
            placeholder={selectedId ? `Ask about ${selectedName}…` : "Ask anything about Nepal travel…"}
            disabled={loading || generating || histLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text)] placeholder:text-[var(--text-dim)]/50 outline-none focus:border-[var(--accent)]/60 transition-colors"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading || generating}
            className="btn btn-primary px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={14} /> Send
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}