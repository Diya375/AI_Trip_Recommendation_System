export default function AISection() {
  return (
    <section style={{
      padding: "5rem 2.5rem",
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        <span style={{
          display: "inline-block",
          padding: "0.3rem 0.9rem",
          border: "1px solid rgba(201,169,110,0.3)",
          borderRadius: "20px",
          fontSize: "0.75rem",
          color: "var(--accent)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}>
          Powered by AI
        </span>

        <h2 className="cinzel" style={{
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          color: "var(--text)",
          marginBottom: "1rem",
          letterSpacing: "0.04em",
          lineHeight: 1.3,
        }}>
          Recommendations that understand you
        </h2>

        <p style={{
          color: "var(--text-dim)",
          fontSize: "1rem",
          lineHeight: 1.8,
        }}>
          Our AI analyzes your interests, budget, travel history, and group preferences
          to suggest destinations that truly match who you are — not just what's trending.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginTop: "2.5rem",
        }}>
          {["500+ Destinations", "Smart Itineraries", "Real-time Pricing"].map((stat) => (
            <div
              key={stat}
              style={{
                padding: "1rem",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-dim)",
                fontSize: "0.82rem",
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}