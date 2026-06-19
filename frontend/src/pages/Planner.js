import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function Planner() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    members: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const createTrip = () => {
    if (!trip.tripName || !trip.destination || !trip.startDate || !trip.endDate || !trip.members) {
      alert("Please fill all fields.");
      return;
    }
    navigate("/results", { state: trip });
  };

  return (
    <DashboardLayout>
      <div className="fade-up" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="section-title text-center">Create New Trip</h1>
        <p className="section-sub text-center">Outline your journey details</p>

        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "2.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>Trip Name</label>
            <input type="text" name="tripName" placeholder="E.g., Summer in Pokhara" value={trip.tripName} onChange={handleChange} className="input" />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>Destination</label>
            <input type="text" name="destination" placeholder="Where are you going?" value={trip.destination} onChange={handleChange} className="input" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>Start Date</label>
              <input type="date" name="startDate" value={trip.startDate} onChange={handleChange} className="input" />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>End Date</label>
              <input type="date" name="endDate" value={trip.endDate} onChange={handleChange} className="input" />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>Number of Members</label>
            <input type="number" name="members" placeholder="How many people?" value={trip.members} onChange={handleChange} className="input" />
          </div>

          <button onClick={createTrip} className="btn btn-primary" style={{ marginTop: "1rem", padding: "1rem", fontSize: "1rem" }}>
            Create Trip
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Planner;