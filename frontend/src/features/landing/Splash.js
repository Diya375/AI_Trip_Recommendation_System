import React from "react";
import { useNavigate } from "react-router-dom";
// import anthem from "../../assets/audio/reshamfiriri.mp3";

function Splash() {
  const navigate = useNavigate();

  // const beginJourney = () => {
  //   const audio = new Audio(anthem);
  //   audio.volume = 0.75;
  //   audio.play().catch((err) => console.log(err));
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 2500);
  // };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--bg)] via-[var(--bg-subtle)] to-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute h-[600px] w-[600px] rounded-full border border-[rgba(75,119,98,0.12)]" />
      <div className="pointer-events-none absolute h-[900px] w-[900px] rounded-full border border-[rgba(75,119,98,0.06)]" />

      <div className="fade-up relative z-10 px-6 text-center sm:px-10">
        <h1 className="cinzel text-[clamp(3.5rem,8vw,6rem)] font-black tracking-[0.1em] text-[var(--accent)]">
          YatraVerse
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base uppercase tracking-[0.2em] text-[var(--text-dim)] sm:text-lg">
          Beyond Maps. Beyond Travel.
        </p>

        {false && (
          <button
            onClick={() => {}}
            className="mt-12 inline-flex rounded-full bg-[var(--accent)] px-10 py-4 text-sm font-semibold text-white transition hover:bg-[#FF4C4F] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          >
            Enter YatraVerse
          </button>
        )}
      </div>
    </div>
  );
}

export default Splash;
