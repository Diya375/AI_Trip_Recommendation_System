import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

function Results() {
  const location = useLocation();
  const trip = location.state || {};

  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);

  const addActivity = () => {
    if (!activity.trim()) return;
    setActivities([...activities, activity.trim()]);
    setActivity("");
  };

  return (
    <DashboardLayout>
      <div className="fade-up mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3 text-center">
          <h1 className="section-title">Trip Dashboard</h1>
          <p className="section-sub">Manage activities for your upcoming journey</p>
        </div>

        <div className="mb-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30">
          <h2 className="cinzel mb-5 text-2xl font-semibold text-[var(--accent)]">{trip.tripName || "Unnamed Trip"}</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Destination:</span> {trip.destination || "Not specified"}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Members:</span> {trip.members || 0}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Start Date:</span> {trip.startDate || "-"}
            </p>
            <p>
              <span className="font-semibold text-slate-900">End Date:</span> {trip.endDate || "-"}
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30">
          <h2 className="cinzel mb-6 text-xl font-semibold text-slate-900">Trip Activities</h2>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="E.g., Visit Swayambhunath"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <button
              onClick={addActivity}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#FF4C4F] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            >
              Add
            </button>
          </div>

          {activities.length === 0 ? (
            <p className="text-sm leading-7 text-slate-500">No activities added yet.</p>
          ) : (
            <ul className="space-y-3 pl-5 text-sm leading-7 text-slate-600">
              {activities.map((item, index) => (
                <li key={index} className="list-disc">
                  <span className="text-slate-900">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Results;
