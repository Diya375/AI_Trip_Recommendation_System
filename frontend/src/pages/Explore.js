import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { MapPin, Clock, DollarSign, Mountain, Plus, Check, Filter } from "lucide-react";

const places = [
  {
    name: "Rara Lake",
    region: "Karnali",
    desc: "Nepal's hidden blue jewel — the largest lake in Nepal, untouched and serene.",
    bestTime: "Oct – Nov",
    days: "7–10 days",
    cost: "Rs. 25,000–40,000",
    difficulty: "Moderate",
    type: ["Trekking", "Nature"],
    emoji: "🏔️",
    highlight: "Deepest blue lake in Nepal",
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
    emoji: "🍵",
    highlight: "Nepal's tea capital",
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
    emoji: "🏘️",
    highlight: "Frozen in time medieval town",
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
    emoji: "🌿",
    highlight: "Sacred plateau at 3,300m",
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
    emoji: "🏜️",
    highlight: "Last forbidden kingdom of Nepal",
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
    emoji: "💧",
    highlight: "Five sacred Himalayan lakes",
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
    emoji: "⛵",
    highlight: "Gateway to the Annapurnas",
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
    emoji: "🦏",
    highlight: "UNESCO World Heritage jungle",
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
    emoji: "🗻",
    highlight: "Closest trekking from Kathmandu",
  },
];

const ALL_TYPES = ["All", "Trekking", "Adventure", "Nature", "Cultural", "Relaxing", "Wildlife"];
const DIFFICULTIES = ["All", "Easy", "Moderate", "Hard"];

const difficultyColor = {
  Easy: "text-green-500 bg-green-500/10",
  Moderate: "text-yellow-500 bg-yellow-500/10",
  Hard: "text-red-400 bg-red-400/10",
};

export default function Explore() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [trips, setTrips] = useState([]);
  const [addedPlaces, setAddedPlaces] = useState({});
  const [addingTo, setAddingTo] = useState(null);
  const [showTripPicker, setShowTripPicker] = useState(null);

  useEffect(() => {
    API.get("/trips/my").then((res) => setTrips(res.data)).catch(() => {});
  }, []);

  const filtered = places.filter((p) => {
    const typeMatch = selectedType === "All" || p.type.includes(selectedType);
    const diffMatch = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    return typeMatch && diffMatch;
  });

  const handleAddToTrip = async (tripId, place) => {
    setAddingTo(`${tripId}-${place.name}`);
    try {
      await API.post(`/trips/${tripId}/places`, {
        name: place.name,
        address: `${place.region}, Nepal`,
        lat: null,
        lng: null,
        place_id: null,
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
        <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[var(--text-dim)]" />
            <span className="text-xs text-[var(--text-dim)] uppercase tracking-widest">Type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 cursor-pointer
                  ${selectedType === type
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text-dim)] bg-transparent hover:border-[var(--accent)]"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="w-px bg-[var(--border)] hidden sm:block" />

          <div className="flex items-center gap-2">
            <Mountain size={14} className="text-[var(--text-dim)]" />
            <span className="text-xs text-[var(--text-dim)] uppercase tracking-widest">Difficulty</span>
          </div>
          <div className="flex gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 cursor-pointer
                  ${selectedDifficulty === d
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text-dim)] bg-transparent hover:border-[var(--accent)]"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-[var(--text-dim)] mb-4">
          Showing {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Cards grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {filtered.map((place) => (
            <div
              key={place.name}
              className="card card-hover flex flex-col"
              style={{ padding: 0, overflow: "hidden" }}
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between px-5 pt-5 pb-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{place.emoji}</span>
                  <div>
                    <h2 className="cinzel text-lg text-[var(--accent)] leading-tight">
                      {place.name}
                    </h2>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-[var(--text-dim)]" />
                      <span className="text-xs text-[var(--text-dim)]">{place.region}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[place.difficulty]}`}>
                  {place.difficulty}
                </span>
              </div>

              {/* Body */}
              <div className="px-5 py-4 flex flex-col gap-3 flex-1">
                {/* Highlight badge */}
                <div className="inline-flex items-center gap-1.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs px-3 py-1 rounded-full w-fit font-medium">
                  ✨ {place.highlight}
                </div>

                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{place.desc}</p>

                {/* Info grid */}
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[
                    { icon: <Clock size={12} />, label: "Best Time", value: place.bestTime },
                    { icon: <Mountain size={12} />, label: "Duration", value: place.days },
                    { icon: <DollarSign size={12} />, label: "Budget", value: place.cost },
                  ].map((info, i) => (
                    <div key={i} className="bg-[var(--bg)] rounded-lg p-2 text-center border border-[var(--border)]">
                      <div className="flex items-center justify-center gap-1 text-[var(--text-dim)] mb-1">
                        {info.icon}
                        <span className="text-[0.6rem] uppercase tracking-wider">{info.label}</span>
                      </div>
                      <p className="text-xs text-[var(--text)] font-medium leading-tight">{info.value}</p>
                    </div>
                  ))}
                </div>

                {/* Type tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {place.type.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-dim)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to trip button */}
              <div className="px-5 pb-5">
                {showTripPicker === place.name ? (
                  <div className="border border-[var(--border)] rounded-xl overflow-hidden">
                    <p className="text-xs text-[var(--text-dim)] px-3 py-2 border-b border-[var(--border)]">
                      Add to which trip?
                    </p>
                    {trips.length === 0 ? (
                      <p className="text-xs text-[var(--text-dim)] px-3 py-2">No trips yet.</p>
                    ) : (
                      trips.map((trip) => {
                        const key = `${trip.id}-${place.name}`;
                        const done = addedPlaces[key];
                        return (
                          <button
                            key={trip.id}
                            onClick={() => !done && handleAddToTrip(trip.id, place)}
                            disabled={addingTo === key || done}
                            className="w-full text-left px-3 py-2 text-sm flex items-center justify-between
                              hover:bg-[var(--bg)] transition-colors border-b border-[var(--border)] last:border-0
                              text-[var(--text)] disabled:opacity-60 cursor-pointer"
                          >
                            <span>{trip.name}</span>
                            {done
                              ? <Check size={14} className="text-green-500" />
                              : addingTo === key
                                ? <span className="text-xs text-[var(--text-dim)]">Adding...</span>
                                : <Plus size={14} className="text-[var(--text-dim)]" />
                            }
                          </button>
                        );
                      })
                    )}
                    <button
                      onClick={() => setShowTripPicker(null)}
                      className="w-full text-xs text-[var(--text-dim)] py-2 hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowTripPicker(place.name)}
                    className="btn btn-primary w-full py-2 text-sm flex items-center justify-center gap-2"
                  >
                    <Plus size={15} /> Add to Trip
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card text-center py-16">
            <p className="text-4xl mb-4">🗺️</p>
            <p className="text-[var(--text-dim)]">No destinations match your filters. Try a different combination.</p>
            <button
              onClick={() => { setSelectedType("All"); setSelectedDifficulty("All"); }}
              className="btn btn-primary mt-4 px-6 py-2"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}