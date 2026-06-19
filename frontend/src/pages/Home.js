import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const mainLinks = [
  { label: "Plan Journey", path: "/planner" },
  { label: "Expense Manager", path: "/expenses" },
  { label: "Explore Nepal", path: "/explore" },
  { label: "AI Assistant", path: "/assistant" },
  { label: "Profile", path: "/profile" },
];

const hiddenGems = ["Rara", "Ilam", "Bandipur", "Mustang"];

function Home() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="fade-up">
        <h1 className="section-title">Welcome to YatraVerse</h1>
        <p className="section-sub">Where will your next journey take you?</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3.5rem"
        }}>
          {mainLinks.map(({ label, path }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="card card-hover"
              style={{ cursor: "pointer", textAlign: "center", padding: "2rem 1.5rem" }}
            >
              <h3 className="cinzel" style={{ fontSize: "1.1rem", color: "var(--accent)" }}>{label}</h3>
            </div>
          ))}
        </div>

        <h2 className="cinzel" style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
          Hidden Gems of Nepal
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem"
        }}>
          {hiddenGems.map((place) => (
            <div
              key={place}
              className="card card-hover"
              style={{
                textAlign: "center",
                padding: "2rem 1.5rem",
                background: "linear-gradient(135deg, var(--bg-card), var(--bg-subtle))",
                cursor: "default"
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 500 }}>{place}</h3>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;