// Inside src/pages/DestinationPage.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { places } from "../components/destinationsData";

export default function DestinationPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("todo");
  
  useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);
  // Find matching place by ID or lowercase name match
  const place = places?.find(
    (p) => p.id === id || p.name.toLowerCase() === id?.toLowerCase()
  );

  // Fallback UI safety guard: Never let the screen go completely blank!
  if (!place) {
    return (
      <div style={{ 
        padding: "5rem", 
        textAlign: "center", 
        background: "#f8fafc", 
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif" 
      }}>
        <h2 className="cinzel" style={{ marginBottom: "1rem" }}>Destination Info Coming Soon</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          We couldn't find a matching layout configuration for destination item: "{id}"
        </p>
        <Link to="/explore" style={{ 
          background: "#333", 
          color: "#fff", 
          padding: "0.75rem 1.5rem", 
          textDecoration: "none",
          borderRadius: "8px"
        }}>
          ← Back to Explore Grid
        </Link>
      </div>
    );
  }

  // Fallback structural definitions to prevent undefined layout crashes
  const descriptionText = place.description || `Welcome to ${place.name || "this destination"}. Explore local attractions, trip itineraries, and popular landmarks around the region.`;
  const categoriesList = place.categories || ["Attractions", "Sightseeing", "Local Culture", "Viewpoints"];

  return (
    <div style={{ 
      display: "flex", 
      width: "100vw", 
      height: "100vh", 
      overflow: "hidden",
      background: "#ffffff",
      fontFamily: "system-ui, sans-serif"
    }}>
      
      {/* LEFT PANEL: SCROLLABLE TRAVEL GUIDE */}
      <div style={{ width: "55%", height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        
        {/* Full Hero Image Banner */}
        <div style={{
          position: "relative",
          minHeight: "45vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${place.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem"
        }}>
          <Link to="/explore" style={{ 
            position: "absolute", top: "1.5rem", left: "2rem", color: "#ffffff", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", background: "rgba(0,0,0,0.35)", padding: "0.4rem 0.8rem", borderRadius: "20px"
          }}>
            ← Back
          </Link>
          
          <h1 className="cinzel" style={{ color: "#ffffff", fontSize: "3rem", margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {place.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.95)", maxWidth: "580px", fontSize: "1rem", lineHeight: "1.6", margin: 0 }}>
            {descriptionText}
          </p>
        </div>

        {/* Action Category Row */}
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

        {/* Content Section */}
        <div style={{ padding: "2.5rem 3rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#2B3E34", marginBottom: "1.25rem" }}>
            Categories
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {categoriesList.map((cat, index) => (
              <div key={index} style={{
                padding: "1.25rem", background: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0", fontWeight: "500", color: "#4A5568"
              }}>
                🌟 Explore {cat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: MAP BLOCK */}
      <div style={{ width: "45%", height: "100%", background: "#F0F4F1", position: "relative", borderLeft: "1px solid #E2E8F0" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#718096", padding: "2rem", textAlign: "center" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: "1rem" }}>
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
            <line x1="9" y1="3" x2="9" y2="18"/>
            <line x1="15" y1="6" x2="15" y2="21"/>
          </svg>
          <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>Interactive Map Interface</span>
          <span style={{ fontSize: "0.85rem", opacity: "0.8", marginTop: "0.25rem" }}>Showing curated coordinates for {place.name}</span>
        </div>
      </div>

    </div>
  );
}