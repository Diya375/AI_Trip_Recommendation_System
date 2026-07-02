import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { MapPin, Clock, Mountain, Plus, Check } from "lucide-react";

import raraImg     from "../assets/explore/rara.png";
import ilamImg     from "../assets/explore/ilam.png";
import bandipurImg from "../assets/explore/bandipur.png";
import khaptadImg  from "../assets/explore/khaptad.png";
import mustangImg  from "../assets/explore/uppermustang.png";
import panchImg    from "../assets/explore/panchpokhari.png";
import pokharaImg  from "../assets/explore/pokhara.png";
import chitwanImg  from "../assets/explore/chitwan.png";
import langtangImg from "../assets/explore/langtang.png";

const places = [
  {
    name: "Rara Lake",
    region: "Karnali",
    desc: "Nepal's hidden blue jewel — the largest lake, untouched and serene.",
    bestTime: "Oct – Nov",
    days: "7–10 days",
    cost: "Rs. 25,000–40,000",
    difficulty: "Moderate",
    type: ["Trekking", "Nature"],
    highlight: "Deepest blue lake in Nepal",
    img: raraImg,
  },
  {
    name: "Ilam",
    region: "Eastern Nepal",
    desc: "Rolling tea gardens, misty mountains, and the peaceful charm of eastern Nepal.",
    bestTime: "Mar – May, Sep – Nov",
    days: "3–5 days",
    cost: "Rs. 8,000–15,000",
    difficulty: "Easy",
    type: ["Nature", "Cultural", "Relaxing"],
    highlight: "Nepal's tea capital",
    img: ilamImg,
  },
  {
    name: "Bandipur",
    region: "Gandaki",
    desc: "A perfectly preserved hilltop town with Newari architecture and Himalayan views.",
    bestTime: "Oct – Apr",
    days: "2–3 days",
    cost: "Rs. 5,000–12,000",
    difficulty: "Easy",
    type: ["Cultural", "Relaxing"],
    highlight: "Frozen in time medieval town",
    img: bandipurImg,
  },
  {
    name: "Khaptad",
    region: "Far-Western Nepal",
    desc: "Mystical highland meadows, spiritual ashrams, and untouched wilderness.",
    bestTime: "Apr – Jun, Sep – Nov",
    days: "5–7 days",
    cost: "Rs. 20,000–35,000",
    difficulty: "Moderate",
    type: ["Trekking", "Cultural"],
    highlight: "Sacred plateau at 3,300m",
    img: khaptadImg,
  },
  {
    name: "Upper Mustang",
    region: "Gandaki",
    desc: "The forbidden kingdom — ancient caves, Tibetan culture, and surreal landscapes.",
    bestTime: "Mar – Nov",
    days: "10–14 days",
    cost: "Rs. 80,000–1,20,000",
    difficulty: "Hard",
    type: ["Adventure", "Trekking", "Cultural"],
    highlight: "Last forbidden kingdom of Nepal",
    img: mustangImg,
  },
  {
    name: "Panch Pokhari",
    region: "Sindhupalchok",
    desc: "Five sacred alpine lakes sitting above the clouds, rarely visited and breathtaking.",
    bestTime: "May – Jun, Sep – Oct",
    days: "5–7 days",
    cost: "Rs. 15,000–25,000",
    difficulty: "Hard",
    type: ["Trekking", "Adventure"],
    highlight: "Five sacred Himalayan lakes",
    img: panchImg,
  },
  {
    name: "Pokhara",
    region: "Gandaki",
    desc: "Nepal's tourism capital — lakes, mountains, paragliding, and endless café culture.",
    bestTime: "Oct – Apr",
    days: "3–5 days",
    cost: "Rs. 10,000–25,000",
    difficulty: "Easy",
    type: ["Relaxing", "Adventure", "Nature"],
    highlight: "Gateway to the Annapurnas",
    img: pokharaImg,
  },
  {
    name: "Chitwan",
    region: "Bagmati",
    desc: "Jungle safaris, one-horned rhinos, tigers, and elephant experiences in the Terai.",
    bestTime: "Oct – Mar",
    days: "3–4 days",
    cost: "Rs. 12,000–30,000",
    difficulty: "Easy",
    type: ["Wildlife", "Nature"],
    highlight: "UNESCO World Heritage jungle",
    img: chitwanImg,
  },
  {
    name: "Langtang Valley",
    region: "Bagmati",
    desc: "The valley of glaciers — high alpine meadows, yak pastures, and Tamang culture.",
    bestTime: "Mar – May, Oct – Nov",
    days: "7–10 days",
    cost: "Rs. 20,000–35,000",
    difficulty: "Moderate",
    type: ["Trekking", "Adventure"],
    highlight: "Closest trekking from Kathmandu",
    img: langtangImg,
  },
];

const ALL_TYPES = ["All", "Trekking", "Adventure", "Nature", "Cultural", "Relaxing", "Wildlife"];
 
 

export default function Explore() {
  const [selectedType, setSelectedType] = useState("All");
   
  const [trips, setTrips] = useState([]);
  const [addedPlaces, setAddedPlaces] = useState({});
  const [addingTo, setAddingTo] = useState(null);
  const [showTripPicker, setShowTripPicker] = useState(null);

  useEffect(() => {
    API.get("/trips/my").then((res) => setTrips(res.data)).catch(() => {});
  }, []);

 const filtered = places.filter((p) =>
  selectedType === "All" || p.type.includes(selectedType)
);

  const handleAddToTrip = async (tripId, place) => {
    setAddingTo(`${tripId}-${place.name}`);
    try {
      await API.post(`/trips/${tripId}/places`, {
        name: place.name,
        address: `${place.region}, Nepal`,
        lat: null, lng: null, place_id: null,
      });
      setAddedPlaces((prev) => ({ ...prev, [`${tripId}-${place.name}`]: true }));
      setShowTripPicker(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add place");
    } finally {
      setAddingTo(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="fade-up">

        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Explore Hidden Nepal</h1>
          <p className="section-sub">Discover extraordinary destinations beyond the ordinary</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--text-dim)] uppercase tracking-widest mr-1">Type</span>
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm border transition-all cursor-pointer
                  ${selectedType === type
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text-dim)] bg-transparent hover:border-[var(--accent)]"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Cards — 2 per row */}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
          gap: "2rem",
          }}>
          {filtered.map((place) => (
            <div key={place.name} className="card card-hover overflow-hidden flex flex-col" style={{ padding: 0 }}>

              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />


                {/* Name overlay on photo bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="cinzel text-2xl font-bold text-white leading-tight">{place.name}</h2>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-white/70" />
                    <span className="text-xs text-white/70">{place.region}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-4 flex-1">

                {/* Highlight */}
                <div className="inline-flex items-center gap-1.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs px-3 py-1.5 rounded-full w-fit font-medium">
                  ✨ {place.highlight}
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{place.desc}</p>

                {/* Two key facts */}
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 flex-1">
                    <Clock size={13} className="text-[var(--accent)] shrink-0" />
                    <div>
                      <p className="text-[0.6rem] text-[var(--text-dim)] uppercase tracking-wider">Best Time</p>
                      <p className="text-xs text-[var(--text)] font-medium">{place.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 flex-1">
                    <Mountain size={13} className="text-[var(--accent)] shrink-0" />
                    <div>
                      <p className="text-[0.6rem] text-[var(--text-dim)] uppercase tracking-wider">Duration</p>
                      <p className="text-xs text-[var(--text)] font-medium">{place.days}</p>
                    </div>
                  </div>
                </div>

                {/* Type tags */}
                <div className="flex flex-wrap gap-1.5">
                  {place.type.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-dim)]">
                      {t}
                    </span>
                  ))}
                </div>

              {/* Add to trip Section Container */}
<div className="mt-auto pt-4">
  {showTripPicker === place.name ? (
    // 1. THIS LAYOUT SHOWS ONLY WHEN PICKER IS ACTIVE
    <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-white shadow-sm">
      <p className="text-xs text-[var(--text-dim)] px-3 py-2 border-b border-[var(--border)] bg-[var(--bg)] font-medium">
        Add to which trip?
      </p>
      {trips.length === 0 ? (
        <p className="text-xs text-[var(--text-dim)] px-3 py-3">No trips yet.</p>
      ) : (
        trips.map((trip) => {
          const key = `${trip.id}-${place.name}`;
          const done = addedPlaces[key];
          return (
            <button
              key={trip.id}
              onClick={() => !done && handleAddToTrip(trip.id, place)}
              disabled={addingTo === key || done}
              className="w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-[var(--bg)] transition-colors border-b border-[var(--border)] last:border-0 text-[var(--text)] disabled:opacity-60 cursor-pointer bg-transparent"
            >
              <span>{trip.name}</span>
              {done ? (
                <Check size={14} className="text-green-500" />
              ) : addingTo === key ? (
                <span className="text-xs text-[var(--text-dim)]">Adding...</span>
              ) : (
                <Plus size={14} className="text-[var(--text-dim)]" />
              )}
            </button>
          );
        })
      )}
      <button
        onClick={() => setShowTripPicker(null)}
        className="w-full text-xs text-red-500 py-2 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent border-none font-medium"
      >
        Cancel
      </button>
    </div>
  ) : (
    // 2. THE GREEN BUTTON ONLY RENDERS WHEN THE PICKER IS NOT ACTIVE
    <button
      onClick={() => setShowTripPicker(place.name)}
      className="w-full bg-[#4d7c68] hover:bg-[#3d6353] text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border-none cursor-pointer"
    >
      <Plus size={16} />
      Add to Trip
    </button>
  )}
</div>
   </div>
            </div>
          ))}
        </div>


      </div>
    </DashboardLayout>
  );
}