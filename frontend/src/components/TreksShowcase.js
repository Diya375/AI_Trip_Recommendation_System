// src/components/TreksShowcase.js
import React, { useState, useEffect } from "react";

export default function TreksShowcase() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live trekking routes from the public YatraTech endpoint
    fetch("https://api.yatratech.com/api/v1/tourism/treks/routes")
      .then((res) => res.json())
      .then((data) => {
        // Fallback to mock data if the API returns empty during development
        const trailData = data.routes || [
          { id: 1, name: "Annapurna Circuit", difficulty: "Hard", duration: "12 Days" },
          { id: 2, name: "Langtang Valley Trek", difficulty: "Medium", duration: "7 Days" }
        ];
        setRoutes(trailData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: "2rem", color: "#64748b" }}>Loading live trails...</div>;

  return (
    <div style={{ padding: "3rem", background: "#f8fafc" }}>
      <h2 style={{ fontSize: "1.8rem", color: "#1e293b", marginBottom: "1.5rem" }}>
        🏔️ Live Featured Trekking Routes
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {routes.map((route) => (
          <div key={route.id} style={{ padding: "1.5rem", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", border: "1px solid #e2e8f0" }}>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#0f172a" }}>{route.name}</h4>
            <span style={{ fontSize: "0.85rem", background: route.difficulty === "Hard" ? "#fee2e2" : "#fef08a", color: route.difficulty === "Hard" ? "#991b1b" : "#854d0e", padding: "0.25rem 0.6rem", borderRadius: "12px", fontWeight: "600" }}>
              {route.difficulty}
            </span>
            <p style={{ margin: "0.75rem 0 0 0", fontSize: "0.9rem", color: "#475569" }}>⏱️ Duration: {route.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}