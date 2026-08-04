// AISection.js
import React from "react";

const dnaFeatures = [
  {
    id: "planner",
    title: "Optimize your route",
    desc: "Built directly into your Plan Journey module. Rearrange multi-destination loops across Nepal mathematically to reduce travel fatigue and save road transit time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    id: "expenses",
    title: "Expense tracking",
    desc: "Track and split costs fairly inside the Expense Manager ledger. Log shared expenditures down to the local rupee with zero hidden service commissions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: "explore",
    title: "Explore Nepal",
    desc: "Uncover hidden regional destinations, calculated trail maps, and curated points of interest customized to your trip's primary scale dynamics.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  },
  {
    id: "assistant",
    title: "AI Assistant",
    desc: "Your dedicated personal conversational guide. Actively addresses real-time queries and surfaces personalized contextual recommendations on the fly.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    id: "collaboration",
    title: "Group collaboration",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    desc: "Plan harmoniously alongside multiple travel companions. Sync map markers, daily parameters, and expense items instantly with zero data fragmentation."
  },
  {
    id: "offline",
    title: "Offline caching",
    desc: "No signal, no worries. All synchronized itineraries, map blocks, and contact records are securely held locally for smooth tracking in remote regions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B3E34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* 🛠️ Brand new pixel-perfect offline save icon */}
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <path d="M12 11v6M9 14l3 3 3-3" />
      </svg>
    )
  }
];
export default function AISection() {
  return (
    <section id="assistant" className="scroll-mt-24 w-full bg-white text-[#2B3E34] relative px-6 pb-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1100px]">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <p className="font-serif text-xs uppercase tracking-[0.25em] font-semibold text-[#374F43] mb-3">
            Core Platform DNA
          </p>
          <h2 className="cinzel text-[clamp(1.8rem,4vw,2.5rem)] font-bold tracking-[-0.01em] text-[#2B3E34] leading-[1.3]">
            Maximize your trip planning with YATRAVERSE
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-base font-serif text-[#5c6660] font-normal">
            Experience the full potential of comprehensive system tools engineered to establish an intuitive and streamlined journey structure.
          </p>
        </div>

        {/* Clean Wanderlog Pro Style Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dnaFeatures.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-[16px] border border-[rgba(241,245,249,0.6)] bg-[#F8FAFC] p-10 select-none"
            >
              {/* Minimal Vector Icon Block */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent mb-1">
                {item.icon}
              </div>

              {/* Feature Title */}
              <h3 className="font-sans text-[1.2rem] font-bold text-[#2B3E34] tracking-[-0.01em] m-0">
                {item.title}
              </h3>

              {/* Feature Description */}
              <p className="font-sans text-sm leading-7 text-[#5c6660] font-normal m-0">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}