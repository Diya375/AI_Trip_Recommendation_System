// Features.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const featureList = [
  {
    title: "Trip Planner",
    description:
      "Map out personalized itineraries, set your daily pacing, and coordinate customized routes seamlessly across Nepal's peaks and valleys.",
    path: "/Planner",
    number: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    title: "Expense Manager",
    description:
      "Monitor budgets, categorize expenditures, and track your financial footprint with live currency estimates tailored to Nepal.",
    path: "/Expenses",
    number: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Intelligent Assistant",
    description:
      "Get real-time answers, smart local guidance, and AI-powered recommendations custom-tailored to your current journey.",
    path: "/Assistant",
    number: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    ),
  },
];

export default function Features() {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const isLoggedIn = true;

  const handleCardClick = (destinationPath) => {
    navigate(isLoggedIn ? destinationPath : "/login");
  };

  return (
    <section
      style={{
        width: "100%",
        padding: "8rem 2rem",
        background: "var(--bg)",
        color: "var(--text)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(75, 119, 98, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1150px", margin: "0 auto", position: "relative" }}>

        {/* Section Label */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "var(--accent)",
              textTransform: "uppercase",
              fontWeight: "600",
              marginBottom: "1.5rem",
              padding: "0.4rem 1.2rem",
              border: "1px solid rgba(22, 107, 79, 0.25)",
              borderRadius: "50px",
              background: "rgba(22, 107, 79, 0.06)",
            }}
          >
            Platform Capabilities
          </span>

          <h2
            className="cinzel"
            style={{
              display: "block",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "700",
              letterSpacing: "0.03em",
              lineHeight: 1.2,
              marginTop: "1.2rem",
            }}
          >
            Everything You Need to{" "}
            <span style={{ color: "var(--accent)" }}>Journey Smarter.</span>
          </h2>

          <p
            style={{
              marginTop: "1.2rem",
              color: "var(--text-dim)",
              fontSize: "1rem",
              maxWidth: "500px",
              margin: "1.2rem auto 0",
              lineHeight: 1.8,
              fontWeight: "300",
            }}
          >
            Three powerful tools, one seamless travel experience — built for
            explorers of Nepal.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {featureList.map((feature, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div
                key={index}
                onClick={() => handleCardClick(feature.path)}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  position: "relative",
                  background: isHovered
                    ? "linear-gradient(145deg, rgba(22,107,79,0.08) 0%, rgba(244,247,245,1) 100%)"
                    : "var(--bg-card)",
                  border: isHovered
                    ? "1px solid rgba(22, 107, 79, 0.3)"
                    : "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "2.75rem 2.5rem",
                  cursor: "pointer",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isHovered
                    ? "0 24px 60px rgba(22,107,79,0.12), 0 0 0 1px rgba(22,107,79,0.08)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Card glow on hover */}
                {isHovered && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(22,107,79,0.4), transparent)",
                      borderRadius: "20px 20px 0 0",
                    }}
                  />
                )}

                {/* Number */}
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: isHovered
                      ? "var(--accent)"
                      : "var(--text-dim)",
                    fontWeight: "600",
                    marginBottom: "1.75rem",
                    transition: "color 0.35s ease",
                  }}
                >
                  {feature.number}
                </span>

                {/* Icon */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: isHovered
                      ? "rgba(22,107,79,0.1)"
                      : "rgba(22,107,79,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.75rem",
                    border: isHovered
                      ? "1px solid rgba(22,107,79,0.35)"
                      : "1px solid var(--border)",
                    color: isHovered ? "var(--accent)" : "var(--text-dim)",
                    transition: "all 0.35s ease",
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  className="cinzel"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    letterSpacing: "0.03em",
                    color: isHovered ? "var(--text)" : "var(--text)",
                    transition: "color 0.35s ease",
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-dim)",
                    lineHeight: "1.8",
                    fontWeight: "300",
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>

                {/* CTA Arrow */}
                <div
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.8rem",
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "0.15em",
                    color: isHovered
                      ? "var(--accent)"
                      : "var(--text-dim)",
                    opacity: isHovered ? 1 : 0.4,
                    textTransform: "uppercase",
                    fontWeight: "600",
                    transition: "all 0.35s ease",
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  Explore
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}