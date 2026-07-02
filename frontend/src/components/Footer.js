// Footer.js
import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Trip Planner", to: "/Planner" },
  { label: "Expenses", to: "/Expenses" },
  { label: "AI Assistant", to: "/Assistant" },
  { label: "Login", to: "/login" },
  { label: "Sign Up", to: "/signup" },
];

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "240px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(22,107,79,0.3), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "4rem 2rem 3rem",
        }}
      >
        {/* Main row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: "300px" }}>
            <span
              className="cinzel"
              style={{
                display: "block",
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "var(--accent)",
                letterSpacing: "0.15em",
                marginBottom: "1rem",
              }}
            >
              YATRAVERSE
            </span>
            <p
              style={{
                color: "var(--text-dim)",
                fontSize: "0.88rem",
                lineHeight: "1.8",
                fontWeight: "300",
              }}
            >
              Your AI-powered companion for exploring Nepal's peaks, valleys, and
              ancient heritage — one curated journey at a time.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "var(--text-dim)",
                textTransform: "uppercase",
                fontWeight: "600",
                marginBottom: "1.25rem",
              }}
            >
              Navigate
            </p>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    color: "var(--text-dim)",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    fontWeight: "300",
                    transition: "color 0.25s ease",
                    letterSpacing: "0.03em",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--text-dim)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tagline / CTA block */}
          <div style={{ maxWidth: "240px" }}>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "var(--text-dim)",
                textTransform: "uppercase",
                fontWeight: "600",
                marginBottom: "1.25rem",
              }}
            >
              Begin Your Journey
            </p>
            <p
              style={{
                color: "var(--text-dim)",
                fontSize: "0.85rem",
                lineHeight: "1.8",
                fontWeight: "300",
                marginBottom: "1.5rem",
              }}
            >
              Nepal awaits. Let AI map the path, while you live the adventure.
            </p>
            <Link
              to="/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.5rem",
                borderRadius: "50px",
                border: "1px solid rgba(22,107,79,0.3)",
                color: "var(--accent)",
                textDecoration: "none",
                fontSize: "0.78rem",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: "600",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(22,107,79,0.08)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(22,107,79,0.3)";
              }}
            >
              Sign Up Free
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.78rem",
              fontWeight: "300",
              letterSpacing: "0.05em",
            }}
          >
            © 2026 YatraVerse · AI Travel Companion · Nepal
          </p>

          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.75rem",
              fontWeight: "300",
              letterSpacing: "0.05em",
            }}
          >
            Crafted with ❤ for the mountains
          </p>
        </div>
      </div>
    </footer>
  );
}