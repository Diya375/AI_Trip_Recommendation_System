import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Trips() {
  return (
    <DashboardLayout>
      <div className="fade-up" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="section-title">My Trips</h1>
        <p className="section-sub">Your planned and past journeys</p>

        <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗺️</div>
          <h2 className="cinzel" style={{ fontSize: "1.25rem", color: "var(--text)", marginBottom: "0.5rem" }}>
            No Trips Yet
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
            You haven't created any trips yet. Start planning your next adventure!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Trips;