import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

function Trips() {
  return (
    <DashboardLayout>
      <div className="fade-up mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="section-title">My Trips</h1>
        <p className="section-sub">Your planned and past journeys</p>

        <div className="mx-auto mt-8 rounded-[28px] border border-slate-200 bg-white p-14 text-center shadow-sm shadow-slate-200/20 sm:p-12">
          <div className="mb-4 text-5xl">🗺️</div>
          <h2 className="cinzel text-2xl font-semibold text-slate-900">No Trips Yet</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            You haven't created any trips yet. Start planning your next adventure!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Trips;
