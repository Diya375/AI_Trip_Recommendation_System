// AISection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const characteristicsData = [
  {
    id: "personalization",
    label: "Hyper-Personalized Engine",
    path: "/explore",
    description: "Moves beyond generic trending feeds. Our system cross-references your pacing preferences, historical depth choices, and group dynamics to map spots uniquely tailored to your taste.",
    badge: "Tailored AI"
  },
  {
    id: "itineraries",
    label: "Adaptive Matrix Planner",
    path: "/planner",
    description: "Builds responsive, multi-day route blocks that sync geographic density with logical travel times, eliminating back-tracking automatically.",
    badge: "Smart Routing"
  },
  {
    id: "pricing",
    label: "Live Cost Indexing",
    path: "/expenses",
    description: "Provides fully transparent, community-verified price forecasting and live localized expense modeling, keeping budgets accurate down to the dollar.",
    badge: "Zero Estimate Hidden"
  }
];

export default function AISection() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
      padding: "8rem 2rem 10rem", 
      backgroundColor: "#ffffff", // Crisp Wanderlog Pure White
      color: "#0f172a",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Soft Premium Architectural Backdrop Mesh */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "600px",
        background: "radial-gradient(120% 120% at 50% 0%, rgba(45, 90, 67, 0.03) 0%, rgba(255, 255, 255, 0) 80%)",
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Editorial Section Header */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{ width: "24px", height: "1px", backgroundColor: "#2d5a43" }} />
            <span style={{
              fontSize: "0.75rem",
              color: "#2d5a43",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: "700"
            }}>
              Core Platform DNA
            </span>
          </div>
          
          <h2 style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            color: "#0f172a",
            lineHeight: 1.15,
            maxWidth: "800px"
          }}>
            An intelligent ecosystem built for <span style={{ color: "#2d5a43" }}>intentional exploration.</span>
          </h2>
        </div>

        {/* Premium Grid Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", 
          gap: "2rem"
        }}>
          {characteristicsData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: "#ffffff",
                  border: isHovered ? "1px solid #2d5a43" : "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "3rem 2.5rem",
                  transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: isHovered 
                    ? "0 30px 60px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(45, 90, 67, 0.05)" 
                    : "0 4px 20px rgba(15, 23, 42, 0.015)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  {/* Pill Badge */}
                  <span style={{
                    display: "inline-block",
                    padding: "0.3rem 0.75rem",
                    backgroundColor: isHovered ? "#eaf2ed" : "#f1f5f9",
                    borderRadius: "6px",
                    fontSize: "0.7rem",
                    color: isHovered ? "#2d5a43" : "#64748b",
                    fontWeight: "600",
                    letterSpacing: "0.02em",
                    marginBottom: "2rem",
                    transition: "all 0.3s ease"
                  }}>
                    {item.badge}
                  </span>

                  {/* Character Title */}
                  <h3 style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: "1.35rem",
                    fontWeight: "700",
                    letterSpacing: "-0.01em",
                    marginBottom: "1rem",
                    color: "#0f172a"
                  }}>
                    {item.label}
                  </h3>

                  {/* Character Description */}
                  <p style={{
                    fontSize: "0.95rem",
                    color: "#475569",
                    lineHeight: "1.7",
                    fontWeight: "400",
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Micro Action Trigger */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "2.5rem",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#2d5a43",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}>
                  Explore capabilities <span>➔</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}