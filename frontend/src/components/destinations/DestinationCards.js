import React from "react";
import { Link } from "react-router-dom";
import { places } from '../../data/destinationsData';

export default function DestinationCards() {
  return (
    <section className="px-8 sm:px-10 pb-20 bg-[var(--bg)]">
      <div className="mx-auto max-w-[1000px]">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="cinzel text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-[var(--text)] mb-2 tracking-[0.04em]">
            Popular Destinations
          </h2>
          <p className="text-base font-serif text-[var(--text-dim)]">
            Start exploring some of the world's most beloved locations of Nepal
          </p>
        </div>

        {/* 2-Column Responsive Grid Layout */}
        <div className="grid gap-8 sm:grid-cols-2">
          {places.map((p) => (
            <Link key={p.id} to={`/explore/${p.id}`} className="no-underline">
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.05)] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1">
                <div className="h-[280px] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="px-8 py-7">
                  <span className="mb-2 inline-block text-xs uppercase tracking-[0.15em] font-semibold text-[var(--accent,#374F43)]">
                    {p.tag}
                  </span>
                  <h3 className="cinzel text-2xl text-[var(--text)] mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-[var(--text-dim)]">
                    {p.note}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}