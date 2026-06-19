import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import mountain from "../assets/images/top.jpg";

const inputClass =
  "w-full p-4 mb-4 rounded-2xl border-none text-base text-black outline-none";

const buttonClass =
  "w-full p-4 rounded-2xl border-none bg-white/[0.18] text-white " +
  "font-['Cinzel',serif] text-lg cursor-pointer hover:bg-white/30 transition";

function Planner() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    members: "",
  });

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const createTrip = () => {
    if (
      !trip.tripName ||
      !trip.destination ||
      !trip.startDate ||
      !trip.endDate ||
      !trip.members
    ) {
      alert("Please fill all fields.");
      return;
    }

    navigate("/results", {
      state: trip,
    });
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center text-white bg-cover bg-top p-4"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Card */}
      <div className="relative w-full max-w-lg p-8 sm:p-11 rounded-3xl bg-white/[0.08] backdrop-blur-xl border border-white/15 text-center">
        <h1 className="font-['Cinzel',serif] text-3xl sm:text-4xl mb-6">
          Create New Trip
        </h1>

        <input
          type="text"
          name="tripName"
          placeholder="Trip Name"
          value={trip.tripName}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="number"
          name="members"
          placeholder="Number of Members"
          value={trip.members}
          onChange={handleChange}
          className={inputClass}
        />

        <button onClick={createTrip} className={buttonClass}>
          Create Trip
        </button>
      </div>
    </div>
  );
}

export default Planner;