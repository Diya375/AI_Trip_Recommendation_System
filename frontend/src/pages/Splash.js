import React from "react";
import { useNavigate } from "react-router-dom";
// import anthem from "../assets/audio/reshamfiriri.mp3";

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
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "linear-gradient(160deg, var(--bg) 0%, var(--bg-subtle) 60%, var(--bg) 100%)",
      color: "var(--text)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative rings */}
      <div style={{ position: "absolute", width: "600px", height: "600px", border: "1px solid rgba(75,119,98,0.1)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "900px", height: "900px", border: "1px solid rgba(75,119,98,0.06)", borderRadius: "50%", pointerEvents: "none" }} />

      <div className="fade-up" style={{ position: "relative", zIndex: 1, padding: "0 2rem" }}>
        <h1 className="cinzel" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", color: "var(--accent)", letterSpacing: "0.1em", marginBottom: "1rem" }}>
          YatraVerse
        </h1>
        <p style={{ fontSize: "1.2rem", letterSpacing: "0.2em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "3rem" }}>
          Beyond Maps. Beyond Travel.
        </p>

        {/* <button onClick={beginJourney} className="btn btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>
          Enter YatraVerse
        </button> */}
      </div>
    </div>
  );
}

export default Splash;