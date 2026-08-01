import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Plan a Trip", to: "/planner" },
  { label: "Login", to: "/login" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-card)] border-t border-[var(--border)] relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] h-px bg-[linear-gradient(90deg,transparent,rgba(22,107,79,0.3),transparent)]" />

      <div className="mx-auto max-w-[1150px] px-8 py-16 sm:px-10">
        {/* Main row */}
        <div className="flex flex-wrap items-start justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-[300px]">
            <span className="cinzel block text-[1.4rem] font-bold uppercase tracking-[0.15em] text-[var(--accent)] mb-4">
              YATRAVERSE
            </span>
            <p className="text-[var(--text-dim)] text-[0.88rem] leading-[1.8] font-light">
              Your AI-powered companion for exploring Nepal's peaks, valleys, and
              ancient heritage — one curated journey at a time.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--text-dim)] font-semibold mb-5">
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[var(--text-dim)] no-underline text-[0.88rem] font-light tracking-[0.03em] transition-colors duration-200 hover:text-[var(--accent)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tagline / CTA block */}
          <div className="max-w-[240px]">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--text-dim)] font-semibold mb-5">
              Begin Your Journey
            </p>
            <p className="text-[var(--text-dim)] text-[0.85rem] leading-[1.8] font-light mb-6">
              Nepal awaits. Let AI map the path, while you live the adventure.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(22,107,79,0.3)] bg-transparent px-6 py-3 text-[var(--accent)] no-underline text-[0.78rem] uppercase tracking-[0.12em] font-semibold font-serif transition duration-200 hover:bg-[rgba(22,107,79,0.08)] hover:border-[var(--accent)]"
            >
              Sign Up Free
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[var(--text-dim)] text-[0.78rem] font-light tracking-[0.05em]">
            © 2026 YatraVerse · AI Travel Companion · Nepal
          </p>

          <p className="text-[var(--text-dim)] text-[0.75rem] font-light tracking-[0.05em]">
            Crafted with ❤ for the mountains
          </p>
        </div>
      </div>
    </footer>
  );
}