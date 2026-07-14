/* Linked Explore Places Destination Section */ 
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { Copy, Check, Link2, ChevronDown, ChevronUp } from "lucide-react";

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
  const [linkedPlaces, setLinkedPlaces] = useState([]); // This state stores the places
  const [budget, setBudget] = useState("");
  const [tripTypes, setTripTypes] = useState([]);
  const [food, setFood] = useState("No preference");
  const [accommodation, setAccommodation] = useState("No preference");
  const [notes, setNotes] = useState("");

  // Foldable Accordion State
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login", { state: { redirectTo: location.pathname } }); return; }

    if (!id) { navigate("/planner"); return; }

    // Fetch Trip Info, Member Preferences, AND Linked Places simultaneously
    Promise.all([
      API.get(`/trips/${id}`),
      API.get(`/trips/${id}/preferences`),
      API.get(`/trips/${id}/places`) // Added request to fetch appended places
    ])
      .then(([tripRes, prefRes, placesRes]) => {
        setTrip(tripRes.data.trip);
        setMembers(tripRes.data.members);
        setRole(prefRes.data.role);
        setLinkedPlaces(placesRes.data.places || placesRes.data || []); // Set places data array

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
            &larr; Back to Dashboard
          </button>
          <h2 className="cinzel" style={{ fontSize: "1.8rem", color: "var(--accent)", margin: 0, fontWeight: "700" }}>
            {trip?.name}
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
            {members.length} member{members.length !== 1 ? "s" : ""} &middot; {role === "admin" ? "You are the admin" : "You are a member"}
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
                  linkedPlaces: linkedPlaces,
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
            <div className="card" style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", padding: "1rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                <Link2 size={16} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", color: "var(--text)", wordBreak: "break-all" }}>{inviteLink}</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="btn btn-primary"
                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0, fontWeight: "700" }}
              >
                {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>
          )}

          {/* Waiting List Status */}
          {membersWithoutPrefs.length > 0 && (
            <div className="card" style={{ marginBottom: "2rem", background: "var(--bg)", border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "0.75rem", fontWeight: "700" }}>&middot; Waiting for preferences from:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {membersWithoutPrefs.map((m) => (
                  <span key={m.id} style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", borderRadius: "20px", background: "var(--border)", color: "var(--text-dim)", fontWeight: "600" }}>{m.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Group Submission Grid Cards */}
          {allPreferences.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📋</div>
              <p style={{ color: "var(--text-dim)", fontWeight: "600" }}>No preferences submitted yet. Share the link so members can join.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {allPreferences.map((pref) => (
                <div key={pref.user_id} className="card fade-up">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyindex: "center", fontSize: "0.9rem", color: "#fff", fontWeight: "700", flexShrink: 0 }}>
                      {pref.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight: "700", color: "var(--text)", margin: 0 }}>{pref.name}</p>
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
        </>
      )}

     {/* Linked Explore Places Destination Section */}
<h3 className="cinzel" style={{ fontSize: "1.2rem", color: "var(--text)", marginBottom: "1rem", fontWeight: "700" }}>
  📍 Curated Destinations Bucket List
</h3>

{(() => {
  // De-duplicate places by ID before rendering
  const uniquePlaces = linkedPlaces.filter(
    (place, index, self) => self.findIndex((p) => p.id === place.id) === index
  );

  // Handle removing a place from the frontend state and backend
  const handleRemovePlace = async (placeId) => {
    if (!window.confirm("Are you sure you want to remove this destination?")) return;
    
    try {
      // Sends a DELETE request to your backend endpoint
      await API.delete(`/trips/${id}/places/${placeId}`);
      
      // Update the frontend state immediately after successful deletion
      setLinkedPlaces((prev) => prev.filter((p) => p.id !== placeId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to remove destination");
    }
  };

  return uniquePlaces.length === 0 ? (
    <div className="card" style={{ padding: "1.5rem", color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "2rem", textAlign: "center" }}>
      No explore items appended to this trip itinerary group yet.
    </div>
  ) : (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
      {uniquePlaces.map((p) => (
        <div 
          key={p.id} 
          className="card" 
          style={{ 
            padding: "0.75rem", 
            display: "flex", 
            gap: "0.75rem", 
            alignItems: "center", 
            position: "relative" // Allows positioning the delete button
          }}
        >
          {p.image_url && (
            <img src={p.image_url} alt={p.name} style={{ width: "50px", height: "50px", borderRadius: "6px", objectFit: "cover" }} />
          )}
          <div style={{ minWidth: 0, flex: 1, paddingRight: "1.5rem" }}>
            <p style={{ margin: 0, fontWeight: "700", fontSize: "0.85rem", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-dim)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.location || p.address}</p>
          </div>
          
          {/* Delete Button */}
          <button
            onClick={() => handleRemovePlace(p.id)}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "none",
              border: "none",
              color: "var(--text-dim)",
              cursor: "pointer",
              fontSize: "1rem",
              padding: "2px 5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.color = "red"}
            onMouseLeave={(e) => e.target.style.color = "var(--text-dim)"}
            title="Remove place"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
})()}
      {/* ── 🔽 THE FOLDABLE/ACCORDION PREFERENCE MODULE VIEW ── */}
      <div className="card" style={{ marginBottom: "2.5rem", border: "1px solid var(--border)", padding: "1.25rem" }}>
        <div
          onClick={() => setIsFormExpanded(!isFormExpanded)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        >
          <div>
            <h3 className="cinzel" style={{ fontSize: "1.1rem", color: "var(--text)", margin: 0, fontWeight: "700" }}>
              🛠️ Your Personal Trip Preferences
            </h3>
            <p style={{ color: "var(--text-dim)", fontSize: "0.78rem", margin: "3px 0 0 0" }}>
              {isFormExpanded ? "Collapse panel to hide options" : "Expand to configure budget, lodging, dining choices"}
            </p>
          </div>
          <button style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}>
            {isFormExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Form content */}
        {isFormExpanded && (
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
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

    </DashboardLayout>
  );
}

// Inline Sub-Components
function PrefRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
      <div>
        <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700" }}>{label}</p>
        <p style={{ fontSize: "0.9rem", color: "var(--text)", margin: 0, fontWeight: "500" }}>{value}</p>
      </div>
    </div>
  );
}

function PreferenceForm({ budget, setBudget, tripTypes, toggleTripType, food, setFood, accommodation, setAccommodation, notes, setNotes, onSave, saving, saved }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>
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
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.75rem", fontWeight: "700" }}>
          CC Trip Type (select all that apply)
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
                fontWeight: "600"
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.75rem", fontWeight: "700" }}>
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
                fontWeight: "600"
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.75rem", fontWeight: "700" }}>
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
                fontWeight: "600"
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem", fontWeight: "700" }}>
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
        style={{ padding: "0.85rem", fontSize: "1rem", opacity: saving ? 0.7 : 1, fontWeight: "700" }}
      >
        {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Preferences"}
      </button>
    </div>
  );
}