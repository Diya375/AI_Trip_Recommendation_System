import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { Trash2, FolderOpen, Sparkles, Send, Backpack, Loader2 } from "lucide-react";

function Assistant() {
  const location = useLocation();
  const tripData = location.state;
  const messagesEndRef = useRef(null);

  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(tripData?.tripId || null);
  const [selectedTripName, setSelectedTripName] = useState(tripData?.tripName || null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  // load user's trips for selector
  useEffect(() => {
    API.get("/trips/my").then((res) => setTrips(res.data)).catch(() => {});
  }, []);

  // load history whenever selectedTripId changes
  useEffect(() => {
    setHistoryLoading(true);
    const url = selectedTripId
      ? `/ai/history?trip_id=${selectedTripId}`
      : "/ai/history";

    API.get(url)
      .then((res) => {
        if (res.data.length > 0) {
          setMessages(res.data.map((m) => ({ sender: m.sender, text: m.message })));
        } else {
          setMessages([{
            sender: "ai",
            text: selectedTripId
              ? `This is the chat history for "${selectedTripName}". Ask me anything or generate a trip plan!`
              : "I am YatraVerse AI. Ask me anything about traveling in Nepal.",
          }]);
        }
      })
      .catch(() => {
        setMessages([{ sender: "ai", text: "I am YatraVerse AI. Ask me anything about traveling in Nepal." }]);
      })
      .finally(() => setHistoryLoading(false));
  }, [selectedTripId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveMessage = async (sender, message) => {
    try {
      await API.post("/ai/history", { sender, message, trip_id: selectedTripId });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true);
    await saveMessage("user", userText);
    try {
      const res = await API.post("/ai/chat", { message: userText });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
      await saveMessage("ai", res.data.reply);
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const generateTripPlan = async () => {
    if (!tripData?.preferences?.length) return;
    setGenerating(true);
    const userText = `Generate a group trip plan for "${tripData.tripName}" based on all members' preferences.`;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    await saveMessage("user", userText);
    try {
      const res = await API.post("/ai/trip-plan", {
        tripName: tripData.tripName,
        members: tripData.members,
        preferences: tripData.preferences,
      });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.plan }]);
      await saveMessage("ai", res.data.plan);
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "Failed to generate trip plan." }]);
    } finally {
      setGenerating(false);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm("Clear this chat history?")) return;
    try {
      const url = selectedTripId ? `/ai/history?trip_id=${selectedTripId}` : "/ai/history";
      await API.delete(url);
      setMessages([{
        sender: "ai",
        text: "I am YatraVerse AI. Ask me anything about traveling in Nepal.",
      }]);
    } catch {
      alert("Failed to clear history");
    }
  };

  const renderText = (text) =>
    text.split("\n").map((line, i) => {
      const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className="my-0.5" dangerouslySetInnerHTML={{ __html: html }} />;
    });

  return (
    <DashboardLayout>
      <div className="fade-up max-w-3xl mx-auto">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="cinzel text-3xl text-gray-900">AI Assistant</h1>
            <p className="text-gray-500 text-sm mt-0.5">Your personal travel guide</p>
          </div>
          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200
              text-gray-400 text-xs hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
          >
            <Trash2 size={13} /> Clear History
          </button>
        </div>

        {/* ── TRIP SELECTOR ── */}
        <div className="mb-4 px-5 py-3.5 rounded-2xl border border-gray-200 bg-white flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400 shrink-0">
            <FolderOpen size={15} />
            <span className="text-xs whitespace-nowrap">Viewing history for</span>
          </div>
          <select
            value={selectedTripId || ""}
            onChange={(e) => {
              const val = e.target.value;
              const trip = trips.find((t) => t.id === parseInt(val));
              setSelectedTripId(val ? parseInt(val) : null);
              setSelectedTripName(trip?.name || null);
            }}
            className="flex-1 min-w-[160px] px-3 py-1.5 rounded-lg border border-gray-200 bg-white
              text-gray-900 text-sm cursor-pointer focus:outline-none focus:border-[var(--accent)]/60"
          >
            <option value="">General Chat</option>
            {trips.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* ── GENERATE PLAN BANNER ── */}
        {tripData?.preferences?.length > 0 && selectedTripId === tripData?.tripId && (
          <div className="mb-4 px-5 py-4 rounded-2xl border border-gray-200 bg-white flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                <Backpack size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{tripData.tripName}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {tripData.preferences.length} of {tripData.members?.length} members submitted preferences
                </p>
              </div>
            </div>
            <button
              onClick={generateTripPlan}
              disabled={generating}
              className="btn btn-primary flex items-center gap-2 px-4 py-2.5 text-sm disabled:opacity-70"
            >
              <Sparkles size={14} />
              {generating ? "Generating..." : "Generate Group Trip Plan"}
            </button>
          </div>
        )}

        {/* ── CHAT WINDOW ── */}
        <div className="rounded-2xl border border-gray-200 bg-white flex flex-col p-5" style={{ height: "62vh" }}>
          <div className="flex-1 overflow-y-auto pr-2 mb-4 flex flex-col gap-3">
            {historyLoading ? (
              <p className="text-gray-400 text-sm text-center mt-8">Loading history...</p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-4 py-3 max-w-[85%] text-sm leading-relaxed rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-[var(--accent)] text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))
            )}

            {(loading || generating) && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-100 text-gray-400 text-sm flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin" />
                  {generating ? "Planning your trip..." : "Typing..."}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3 border-t border-gray-100 pt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedTripId ? `Ask about ${selectedTripName}...` : "Ask about destinations, budgets, or itineraries..."}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900
                placeholder:text-gray-400 focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading || generating || historyLoading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || generating || !input.trim()}
              className="btn btn-primary px-5 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}
            >
              <Send size={15} />
              Send
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Assistant;