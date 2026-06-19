import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const places = [
  { name: "Rara Lake",      desc: "Nepal's hidden blue jewel of peace and silence." },
  { name: "Ilam",           desc: "Tea gardens, clouds, and eastern serenity." },
  { name: "Bandipur",       desc: "Ancient hilltop charm with timeless beauty." },
  { name: "Khaptad",        desc: "Mystical highland meadows and sacred calm." },
  { name: "Upper Mustang",  desc: "Forbidden Himalayan kingdom of raw wonder." },
  { name: "Panch Pokhari",  desc: "Sacred alpine lakes beyond ordinary trekking." },
];

function Explore() {
  return (
    <DashboardLayout>
      <div className="fade-up">
        <h1 className="section-title">Explore Hidden Nepal</h1>
        <p className="section-sub">Discover extraordinary destinations beyond the ordinary</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem"
        }}>
          {places.map((place) => (
            <div key={place.name} className="card card-hover" style={{ padding: "2rem" }}>
              <h2 className="cinzel" style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
                {place.name}
              </h2>
              <p style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>{place.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Explore;