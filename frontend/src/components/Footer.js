export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      padding: "2rem 2.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "0.5rem",
    }}>
      <span className="cinzel" style={{ color: "var(--accent)", fontSize: "0.95rem" }}>
        YatraVerse
      </span>
      <p style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
        © 2026 YatraVerse · AI Travel Companion
      </p>
    </footer>
  );
}