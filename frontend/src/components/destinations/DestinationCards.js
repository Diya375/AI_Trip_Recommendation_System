import React from "react";
import { Link } from "react-router-dom";
import { places } from '../../data/destinationsData';

export default function DestinationCards() {
  return (
    <section style={{ 
      padding: "2rem 2.5rem 5rem",
      background: "var(--bg)" 
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="cinzel" style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: "700",
            color: "var(--text)",
            marginBottom: "0.6rem",
            letterSpacing: "0.04em",
          }}>
            Popular Destinations
          </h2>
          <p style={{ color: "var(--text-dim)", fontFamily: "'Playfair Display', 'Georgia', serif", fontSize: "1rem" }}>
            Start exploring some of the world's most beloved locations of Nepal
          </p>
        </div>

        {/* 2-Column Responsive Grid Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "2rem",
        }}>
          {places.map((p) => (
            <Link to={`/explore/${p.id}`} key={p.id} style={{ textDecoration: "none" }}>
              <div className="card card-hover" style={{ 
                padding: "0",          
                overflow: "hidden",     
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "#ffffff",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)"
              }}>
                {/* Bigger Image Box */}
                <div style={{ width: "100%", height: "280px", overflow: "hidden" }}>
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transition: "transform 0.5s ease" 
                    }} 
                  />
                </div>

                {/* Content Box */}
                <div style={{ padding: "1.75rem 2rem 2rem" }}>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "var(--accent, #374F43)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "0.6rem",
                    fontWeight: "600"
                  }}>
                    {p.tag}
                  </div>
                  <h3 className="cinzel" style={{
                    fontSize: "1.5rem",
                    color: "var(--text)",
                    marginBottom: "0.5rem",
                  }}>
                    {p.name}
                  </h3>
                  <p style={{ 
                    color: "var(--text-dim)", 
                    fontSize: "0.95rem",
                    margin: 0 
                  }}>
                    {p.note}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}