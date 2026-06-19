import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
        <div>
          <h2 className="section-title">Dashboard</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>Your journey at a glance</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--bg-card)", padding: "0.5rem 1rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>
            👤
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Welcome back, Explorer</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
        {[
          { label: "Total Trips", value: "12", icon: "🗺️" },
          { label: "AI Suggestions", value: "5", icon: "✨" },
          { label: "Collaborations", value: "3", icon: "🤝" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="card card-hover fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
              <span style={{ fontSize: "1.2rem" }}>{icon}</span>
            </div>
            <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "var(--accent)" }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="card fade-up-delay">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.2rem" }}>✨</span>
          <h2 className="cinzel" style={{ fontSize: "1.25rem", color: "var(--text)" }}>AI Travel Recommendations</h2>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { emoji: "🏔️", place: "Pokhara", desc: "Best for relaxation & adventure", tag: "Nepal" },
            { emoji: "🏝️", place: "Bali", desc: "Best for beach + budget travel", tag: "Indonesia" },
            { emoji: "🏙️", place: "Tokyo", desc: "Best for tech + culture experience", tag: "Japan" },
          ].map(({ emoji, place, desc, tag }) => (
            <div
              key={place}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "border-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <span style={{ fontSize: "1.8rem" }}>{emoji}</span>
                <div>
                  <p style={{ fontWeight: 500, color: "var(--text)", marginBottom: "0.25rem" }}>{place}</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>{desc}</p>
                </div>
              </div>
              <span style={{ fontSize: "0.75rem", padding: "0.3rem 0.8rem", borderRadius: "20px", background: "var(--border)", color: "var(--text-dim)" }}>
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}