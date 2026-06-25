import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { Trash2 } from "lucide-react";

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
              ? `Namaste 🙏 This is the chat history for "${selectedTripName}". Ask me anything or generate a trip plan!`
              : "Namaste 🙏 I am YatraVerse AI. Ask me anything about traveling in Nepal.",
          }]);
        }
      })
      .catch(() => {
        setMessages([{ sender: "ai", text: "Namaste 🙏 I am YatraVerse AI. Ask me anything about traveling in Nepal." }]);
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
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Something went wrong. Please try again." }]);
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
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Failed to generate trip plan." }]);
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
        text: "Namaste 🙏 I am YatraVerse AI. Ask me anything about traveling in Nepal.",
      }]);
    } catch {
      alert("Failed to clear history");
    }
  };

  const renderText = (text) =>
    text.split("\n").map((line, i) => {
      const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} style={{ margin: "0.15rem 0" }} dangerouslySetInnerHTML={{ __html: html }} />;
    });

  return (
    <DashboardLayout>
      <div className="fade-up" style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <h1 className="section-title" style={{ margin: 0 }}>AI Assistant</h1>
            <p className="section-sub" style={{ margin: 0 }}>Your personal travel guide</p>
          </div>
          <button
            onClick={clearHistory}
            style={{
              background: "none", border: "1px solid var(--border)", borderRadius: "8px",
              padding: "0.4rem 0.75rem", color: "var(--text-dim)", cursor: "pointer",
              fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#e74c3c"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-dim)"}
          >
            <Trash2 size={13} /> Clear History
          </button>
        </div>

        {/* Trip selector */}
        <div style={{
          marginBottom: "1.25rem", padding: "0.85rem 1.25rem",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "12px", display: "flex", alignItems: "center",
          gap: "1rem", flexWrap: "wrap",
        }}>
          <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", margin: 0, whiteSpace: "nowrap" }}>
            📂 Viewing history for:
          </p>
          <select
            value={selectedTripId || ""}
            onChange={(e) => {
              const val = e.target.value;
              const trip = trips.find((t) => t.id === parseInt(val));
              setSelectedTripId(val ? parseInt(val) : null);
              setSelectedTripName(trip?.name || null);
            }}
            style={{
              background: "var(--bg)", border: "1px solid var(--border)",
              borderRadius: "8px", padding: "0.4rem 0.75rem",
              color: "var(--text)", fontSize: "0.85rem",
              cursor: "pointer", flex: 1, minWidth: "160px",
            }}
          >
            <option value="">General Chat</option>
            {trips.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Generate plan banner — only when navigated from planner with preferences */}
        {tripData?.preferences?.length > 0 && selectedTripId === tripData?.tripId && (
          <div style={{
            marginBottom: "1.25rem", padding: "1rem 1.25rem",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "12px", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: "1rem", flexWrap: "wrap",
          }}>
            <div>
              <p style={{ fontWeight: 600, color: "var(--text)", margin: 0, fontSize: "0.9rem" }}>
                🎒 {tripData.tripName}
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", margin: "0.2rem 0 0" }}>
                {tripData.preferences.length} of {tripData.members?.length} members submitted preferences
              </p>
            </div>
            <button
              onClick={generateTripPlan}
              disabled={generating}
              className="btn btn-primary"
              style={{ padding: "0.65rem 1.25rem", fontSize: "0.875rem", opacity: generating ? 0.7 : 1 }}
            >
              {generating ? "Generating..." : "✨ Generate Group Trip Plan"}
            </button>
          </div>
        )}

        {/* Chat window */}
        <div className="card" style={{ display: "flex", flexDirection: "column", height: "62vh" }}>
          <div style={{
            flex: 1, overflowY: "auto", paddingRight: "0.5rem",
            marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "1rem",
          }}>
            {historyLoading ? (
              <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", textAlign: "center", marginTop: "2rem" }}>
                Loading history...
              </p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                  <div
                    className={msg.sender === "user" ? "bubble-user" : "bubble-ai"}
                    style={{ padding: "0.85rem 1.25rem", maxWidth: "85%", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text)" }}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))
            )}

            {(loading || generating) && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="bubble-ai" style={{ padding: "0.85rem 1.25rem", color: "var(--text-dim)", fontStyle: "italic", fontSize: "0.9rem" }}>
                  YatraVerse AI is {generating ? "planning your trip" : "typing"}...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedTripId ? `Ask about ${selectedTripName}...` : "Ask about destinations, budgets, or itineraries..."}
              className="input"
              style={{ flex: 1 }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading || generating || historyLoading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || generating || !input.trim()}
              className="btn btn-primary"
              style={{ padding: "0 1.5rem", opacity: !input.trim() ? 0.6 : 1 }}
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Assistant;