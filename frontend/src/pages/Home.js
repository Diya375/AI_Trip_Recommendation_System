import React from "react";
import { useNavigate } from "react-router-dom";

import mountain from "../assets/images/VALLEY.jpg";

const mainLinks = [
  { label: "Plan Journey", path: "/planner" },
  { label: "Expense Manager", path: "/expenses" },
  { label: "Explore Nepal", path: "/explore" },
  { label: "AI Assistant", path: "/assistant" },
  { label: "Profile", path: "/profile" },
];

const hiddenGems = ["Rara", "Ilam", "Bandipur", "Mustang"];

const cardBase =
  "rounded-2xl p-8 text-center text-white border cursor-pointer " +
  "transition-all duration-300 ease-out " +
  "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-cover bg-top text-white p-6 sm:p-10"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/55 to-black/90" />

      {/* Header */}
      <div className="mb-12">
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_5px_20px_rgba(0,0,0,0.9)]">
          Welcome to YatraVerse
        </h1>
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 mb-12">
        {mainLinks.map(({ label, path }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className={`${cardBase} bg-white/[0.08] backdrop-blur-xl border-white/15 hover:bg-white/[0.15]`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Hidden Gems */}
      <div>
        <h2 className="font-['Cinzel',serif] text-2xl sm:text-3xl mb-5">
          Hidden Gems of Nepal
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {hiddenGems.map((place) => (
            <div
              key={place}
              className={`${cardBase} bg-gradient-to-br from-emerald-800/25 to-stone-600/20 backdrop-blur-xl border-white/10 hover:from-emerald-800/35 hover:to-stone-600/30`}
            >
              {place}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;