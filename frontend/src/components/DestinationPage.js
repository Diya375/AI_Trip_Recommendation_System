// src/pages/DestinationPage.js
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { places } from "../components/destinationsData";

export default function DestinationPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("todo");
  const place = places.find((p) => p.id === id);

  if (!place) {
    return <div style={{ padding: "5rem", textAlign: "center", color: "var(--text)" }}>Destination not found.</div>;
  }

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", background: "#ffffff" }}>
      
      {/* LEFT SIDE: SCROLLABLE CONTENT BLOCK */}
      <div style={{ width: "55%", height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        
        {/* Hero Banner Area */}
        <div style={{
          position: "relative",
          minHeight: "45vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.55)), url(${place.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem"
        }}>
          <Link to="/" style={{ position: "absolute", top: "1.5rem", left: "2rem", color: "#ffffff", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>
            ← Back to Home
          </Link>
          
          <h1 className="cinzel" style={{ color: "#ffffff", fontSize: "3.5rem", margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {place.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", maxWidth: "550px", fontSize: "1rem", lineHeight: "1.6", margin: 0 }}>
            {place.description}
          </p>
        </div>

        {/* Navigation Categories Tabs (Matches Wanderlog's Core Layout Row) */}
        <div style={{ padding: "2rem 3rem 0" }}>
          <div style={{ display: "flex", gap: "0.75rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1.25rem" }}>
            <button 
              onClick={() => setActiveTab("todo")}
              style={{
                backgroundColor: activeTab === "todo" ? "#FFEBE7" : "transparent",
                color: activeTab === "todo" ? "#FF5A5F" : "#4A5568",
                border: "none", padding: "0.6rem 1.2rem", borderRadius: "20px", fontWeight: "600", cursor: "pointer"
              }}>
              📍 What to do
            </button>
            <button 
              onClick={() => setActiveTab("eat")}
              style={{
                backgroundColor: activeTab === "eat" ? "#FFEBE7" : "transparent",
                color: activeTab === "eat" ? "#FF5A5F" : "#4A5568",
                border: "none", padding: "0.6rem 1.2rem", borderRadius: "20px", fontWeight: "600", cursor: "pointer"
              }}>
              🍴 Where to eat
            </button>
            <button 
              onClick={() => setActiveTab("stay")}
              style={{
                backgroundColor: activeTab === "stay" ? "#FFEBE7" : "transparent",
                color: activeTab === "stay" ? "#FF5A5F" : "#4A5568",
                border: "none", padding: "0.6rem 1.2rem", borderRadius: "20px", fontWeight: "600", cursor: "pointer"
              }}>
              🛏️ Where to stay
            </button>
          </div>
        </div>

        {/* Categories Grid List */}
        <div style={{ padding: "2.5rem 3rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#2B3E34", marginBottom: "1.25rem" }}>Categories</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {place.categories.map((cat, index) => (
              <div key={index} style={{
                padding: "1rem", background: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0", fontWeight: "500", color: "#4A5568"
              }}>
                {cat} Highlights
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: INTERACTIVE MAP HOOK AREA */}
      <div style={{ width: "45%", height: "100%", background: "#E5E7EB", position: "relative" }}>
        {/* Replace this with an interactive map component like react-simple-maps or mapbox-gl when ready */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#718096", padding: "2rem"
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
            <line x1="9" y1="3" x2="9" y2="18"/>
            <line x1="15" y1="6" x2="15" y2="21"/>
          </svg>
          <span style={{ marginTop: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>YATRAVERSE Interactive Map View</span>
          <span style={{ fontSize: "0.85rem", opacity: "0.8" }}>Tracking markers for {place.name} region</span>
        </div>
      </div>

    </div>
  );
}