import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function Assistant() {
  const location = useLocation();
  const tripData = location.state;
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: tripData?.tripName
        ? `Namaste 🙏 I have received preferences for "${tripData.tripName}" from ${tripData.preferences?.length} members. Click "Generate Group Trip Plan" to get started!`
        : "Namaste 🙏 I am YatraVerse AI. Ask me anything about traveling in Nepal.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await API.post("/ai/chat", { message: input });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const generateTripPlan = async () => {
    if (!tripData?.preferences?.length) return;
    setGenerating(true);
    setMessages((prev) => [...prev, {
      sender: "user",
      text: `Generate a group trip plan for "${tripData.tripName}" based on all members' preferences.`,
    }]);
    try {
      const res = await API.post("/ai/trip-plan", {
        tripName: tripData.tripName,
        members: tripData.members,
        preferences: tripData.preferences,
      });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.plan }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Failed to generate trip plan. Please try again." }]);
    } finally {
      setGenerating(false);
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

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 className="section-title">AI Assistant</h1>
          <p className="section-sub" style={{ marginBottom: 0 }}>Your personal travel guide</p>
        </div>

        {/* Group plan banner */}
        {tripData?.preferences?.length > 0 && (
          <div style={{
            marginBottom: "1.25rem",
            padding: "1rem 1.25rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
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

        {/* Chat */}
        <div className="card" style={{ display: "flex", flexDirection: "column", height: "65vh" }}>
          <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.5rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                <div
                  className={msg.sender === "user" ? "bubble-user" : "bubble-ai"}
                  style={{ padding: "0.85rem 1.25rem", maxWidth: "85%", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text)" }}
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}
            {(loading || generating) && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="bubble-ai" style={{ padding: "0.85rem 1.25rem", color: "var(--text-dim)", fontStyle: "italic", fontSize: "0.9rem" }}>
                  YatraVerse AI is {generating ? "planning your trip" : "typing"}...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about destinations, budgets, or itineraries..."
              className="input"
              style={{ flex: 1 }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading || generating}
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