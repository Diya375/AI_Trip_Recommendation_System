import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import mountain from "../assets/images/mount.jpg";

const cardClass =
  "bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 mb-5 border border-white/15";

const titleClass = "font-['Cinzel',serif] text-xl mb-3";

const buttonClass =
  "px-7 py-4 rounded-2xl border-none bg-white/[0.18] text-white " +
  "font-['Cinzel',serif] cursor-pointer hover:bg-white/30 transition";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen p-6 sm:p-10 text-white bg-cover bg-top"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-5xl mb-8 text-center">
          Traveler Profile
        </h1>

        {/* Profile Card */}
        <div className={cardClass}>
          <h2 className={titleClass}>Explorer</h2>
          <p>Royal Traveler of YatraVerse 🇳🇵</p>
        </div>

        {/* Preferences */}
        <div className={cardClass}>
          <h2 className={titleClass}>Travel Preferences</h2>
          <p>Adventure • Peaceful Escapes • Hidden Gems</p>
        </div>

        {/* Saved Destinations */}
        <div className={cardClass}>
          <h2 className={titleClass}>Saved Journeys</h2>
          <p>Rara Lake</p>
          <p>Upper Mustang</p>
          <p>Bandipur</p>
        </div>

        {/* Stats */}
        <div className={cardClass}>
          <h2 className={titleClass}>Yatra Stats</h2>
          <p>Journeys Planned: 12</p>
          <p>Destinations Explored: 8</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className={buttonClass} onClick={() => navigate("/home")}>
            Return Home
          </button>

          <button className={buttonClass} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;