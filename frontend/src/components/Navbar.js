import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      background: "var(--bg-card)",
      borderBottom: "1px solid var(--border)",
      padding: "0 2.5rem",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <h1 className="cinzel" style={{ color: "var(--accent)", fontSize: "1.25rem", letterSpacing: "0.08em" }}>
        YatraVerse
      </h1>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link to="/login">
          <button className="btn" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}