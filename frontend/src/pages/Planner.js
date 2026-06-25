import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { Copy, Check, Link2 } from "lucide-react";
import TripPlaces from "../components/TripPlaces";

const TRIP_TYPES = ["Adventure", "Hiking", "Trekking", "Relaxing", "Cultural", "Beach", "Wildlife", "Road Trip"];
const FOOD_OPTIONS = ["No preference", "Vegetarian", "Non-Vegetarian", "Vegan", "Halal"];
const ACCOMMODATION_OPTIONS = ["No preference", "Hotel", "Camping", "Homestay", "Resort", "Hostel"];

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

  const [budget, setBudget] = useState("");
  const [tripTypes, setTripTypes] = useState([]);
  const [food, setFood] = useState("No preference");
  const [accommodation, setAccommodation] = useState("No preference");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login", { state: { redirectTo: location.pathname } }); return; }

    if (!id) { navigate("/dashboard"); return; }

    Promise.all([
      API.get(`/trips/${id}`),
      API.get(`/trips/${id}/preferences`)
    ])
      .then(([tripRes, prefRes]) => {
        setTrip(tripRes.data.trip);
        setMembers(tripRes.data.members);
        setRole(prefRes.data.role);

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

  const handleSendToAI = () => {
    navigate(`/assistant`, {
      state: { tripId: id, tripName: trip?.name, preferences: allPreferences, members },
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p style={{ color: "var(--text-dim)" }}>Loading trip...</p>
      </DashboardLayout>
    );
  }

  const membersWithoutPrefs = members.filter(
    (m) => !allPreferences.find((p) => p.user_id === m.id)
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem" }}
          >
            ← Back to Dashboard
          </button>
          <h2 className="cinzel" style={{ fontSize: "1.8rem", color: "var(--accent)", margin: 0 }}>
            {trip?.name}
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
            {members.length} member{members.length !== 1 ? "s" : ""} · {role === "admin" ? "You are the admin" : "You are a member"}
          </p>
        </div>

        {role === "admin" && allPreferences.length > 0 && (
          <button
            onClick={handleSendToAI}
            className="btn btn-primary"
            style={{ padding: "0.75rem 1.5rem", fontSize: "0.9rem" }}
          >
            🌐 Send to AI Assistant
          </button>
        )}
      </div>

      {/* ── ADMIN VIEW ── */}
      {role === "admin" && (
        <>
          {/* Invite link — always visible to admin */}
          {inviteLink && (
            <div
              className="card"
              style={{
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                padding: "1rem 1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                <Link2 size={16} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", color: "var(--text)", wordBreak: "break-all" }}>
                  {inviteLink}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="btn btn-primary"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  flexShrink: 0,
                }}
              >
                {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>
          )}

          {/* Who hasn't filled yet */}
          {membersWithoutPrefs.length > 0 && (
            <div className="card" style={{ marginBottom: "2rem", background: "var(--bg)", border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
                ⏳ Waiting for preferences from:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {membersWithoutPrefs.map((m) => (
                  <span key={m.id} style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", borderRadius: "20px", background: "var(--border)", color: "var(--text-dim)" }}>
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* All preferences */}
          {allPreferences.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📋</div>
              <p style={{ color: "var(--text-dim)" }}>No preferences submitted yet. Share the invite link so members can join and fill in their preferences.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {allPreferences.map((pref) => (
                <div key={pref.user_id} className="card fade-up">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", color: "#fff", fontWeight: 600, flexShrink: 0 }}>
                      {pref.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: "var(--text)", margin: 0 }}>{pref.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", margin: 0 }}>{pref.email}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <PrefRow icon="💲" label="Budget" value={pref.budget ? `Rs. ${pref.budget.toLocaleString()}` : "Not specified"} />
                    <PrefRow icon="🏕️" label="Trip type" value={pref.trip_types?.length ? pref.trip_types.join(", ") : "Not specified"} />
                    <PrefRow icon="🍽️" label="Food" value={pref.food_preference || "Not specified"} />
                    <PrefRow icon="🏨" label="Stay" value={pref.accommodation || "Not specified"} />
                    {pref.notes && <PrefRow icon="📝" label="Notes" value={pref.notes} />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Admin's own preferences */}
<div style={{ marginTop: "2.5rem" }}>
  <h3 className="cinzel" style={{ fontSize: "1.1rem", color: "var(--text)", marginBottom: "1.5rem" }}>
    Your Preferences
  </h3>
  <PreferenceForm
    budget={budget} setBudget={setBudget}
    tripTypes={tripTypes} toggleTripType={toggleTripType}
    food={food} setFood={setFood}
    accommodation={accommodation} setAccommodation={setAccommodation}
    notes={notes} setNotes={setNotes}
    onSave={handleSave} saving={saving} saved={saved}
  />
</div>

 
<TripPlaces tripId={id} />
        </>
      )}

      {/* ── MEMBER VIEW ── */}
      {role === "member" && (
        <div style={{ maxWidth: "600px" }}>
          <p style={{ color: "var(--text-dim)", marginBottom: "2rem", fontSize: "0.9rem" }}>
            {preferences
              ? "Your preferences have been saved. You can update them anytime."
              : "Fill in your preferences so the admin can plan the perfect trip for everyone."}
          </p>
          <PreferenceForm
            budget={budget} setBudget={setBudget}
            tripTypes={tripTypes} toggleTripType={toggleTripType}
            food={food} setFood={setFood}
            accommodation={accommodation} setAccommodation={setAccommodation}
            notes={notes} setNotes={setNotes}
            onSave={handleSave} saving={saving} saved={saved}
          />
      
    <TripPlaces tripId={id} />
  </div>
)}
    </DashboardLayout>
  );
}

function PrefRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
        <p style={{ fontSize: "0.9rem", color: "var(--text)", margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

function PreferenceForm({ budget, setBudget, tripTypes, toggleTripType, food, setFood, accommodation, setAccommodation, notes, setNotes, onSave, saving, saved }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>
          💰 Budget (Rs.)
        </label>
        <input
          type="number"
          placeholder="e.g. 15000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="input"
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.75rem" }}>
          🏕️ Trip Type (select all that apply)
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {TRIP_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleTripType(type)}
              style={{
                padding: "0.4rem 0.9rem", borderRadius: "20px", border: "1px solid",
                borderColor: tripTypes.includes(type) ? "var(--accent)" : "var(--border)",
                background: tripTypes.includes(type) ? "var(--accent)" : "transparent",
                color: tripTypes.includes(type) ? "#fff" : "var(--text-dim)",
                cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.75rem" }}>
          🍽️ Food Preference
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {FOOD_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setFood(option)}
              style={{
                padding: "0.4rem 0.9rem", borderRadius: "20px", border: "1px solid",
                borderColor: food === option ? "var(--accent)" : "var(--border)",
                background: food === option ? "var(--accent)" : "transparent",
                color: food === option ? "#fff" : "var(--text-dim)",
                cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.75rem" }}>
          🏨 Accommodation
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {ACCOMMODATION_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setAccommodation(option)}
              style={{
                padding: "0.4rem 0.9rem", borderRadius: "20px", border: "1px solid",
                borderColor: accommodation === option ? "var(--accent)" : "var(--border)",
                background: accommodation === option ? "var(--accent)" : "transparent",
                color: accommodation === option ? "#fff" : "var(--text-dim)",
                cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>
          📝 Additional Notes
        </label>
        <textarea
          placeholder="Any specific places, requirements or things you'd like to do..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          style={{
            width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
            borderRadius: "10px", padding: "0.75rem 1rem", color: "var(--text)",
            fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box",
          }}
        />
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="btn btn-primary"
        style={{ padding: "0.85rem", fontSize: "1rem", opacity: saving ? 0.7 : 1 }}
      >
        {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Preferences"}
      </button>
    </div>
  );
}