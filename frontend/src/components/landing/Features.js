import React from "react";
import { useNavigate } from "react-router-dom";

const featureList = [
  {
    title: "Trip Planner",
    description: "Map out personalized itineraries, set up your daily pacing, and coordinate customized routes seamlessly across Nepal.",
    path: "/planner",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Expense Manager",
    description: "Manage your travel funds efficiently. Monitor budgets, categorize expenditures, and keep track of your financial footprint.",
    path: "/expenses",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Intelligent Assistant",
    description: "Get real-time answers, smart local guidance, and automated recommendations custom-tailored to your current location.",
    path: "/assistant",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Features() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleCardClick = (path) => {
    navigate(isLoggedIn ? path : "/login");
  };

  return (
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="cinzel text-xs tracking-[0.25em] uppercase font-semibold text-[var(--accent)] mb-3">
            Platform Capabilities
          </p>
          <h2 className="cinzel text-3xl sm:text-4xl font-bold tracking-wide text-[var(--accent)]">
            Explore Your Dashboard Tools.
          </h2>
          <div className="w-12 h-px bg-[var(--accent)] opacity-30 mx-auto mt-5" />
        </div>

        {/* Cards */}
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {featureList.map((feature, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(feature.path)}
              className="group cursor-pointer rounded-2xl p-10 border border-white/10
                transition-all duration-300 hover:-translate-y-1.5
                hover:border-white/30 hover:shadow-2xl"
              style={{
                background: "linear-gradient(145deg, #374F43 0%, #2B3E34 100%)",
                boxShadow: "0 10px 30px rgba(44, 62, 53, 0.15)",
              }}
            >
              {/* Icon */}
              <div className="w-13 h-13 rounded-xl bg-white/10 border border-white/15
                flex items-center justify-center mb-7 w-[52px] h-[52px]">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="cinzel text-xl font-semibold text-white tracking-wide mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 leading-relaxed text-[0.95rem] font-light"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {feature.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-1 text-white/40 text-xs group-hover:text-white/70 transition-colors">
                <span>Explore</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}