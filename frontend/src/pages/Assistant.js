import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mountain from "../assets/images/prayering-flag.jpg";

function Assistant() {
  const navigate = useNavigate();

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

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        sender: "ai",
        text: data.reply || "No response from server.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Cannot connect to YatraVerse server. Make sure Flask is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen p-6 sm:p-10 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-5xl text-center mb-6">
          YatraVerse AI Assistant
        </h1>

        {/* CHAT BOX */}
        <div className="h-[500px] overflow-y-auto p-5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/15 mb-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-3 rounded-2xl max-w-[70%] ${
                  msg.sender === "user" ? "bg-white/20" : "bg-white/10"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}

          {loading && (
            <p className="opacity-70">YatraVerse AI is typing...</p>
          )}
        </div>

        {/* INPUT BOX */}
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Nepal travel..."
            className="flex-1 p-4 rounded-xl border-none text-base text-black outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            onClick={sendMessage}
            className="px-6 py-4 rounded-xl border-none bg-white/20 text-white cursor-pointer font-['Cinzel',serif] hover:bg-white/30 transition"
          >
            Send
          </button>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/home")}
          className="mt-5 px-6 py-3 rounded-xl border-none bg-white/15 text-white cursor-pointer hover:bg-white/25 transition"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

export default Assistant;