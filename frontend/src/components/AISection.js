// AISection.js
import React from "react";

const dnaFeatures = [
  {
    id: "planner",
    title: "Optimize your route",
    desc: "Built directly into your Plan Journey module. Rearrange multi-destination loops across Nepal mathematically to reduce travel fatigue and save road transit time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    id: "expenses",
    title: "Expense tracking",
    desc: "Track and split costs fairly inside the Expense Manager ledger. Log shared expenditures down to the local rupee with zero hidden service commissions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: "explore",
    title: "Explore Nepal",
    desc: "Uncover hidden regional destinations, calculated trail maps, and curated points of interest customized to your trip's primary scale dynamics.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  },
  {
    id: "assistant",
    title: "AI Assistant",
    desc: "Your dedicated personal conversational guide. Actively addresses real-time queries and surfaces personalized contextual recommendations on the fly.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: "collaboration",
    title: "Group collaboration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    desc: "Plan harmoniously alongside multiple travel companions. Sync map markers, daily parameters, and expense items instantly with zero data fragmentation."
  },
  {
    id: "offline",
    title: "Offline caching",
    desc: "No signal, no worries. All synchronized itineraries, map blocks, and contact records are securely held locally for smooth tracking in remote regions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* 🛠️ Brand new pixel-perfect offline save icon */}
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <path d="M12 11v6M9 14l3 3 3-3" />
      </svg>
    )
  }
];
export default function AISection() {
  return (
    <section style={{
      width: "100%",
      padding: "6rem 2rem 8rem", 
      backgroundColor: "#131916", // Seamless dark-palette base matching Features.js
      color: "#ffffff",
      borderTop: "1px solid rgba(201, 169, 110, 0.05)",
      borderBottom: "1px solid rgba(201, 169, 110, 0.05)",
    
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Editorial Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.75rem",
            color: "#374F43",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: "600",
            marginBottom: "0.75rem"
          }}>
            Core Platform DNA
          </p>
          <h2 className="cinzel" style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: "700",
            letterSpacing: "0.01em",
            color: "#2B3E34",
            lineHeight: 1.3
          }}>
            Maximize your trip planning with YATRAVERSE
          </h2>
          <p style={{
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "1rem",
            fontFamily: "'Playfair Display', 'Georgia', serif",
            color: "#5c6660",
            marginTop: "0.75rem",
            maxWidth: "600px",
            margin: "0.75rem auto 0",
            fontWeight: "400"
          }}>
            Experience the full potential of comprehensive system tools engineered to establish an intuitive and streamlined journey structure.
          </p>
        </div>

        {/* Clean Wanderlog Pro Style Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem"
        }}>
          {dnaFeatures.map((item) => (
            <div
              key={item.id}
              style={{
                background: "linear-gradient(145deg, rgba(25, 33, 29, 0.4) 0%, rgba(19, 25, 22, 0.6) 100%)",
                border: "1px solid rgba(201, 169, 110, 0.08)",
                borderRadius: "16px",
                padding: "2.5rem 2rem",
                backdropFilter: "blur(4px)",
                transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(201, 169, 110, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(201, 169, 110, 0.08)";
              }}
            >
              {/* Minimal Vector Icon Block */}
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                background: "rgba(201, 169, 110, 0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.75rem",
                border: "1px solid rgba(201, 169, 110, 0.12)"
              }}>
                {item.icon}
              </div>

              {/* Feature Title */}
              <h3 style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#2B3E34",
                margin: 0,
                letterSpacing: "-0.01em"
              }}>
                {item.title}
              </h3>

              {/* Feature Description */}
              <p style={{
                fontSize: "0.92rem",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: "1.7",
                fontWeight: "300",
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}