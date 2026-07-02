// AISection.js
import React from "react";
import { useNavigate } from "react-router-dom";

const statsData = [
  {
    label: "500+ Destinations",
    path: "/explore",
    description: "Instantly discover hidden base camps, historic shrines, and local viewpoints analyzed specifically for your pacing.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Smart Itineraries",
    path: "/planner",
    description: "Generate adaptive daily trail matrices, travel timelines, and route schedules mapped seamlessly around your styles.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Real-time Pricing",
    path: "/expenses",
    description: "Monitor localized tracking indexes, project budget forecasts, and calculate live currency estimates effortlessly.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];
export default function AISection() {
  const navigate = useNavigate();

  // 🔒 Replace with your global authentication state logic (e.g., from useAuth)
  const isLoggedIn = true; 

  const handleStatClick = (destinationPath) => {
    if (isLoggedIn) {
      navigate(destinationPath);
    } else {
      navigate("/login");
    }
  };

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
        
        {/* Section Header */}
        {/* <div style={{ textAlign: "center", marginBottom: "4.5rem" }}> */}
         
          <h2 className="cinzel" style={{
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            fontWeight: "700",
            letterSpacing: "0.03em",
               marginBottom: "1rem",
             marginTop: "-2.5rem"
          }}>
            Recommendations that <span style={{ color: "var(--accent)" }}>understand you.</span>
          </h2>
          
          <p style={{
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "1rem",
            lineHeight: "1.8",
            fontWeight: "300",
            maxWidth: "640px",
            margin: "1.5rem auto 0"
          }}>
            Our AI analyzes your interests, budget, travel history, and group preferences
            to suggest destinations that truly match who you are—not just what's trending.
          </p>
          
          <div style={{
            width: "50px",
            height: "1px",
            backgroundColor: "var(--accent)",
            margin: "2rem auto 0",
            opacity: 0.3
          }} />
        </div>

        {/* Cohesive Elegant Grid Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2.5rem"
        }}>
          {statsData.map((stat) => (
            <div
              key={stat.label}
              onClick={() => handleStatClick(stat.path)}
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
              {/* Premium Icon Container */}
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
                {stat.icon}
              </div>

              {/* Card Label */}
              <h3 className="cinzel" style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "0.85rem",
                letterSpacing: "0.03em"
              }}>
                {stat.label}
              </h3>

              {/* Card Sub-Description */}
              <p style={{
                fontSize: "0.92rem",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: "1.7",
                fontWeight: "300",
                margin: 0
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      
    </section>
  );
}