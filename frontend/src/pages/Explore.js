import React from "react";
import { useNavigate } from "react-router-dom";

import mountain from "../assets/images/Nepali_mountain.jpg";

const places = [
  {
    name: "Rara Lake",
    desc: "Nepal's hidden blue jewel of peace and silence.",
  },
  {
    name: "Ilam",
    desc: "Tea gardens, clouds, and eastern serenity.",
  },
  {
    name: "Bandipur",
    desc: "Ancient hilltop charm with timeless beauty.",
  },
  {
    name: "Khaptad",
    desc: "Mystical highland meadows and sacred calm.",
  },
  {
    name: "Upper Mustang",
    desc: "Forbidden Himalayan kingdom of raw wonder.",
  },
  {
    name: "Panch Pokhari",
    desc: "Sacred alpine lakes beyond ordinary trekking.",
  },
];

const cardClass =
  "bg-white/[0.08] backdrop-blur-xl rounded-2xl p-7 border border-white/15 " +
  "transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.15] hover:shadow-xl hover:shadow-black/40";

const buttonClass =
  "mt-10 px-8 py-4 rounded-2xl border-none bg-white/[0.18] text-white " +
  "font-['Cinzel',serif] cursor-pointer hover:bg-white/30 transition";

function Explore() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen p-6 sm:p-12 text-white bg-cover bg-top"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10">
        {/* Header */}
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-5xl md:text-6xl mb-3">
          Explore Hidden Nepal
        </h1>

        <p className="mb-10 text-base sm:text-lg opacity-90">
          Discover extraordinary destinations beyond the ordinary 🇳🇵
        </p>

        {/* Place Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.name} className={cardClass}>
              <h2 className="font-['Cinzel',serif] text-xl mb-3">
                {place.name}
              </h2>
              <p>{place.desc}</p>
            </div>
          ))}
        </div>

        {/* Return Button */}
        <button onClick={() => navigate("/home")} className={buttonClass}>
          Return Home
        </button>
      </div>
    </div>
  );
}

export default Explore;