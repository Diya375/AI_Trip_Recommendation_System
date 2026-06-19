import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import mountain from "../assets/images/area.jpg";

const cardClass =
  "bg-white/[0.08] backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/15";

const headingClass = "font-['Cinzel',serif] text-2xl mb-4";

const buttonClass =
  "px-7 py-4 rounded-2xl border-none bg-white/[0.18] text-white " +
  "font-['Cinzel',serif] cursor-pointer hover:bg-white/30 transition";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const trip = location.state || {};

  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);

  const addActivity = () => {
    if (!activity.trim()) return;

    setActivities([...activities, activity]);
    setActivity("");
  };

  return (
    <div
      className="relative min-h-screen p-6 sm:p-12 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${mountain})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-5xl mb-6">
          Trip Dashboard
        </h1>

        {/* Trip Details */}
        <div className={cardClass}>
          <h2 className={headingClass}>{trip.tripName}</h2>

          <p>
            <strong>Destination:</strong> {trip.destination}
          </p>

          <p>
            <strong>Start Date:</strong> {trip.startDate}
          </p>

          <p>
            <strong>End Date:</strong> {trip.endDate}
          </p>

          <p>
            <strong>Members:</strong> {trip.members}
          </p>
        </div>

        {/* Activities */}
        <div className={cardClass}>
          <h2 className={headingClass}>Trip Activities</h2>

          <div className="flex gap-3 mb-5">
            <input
              type="text"
              placeholder="Add Activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="flex-1 p-4 rounded-xl border-none text-black outline-none"
            />

            <button onClick={addActivity} className={buttonClass}>
              Add
            </button>
          </div>

          {activities.length === 0 ? (
            <p>No activities added yet.</p>
          ) : (
            <ul className="list-disc list-inside space-y-2">
              {activities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Actions */}
        {/* <div className={cardClass}>
          <h2 className={headingClass}>Next Features</h2>

          <p>💰 Expense Tracking</p>
          <p>🗳 Group Polls</p>
          <p>✅ Task Manager</p>
          <p>🤖 AI Itinerary Generator</p>
        </div> */}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className={buttonClass} onClick={() => navigate("/planner")}>
            Create Another Trip
          </button>

          <button className={buttonClass} onClick={() => navigate("/home")}>
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;