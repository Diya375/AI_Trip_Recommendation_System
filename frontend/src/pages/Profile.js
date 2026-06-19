import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {
  return (
    <DashboardLayout>
      <div className="fade-up" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="section-title">Traveler Profile</h1>
        <p className="section-sub">Manage your preferences and identity</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          <div className="card">
            <h2 className="cinzel" style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Explorer Identity</h2>
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Royal Traveler of YatraVerse</p>
          </div>

          <div className="card">
            <h2 className="cinzel" style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Preferences</h2>
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Adventure • Peaceful Escapes • Hidden Gems</p>
          </div>

          <div className="card">
            <h2 className="cinzel" style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Saved Journeys</h2>
            <ul style={{ listStyleType: "none", padding: 0, color: "var(--text-dim)", fontSize: "0.9rem", lineHeight: 1.8 }}>
              <li>Rara Lake</li>
              <li>Upper Mustang</li>
              <li>Bandipur</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="cinzel" style={{ fontSize: "1.2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Yatra Stats</h2>
            <ul style={{ listStyleType: "none", padding: 0, color: "var(--text-dim)", fontSize: "0.9rem", lineHeight: 1.8 }}>
              <li>Journeys Planned: <span style={{ color: "var(--text)" }}>12</span></li>
              <li>Destinations Explored: <span style={{ color: "var(--text)" }}>8</span></li>
            </ul>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;