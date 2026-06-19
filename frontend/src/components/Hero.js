import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section style={{
      minHeight: "88vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "4rem 2rem",
      background: "linear-gradient(160deg, var(--bg) 0%, var(--bg-subtle) 60%, var(--bg) 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle decorative ring */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        border: "1px solid rgba(75,119,98,0.1)",
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        width: "900px",
        height: "900px",
        border: "1px solid rgba(75,119,98,0.06)",
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      <div className="fade-up" style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          color: "var(--accent)",
          marginBottom: "1.5rem",
          textTransform: "uppercase",
        }}>
          AI-Powered Travel Companion
        </p>

        <h1 className="cinzel" style={{
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "var(--text)",
          marginBottom: "1.5rem",
          letterSpacing: "0.02em",
        }}>
          Plan Smarter.<br />
          <span style={{ color: "var(--accent)" }}>Travel Deeper.</span>
        </h1>

        <p style={{
          fontSize: "1.1rem",
          color: "var(--text-dim)",
          maxWidth: "540px",
          margin: "0 auto 2.5rem",
          lineHeight: 1.7,
        }}>
          Personalized travel recommendations, collaborative planning, and curated destinations
          tailored to your budget and interests.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/signup">
            <button className="btn btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}>
              Begin Your Journey
            </button>
          </Link>
          <Link to="/login">
            <button className="btn" style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}>
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}