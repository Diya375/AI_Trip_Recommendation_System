import React, { useState } from 'react';
import { Share2, Download, CheckCircle, Navigation, MapPin, Calendar, Cloud, DollarSign } from 'lucide-react';
import API from '../../services/api';

export default function FinalDestinationView({ trip, data, members, onAccept, hasAccepted }) {
  const [downloading, setDownloading] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleDownload = () => {
    setDownloading(true);
    // In a real app, this would generate a PDF. For now, simulate it.
    setTimeout(() => {
      alert("PDF downloaded successfully!");
      setDownloading(false);
    }, 1500);
  };

  if (!data) return null;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent"></div>
        <div className="p-8 md:p-10 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-widest mb-4">
            <CheckCircle size={14} /> Final Destination
          </div>
          <h1 className="cinzel text-4xl md:text-5xl font-bold text-[var(--accent)] mb-4">{data.destination}</h1>
          <p className="text-[var(--text)] text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-90">
            {data.whyChosen}
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-subtle)] p-4 rounded-2xl border border-[var(--border)]">
        <div className="flex gap-2">
          <button onClick={handleShare} className="btn bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-subtle)] text-xs font-semibold py-2 px-4 rounded-xl flex items-center gap-2">
            <Share2 size={14} /> Share
          </button>
          <button onClick={handleDownload} disabled={downloading} className="btn bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-subtle)] text-xs font-semibold py-2 px-4 rounded-xl flex items-center gap-2">
            <Download size={14} /> {downloading ? 'Downloading...' : 'Save PDF'}
          </button>
        </div>
        
        {trip.status !== 'destination_confirmed' && (
          <button 
            onClick={onAccept}
            disabled={hasAccepted}
            className={`btn py-2 px-6 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
              hasAccepted 
                ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 cursor-not-allowed' 
                : 'bg-[var(--accent)] text-white hover:opacity-90 hover:-translate-y-0.5'
            }`}
          >
            {hasAccepted ? <><CheckCircle size={14} /> Accepted</> : 'Accept Recommendation'}
          </button>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DetailCard icon={<MapPin className="text-blue-500"/>} title="Location" value={data.destination} />
        <DetailCard icon={<DollarSign className="text-emerald-500"/>} title="Est. Budget" value={`Rs. ${data.budget}`} />
        <DetailCard icon={<Cloud className="text-cyan-500"/>} title="Weather" value={data.weather} />
        <DetailCard icon={<Calendar className="text-purple-500"/>} title="Best Dates" value={data.bestDates} />
      </div>

      {/* Match Scores & Alternatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border)]">
          <h3 className="cinzel text-lg font-bold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2 flex items-center gap-2">
            <CheckCircle size={18} className="text-[var(--accent)]" /> 
            Member Match Scores
          </h3>
          <div className="flex flex-col gap-4 mt-4">
            {data.matchScores?.map((match, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-[var(--text)]">{match.memberName}</span>
                  <span className="font-bold text-[var(--accent)]">{match.score}%</span>
                </div>
                <div className="h-2 w-full bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${match.score}%` }}></div>
                </div>
                <p className="text-[10px] text-[var(--text-dim)] mt-0.5">{match.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border)]">
          <h3 className="cinzel text-lg font-bold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2 flex items-center gap-2">
            <Navigation size={18} className="text-[var(--accent)]" /> 
            Alternative Options
          </h3>
          <div className="flex flex-col gap-3 mt-4">
            {data.alternatives?.map((alt, idx) => (
              <div key={idx} className="p-3 bg-[var(--bg-subtle)] rounded-xl border border-[var(--border)]">
                <h4 className="font-bold text-sm text-[var(--text)]">{alt.name}</h4>
                <p className="text-[11px] text-[var(--text-dim)] mt-1">{alt.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proposed Itinerary */}
      <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border)]">
        <h3 className="cinzel text-xl font-bold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-3">
          Suggested Itinerary
        </h3>
        <div className="flex flex-col gap-4">
          {data.itinerary?.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm shrink-0 border border-[var(--accent)]/20">
                  {item.day}
                </div>
                {idx !== data.itinerary.length - 1 && <div className="w-px h-full bg-[var(--border)] my-1"></div>}
              </div>
              <div className="pb-4 pt-1">
                <h4 className="font-bold text-sm text-[var(--text)] mb-1">Day {item.day}</h4>
                <p className="text-xs text-[var(--text-dim)] leading-relaxed">{item.plan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon, title, value }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest font-bold">{title}</p>
        <p className="text-sm font-bold text-[var(--text)] mt-0.5">{value}</p>
      </div>
    </div>
  );
}
