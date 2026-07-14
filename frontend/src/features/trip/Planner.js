import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { Copy, Check, Link2, ChevronDown, ChevronUp, ArrowLeft, X, ClipboardList } from "lucide-react";

const TRIP_TYPES = ["Adventure", "Hiking", "Trekking", "Relaxing", "Cultural", "Beach", "Wildlife", "Road Trip"];
const FOOD_OPTIONS = ["No preference", "Vegetarian", "Non-Vegetarian", "Vegan", "Halal"];
const ACCOMMODATION_OPTIONS = ["No preference", "Hotel", "Camping", "Homestay", "Resort", "Hostel"];

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 " +
  "placeholder:text-gray-400 outline-none focus:border-[var(--accent)]/50 transition-colors";

const pillClass = (active) =>
  `px-3.5 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all ${
    active
      ? "bg-[var(--accent)] border-[var(--accent)] text-white"
      : "border-gray-200 bg-white text-gray-500 hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
  }`;

export default function Planner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [trip, setTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [role, setRole] = useState("");
  const [preferences, setPreferences] = useState(null);
  const [allPreferences, setAllPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [linkedPlaces, setLinkedPlaces] = useState([]);
  const [budget, setBudget] = useState("");
  const [tripTypes, setTripTypes] = useState([]);
  const [food, setFood] = useState("No preference");
  const [accommodation, setAccommodation] = useState("No preference");
  const [notes, setNotes] = useState("");

  const [isFormExpanded, setIsFormExpanded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login", { state: { redirectTo: location.pathname } }); return; }
    if (!id) { navigate("/planner"); return; }

    Promise.all([
      API.get(`/trips/${id}`),
      API.get(`/trips/${id}/preferences`),
      API.get(`/trips/${id}/places`)
    ])
      .then(([tripRes, prefRes, placesRes]) => {
        setTrip(tripRes.data.trip);
        setMembers(tripRes.data.members);
        setRole(prefRes.data.role);
        setLinkedPlaces(placesRes.data.places || placesRes.data || []);

        if (prefRes.data.role === "admin") {
          setAllPreferences(prefRes.data.preferences);
        } else {
          const pref = prefRes.data.preferences;
          if (pref) {
            setBudget(pref.budget || "");
            setTripTypes(pref.trip_types || []);
            setFood(pref.food_preference || "No preference");
            setAccommodation(pref.accommodation || "No preference");
            setNotes(pref.notes || "");
            setPreferences(pref);
          }
        }
      })
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [id, navigate, location.pathname]);

  const inviteLink = trip ? `${window.location.origin}/join/${trip.invite_code}` : "";

  const toggleTripType = (type) => {
    setTripTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await API.post(`/trips/${id}/preferences`, {
        budget: parseInt(budget) || null,
        trip_types: tripTypes,
        food_preference: food,
        accommodation,
        notes,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (role === "admin") {
        const prefRes = await API.get(`/trips/${id}/preferences`);
        setAllPreferences(prefRes.data.preferences);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-400 text-sm">Loading trip...</p>
      </DashboardLayout>
    );
  }

  const membersWithoutPrefs = members.filter(
    (m) => !allPreferences.find((p) => p.user_id === m.id)
  );

  const handleRemovePlace = async (placeId) => {
    if (!window.confirm("Are you sure you want to remove this destination?")) return;
    try {
      await API.delete(`/trips/${id}/places/${placeId}`);
      setLinkedPlaces((prev) => prev.filter((p) => p.id !== placeId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to remove destination");
    }
  };

  const uniquePlaces = linkedPlaces.filter(
    (place, index, self) => self.findIndex((p) => p.id === place.id) === index
  );

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto px-4 sm:px-0">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1 text-xs text-gray-400 bg-transparent border-none
                cursor-pointer hover:text-gray-700 transition-colors mb-2 p-0"
            >
              <ArrowLeft size={12} /> Back to Dashboard
            </button>
            <h1 className="cinzel text-2xl sm:text-3xl text-[var(--accent)] font-bold mb-1 break-words">
              {trip?.name}
            </h1>
            <p className="text-gray-500 text-sm">
              {members.length} member{members.length !== 1 ? "s" : ""} · {role === "admin" ? "You are the admin" : "You are a member"}
            </p>
          </div>

        {role === "admin" && (
          <button
            onClick={() =>
              navigate(`/assistant/${id}`, {
                state: {
                  tripId: parseInt(id),
                  tripName: trip?.name,
                  members: members,
                  preferences: allPreferences,
                },
              })
            }
            className="btn btn-primary"
            style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            🌐 Send to AI Assistant
          </button>
        )}
      </div>

        {role === "admin" && (
          <>
            {/* Invite Link */}
            {inviteLink && (
              <div className="mb-6 sm:mb-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5
                flex items-center flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Link2 size={16} className="text-gray-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600 break-all">{inviteLink}</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent)] text-white
                    text-sm font-semibold hover:opacity-90 transition-opacity border-none cursor-pointer shrink-0"
                >
                  {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                  {copiedLink ? "Copied!" : "Copy Link"}
                </button>
              </div>
            )}

            {/* Waiting List */}
            {membersWithoutPrefs.length > 0 && (
              <div className="mb-6 sm:mb-8 rounded-2xl border border-dashed border-gray-200 bg-white p-4 sm:p-5">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Waiting for preferences from
                </p>
                <div className="flex flex-wrap gap-2">
                  {membersWithoutPrefs.map((m) => (
                    <span
                      key={m.id}
                      className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-medium"
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Group Submissions */}
            {allPreferences.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white text-center py-14 sm:py-16 px-4 mb-8">
                <p className="text-4xl mb-4">📋</p>
                <p className="text-gray-500 text-sm">No preferences submitted yet. Share the link so members can join.</p>
              </div>
            ) : (
              <div
                className="grid gap-4 mb-8 sm:mb-10"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
              >
                {allPreferences.map((pref) => (
                  <div key={pref.user_id} className="fade-up rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-sm text-white font-bold shrink-0">
                        {pref.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{pref.name}</p>
                        <p className="text-xs text-gray-400 truncate">{pref.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <PrefRow icon="💰" label="Budget" value={pref.budget ? `Rs. ${pref.budget.toLocaleString()}` : "Not specified"} />
                      <PrefRow icon="🎒" label="Trip type" value={pref.trip_types?.length ? pref.trip_types.join(", ") : "Not specified"} />
                      <PrefRow icon="🍽️" label="Food" value={pref.food_preference || "Not specified"} />
                      <PrefRow icon="🏨" label="Stay" value={pref.accommodation || "Not specified"} />
                      {pref.notes && <PrefRow icon="📝" label="Notes" value={pref.notes} />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Curated Destinations */}
        <h2 className="cinzel text-lg text-gray-900 font-semibold mb-4 flex items-center gap-2">
          📍 Curated Destinations Bucket List
        </h2>

        {uniquePlaces.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white text-center py-8 px-4 mb-8 sm:mb-10">
            <p className="text-gray-400 text-sm">No explore items appended to this trip itinerary group yet.</p>
          </div>
        ) : (
          <div
            className="grid gap-3 mb-8 sm:mb-10"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
          >
            {uniquePlaces.map((p) => (
              <div
                key={p.id}
                className="relative rounded-2xl border border-gray-200 bg-white p-3 flex items-center gap-3"
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1 pr-5">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 truncate">{p.location || p.address}</p>
                </div>
                <button
                  onClick={() => handleRemovePlace(p.id)}
                  title="Remove place"
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors
                    bg-transparent border-none cursor-pointer p-1 rounded-md"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Foldable Preferences */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 mb-8 sm:mb-10">
          <div
            onClick={() => setIsFormExpanded(!isFormExpanded)}
            className="flex items-center justify-between cursor-pointer gap-3"
          >
            <div>
              <h3 className="cinzel text-base text-gray-900 font-semibold">
                🛠️ Your Personal Trip Preferences
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {isFormExpanded ? "Collapse panel to hide options" : "Expand to configure budget, lodging, dining choices"}
              </p>
            </div>
            <button className="text-gray-400 bg-transparent border-none cursor-pointer shrink-0">
              {isFormExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {isFormExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <PreferenceForm
                budget={budget} setBudget={setBudget}
                tripTypes={tripTypes} toggleTripType={toggleTripType}
                food={food} setFood={setFood}
                accommodation={accommodation} setAccommodation={setAccommodation}
                notes={notes} setNotes={setNotes}
                onSave={handleSave} saving={saving} saved={saved}
              />
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

// Inline Sub-Components
function PrefRow({ icon, label, value }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-base shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
        <p className="text-sm text-gray-800 font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

function PreferenceForm({ budget, setBudget, tripTypes, toggleTripType, food, setFood, accommodation, setAccommodation, notes, setNotes, onSave, saving, saved }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-2">
          💰 Budget (Rs.)
        </label>
        <input
          type="number"
          placeholder="e.g. 15000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-3">
          🎒 Trip Type (select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {TRIP_TYPES.map((type) => (
            <button key={type} onClick={() => toggleTripType(type)} className={pillClass(tripTypes.includes(type))}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-3">
          🍽️ Food Preference
        </label>
        <div className="flex flex-wrap gap-2">
          {FOOD_OPTIONS.map((option) => (
            <button key={option} onClick={() => setFood(option)} className={pillClass(food === option)}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-3">
          🏨 Accommodation
        </label>
        <div className="flex flex-wrap gap-2">
          {ACCOMMODATION_OPTIONS.map((option) => (
            <button key={option} onClick={() => setAccommodation(option)} className={pillClass(accommodation === option)}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-2">
          📝 Additional Notes
        </label>
        <textarea
          placeholder="Any specific places, requirements or things you'd like to do..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)] text-white
          text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity border-none cursor-pointer"
      >
        {saving ? "Saving..." : saved ? (<><Check size={16} /> Saved!</>) : "Save Preferences"}
      </button>
    </div>
  );
}