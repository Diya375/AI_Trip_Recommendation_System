// Features.js
import React from "react";
import { useNavigate } from "react-router-dom";

const featureList = [
  {
    title: "Trip Planner",
    description: "Map out personalized itineraries, set up your daily pacing, and coordinate customized routes seamlessly across Nepal.",
    path: "/Planner",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
  {
    title: "Expense Manager",
    description: "Manage your travel funds efficiently. Monitor budgets, categorize expenditures, and keep track of your financial footprint.",
    path: "/Expenses",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: "Intelligent Assistant",
    description: "Get real-time answers, smart local guidance, and automated recommendations custom-tailored to your current location.",
    path: "/Assistant",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  }
];

export default function Features() {
  const navigate = useNavigate();

  // 🔒 Replace true/false with your global authentication state logic
  const isLoggedIn = true; 

  const handleCardClick = (destinationPath) => {
    if (isLoggedIn) {
      navigate(destinationPath);
    } else {
      navigate("/login");
    }
  };

  return (
    <section style={{
      width: "100%",
      padding: "6rem 2rem",
      backgroundColor: "#ffffff", 
      color: "#ffffff",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "var(--accent)",
            textTransform: "uppercase",
            fontWeight: "600",
            marginBottom: "1rem",
             marginTop: "-2.5rem"
          }}>
            Platform Capabilities
          </p>
          <h2 className="cinzel" style={{
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            fontWeight: "700",
            letterSpacing: "0.03em"
          }}>
            Explore Your <span style={{ color: "var(--accent)" }}>Dashboard Tools.</span>
          </h2>
          <div style={{
            width: "50px",
            height: "1px",
            backgroundColor: "var(--accent)",
            margin: "1.5rem auto 0",
            opacity: 0.3
          }} />
        </div>

        {/* Features Interactive Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem"
        }}>
          {featureList.map((feature, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(feature.path)}
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
              {/* Icon Holder */}
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
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="cinzel" style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "0.85rem",
                letterSpacing: "0.03em"
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "0.95rem",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: "1.75",
                fontWeight: "300"
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}