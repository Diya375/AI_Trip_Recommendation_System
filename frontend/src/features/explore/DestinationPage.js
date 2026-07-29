import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { places } from "../../data/destinationsData";

import MapComponent from "../../components/destinations/MapComponent";

export default function DestinationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("todo");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const place = places?.find((p) => p.id === id || p.name.toLowerCase() === id?.toLowerCase());

  if (!place) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-20 text-center">
        <h2 className="cinzel mb-4 text-3xl font-bold text-slate-900">Destination Info Coming Soon</h2>
        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          ? Back to Landing Page
        </button>
      </div>
    );
  }

  const descriptionText = place.description || `Explore local attractions, trip itineraries, and popular landmarks around the region.`;
  const activeCategories = place[activeTab] || [];

  const getTabIcon = () => {
    if (activeTab === "eat") return "🍲 Try ";
    if (activeTab === "stay") return "🏨 Book ";
    return "🌟 Explore ";
  };

  const titleSizeClass = place.name.length > 20 ? "text-3xl" : place.name.length > 15 ? "text-4xl" : place.name.length > 10 ? "text-5xl" : "text-6xl";
  const tabButtonClasses = (tab) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
      activeTab === tab ? "bg-[var(--accent)] text-white" : "bg-transparent text-[var(--text-dim)] hover:bg-slate-100"
    }`;

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden bg-[var(--bg)] font-sans">
      <div className="w-full lg:w-[55%] h-full overflow-y-auto flex flex-col">
        <div
          className="relative min-h-[52vh] flex flex-col items-center justify-center text-center bg-cover bg-center px-8 py-16"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${place.image})`,
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-black/60"
          >
            ← Back
          </button>

          <div className="absolute right-4 top-4 flex items-center gap-3">
            {token ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-sm font-semibold text-white transition hover:text-slate-200"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--text-dark)] transition hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-semibold text-white transition hover:text-slate-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--text-dark)] transition hover:bg-slate-100"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <h1 className={`cinzel ${titleSizeClass} max-w-3xl font-bold uppercase tracking-[0.1em] text-white`}>
            {place.name}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/95">
            {descriptionText}
          </p>
        </div>

        <div className="bg-[var(--bg-card)] px-6 py-6">
          <div className="flex flex-wrap gap-3 border-b border-[var(--border)] pb-5">
            <button onClick={() => setActiveTab("todo")} className={tabButtonClasses("todo")}>
              ?? What to do
            </button>
            <button onClick={() => setActiveTab("eat")} className={tabButtonClasses("eat")}>
              ?? What to eat
            </button>
            <button onClick={() => setActiveTab("stay")} className={tabButtonClasses("stay")}>
              🛏️ Where to stay
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[var(--bg-card)] px-6 py-8">
          <h3 className="mb-5 text-2xl font-bold text-[var(--text)]">
            {activeTab === "todo" && "What to do"}
            {activeTab === "eat" && "Where to eat"}
            {activeTab === "stay" && "Where to stay"}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {activeCategories.map((cat, index) => (
              <div
                key={index}
                className="rounded-[18px] border border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-4 text-sm font-medium text-[var(--text)]"
              >
                {getTabIcon()}
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[45%] h-full">
        <MapComponent selectedDestination={place.name} />
      </div>
    </div>
  );
}
