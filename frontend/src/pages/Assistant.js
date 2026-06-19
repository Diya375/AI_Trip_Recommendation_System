import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Assistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste 🙏 I am YatraVerse AI. Ask me anything about traveling in Nepal.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { sender: "ai", text: data.reply || "No response from server." }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Cannot connect to YatraVerse AI server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="fade-up" style={{ maxWidth: "700px", margin: "0 auto", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 className="section-title">AI Assistant</h1>
          <p className="section-sub" style={{ marginBottom: 0 }}>Your personal travel guide</p>
        </div>

        <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", height: "65vh" }}>
          <div style={{ flex: 1, overflowY: "auto", paddingRight: "0.5rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                <div className={msg.sender === "user" ? "bubble-user" : "bubble-ai"} style={{ padding: "0.85rem 1.25rem", maxWidth: "80%", fontSize: "0.95rem", lineHeight: 1.5, color: "var(--text)" }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="bubble-ai" style={{ padding: "0.85rem 1.25rem", color: "var(--text-dim)", fontStyle: "italic", fontSize: "0.9rem" }}>
                  YatraVerse AI is typing...
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about destinations, budgets, or itineraries..."
              className="input"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="btn btn-primary" style={{ padding: "0 1.5rem" }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Assistant;