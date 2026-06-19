import React from "react";
import { useNavigate } from "react-router-dom";

import anthem from "../assets/audio/reshamfiriri.mp3";
import mountain from "../assets/images/Nepal-mountain.jpg";

function Splash() {
  const navigate = useNavigate();

  const beginJourney = () => {
    const audio = new Audio(anthem);

    audio.volume = 0.75;

    audio.play().catch((err) => {
      console.log(err);
    });

    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  return (
    <div
      className="h-screen relative flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative text-white text-center px-6">
        <h1 className="font-['Cinzel',serif] text-5xl sm:text-7xl font-bold tracking-[4px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
          YatraVerse
        </h1>

        <p className="font-['Cinzel',serif] text-base sm:text-xl tracking-[3px] opacity-90 mt-3">
          Beyond Maps. Beyond Travel.
        </p>

        <button
          onClick={beginJourney}
          className="mt-8 px-10 py-5 rounded-2xl border border-white/35 bg-white/[0.12] backdrop-blur-md text-white font-['Cinzel',serif] text-lg cursor-pointer transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
        >
          Enter YatraVerse
        </button>
      </div>
    </div>
  );
}

export default Splash;