import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function Results() {
  const location = useLocation();
  const trip = location.state || {};

  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);

  const addActivity = () => {
    if (!activity.trim()) return;
    setActivities([...activities, activity]);
    setActivity("");
  };

  return (
    <DashboardLayout>
      <div className="fade-up" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="section-title">Trip Dashboard</h1>
        <p className="section-sub">Manage activities for your upcoming journey</p>

        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2 className="cinzel" style={{ fontSize: "1.5rem", color: "var(--accent)", marginBottom: "1rem" }}>
            {trip.tripName || "Unnamed Trip"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", color: "var(--text-dim)", fontSize: "0.95rem" }}>
            <p><strong style={{ color: "var(--text)" }}>Destination:</strong> {trip.destination || "Not specified"}</p>
            <p><strong style={{ color: "var(--text)" }}>Members:</strong> {trip.members || 0}</p>
            <p><strong style={{ color: "var(--text)" }}>Start Date:</strong> {trip.startDate || "-"}</p>
            <p><strong style={{ color: "var(--text)" }}>End Date:</strong> {trip.endDate || "-"}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="cinzel" style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Trip Activities</h2>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <input
              type="text"
              placeholder="E.g., Visit Swayambhunath"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="input"
            />
            <button onClick={addActivity} className="btn btn-primary" style={{ padding: "0 1.5rem" }}>
              Add
            </button>
          </div>

          {activities.length === 0 ? (
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>No activities added yet.</p>
          ) : (
            <ul style={{ paddingLeft: "1.2rem", color: "var(--text-dim)", lineHeight: 1.8 }}>
              {activities.map((item, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "var(--text)" }}>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Results;