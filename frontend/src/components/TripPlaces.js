import { useEffect, useState, useRef } from "react";
import { MapPin, Trash2, Plus, Search } from "lucide-react";
import API from "../services/api";

export default function TripPlaces({ tripId }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const sessionTokenRef = useRef(null);

  useEffect(() => {
    API.get(`/trips/${tripId}/places`)
      .then((res) => setPlaces(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tripId]);

  // init session token when google is ready
  useEffect(() => {
    if (window.google?.maps?.places) {
      sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
    }
  }, []);

  const handleQueryChange = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (!val.trim() || val.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");
      const request = {
        input: val,
        sessionToken: sessionTokenRef.current,
      };
      const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
      setSuggestions(results || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setShowSuggestions(false);
    setQuery(suggestion.placePrediction.text.toString());
    setAdding(true);

    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ["displayName", "formattedAddress", "location", "id"] });

      const lat = place.location.lat();
      const lng = place.location.lng();

      const res = await API.post(`/trips/${tripId}/places`, {
        name: place.displayName,
        address: place.formattedAddress,
        lat,
        lng,
        place_id: place.id,
      });

      setPlaces((prev) => [...prev, res.data]);
      setQuery("");

      // refresh session token after a place is selected
      sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save place");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (placeId) => {
    try {
      await API.delete(`/trips/${tripId}/places/${placeId}`);
      setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to remove place");
    }
  };

  return (
    <div style={{ marginTop: "2.5rem" }}>
      <h3 className="cinzel" style={{ fontSize: "1.1rem", color: "var(--text)", marginBottom: "1.25rem" }}>
        📌 Places to Visit
      </h3>

      {/* Search box */}
      <div style={{ position: "relative", marginBottom: "1.25rem" }}>
        <div style={{ position: "relative" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search and add a place..."
            value={query}
            onChange={handleQueryChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="input"
            style={{ width: "100%", paddingRight: "44px", paddingLeft: "40px" }}
            disabled={adding}
          />
          <Search size={16} style={{
            position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)", color: "var(--text-dim)", pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute", right: "12px", top: "50%",
            transform: "translateY(-50%)", color: "var(--text-dim)",
            display: "flex", alignItems: "center",
          }}>
            {adding ? (
              <span style={{ fontSize: "0.7rem" }}>Saving...</span>
            ) : (
              <Plus size={18} />
            )}
          </div>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}>
            {suggestions.map((s, i) => {
              const prediction = s.placePrediction;
              const main = prediction.mainText?.toString() || "";
              const secondary = prediction.secondaryText?.toString() || "";
              return (
                <div
                  key={i}
                  onMouseDown={() => handleSelectSuggestion(s)}
                  style={{
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                    borderBottom: i < suggestions.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <MapPin size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text)", fontWeight: 500 }}>{main}</p>
                    {secondary && (
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-dim)" }}>{secondary}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.4rem" }}>
          Search for a place and select it from the dropdown to add.
        </p>
      </div>

      {/* Places list */}
      {loading ? (
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>Loading places...</p>
      ) : places.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem", background: "var(--bg)" }}>
          <MapPin size={28} color="var(--text-dim)" style={{ marginBottom: "0.75rem" }} />
          <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
            No places saved yet. Search above to add destinations.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {places.map((place) => (
            <div
              key={place.id}
              className="card"
              style={{
                display: "flex", alignItems: "flex-start",
                justifyContent: "space-between", gap: "1rem",
                padding: "0.85rem 1rem", background: "var(--bg)",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                <MapPin size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ fontWeight: 600, color: "var(--text)", margin: 0, fontSize: "0.9rem" }}>
                    {place.name}
                  </p>
                  {place.address && (
                    <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", margin: "0.2rem 0 0" }}>
                      {place.address}
                    </p>
                  )}
                  <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", margin: "0.2rem 0 0" }}>
                    Added by {place.added_by}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(place.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-dim)", padding: 0, flexShrink: 0,
                  display: "flex", alignItems: "center",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#e74c3c"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-dim)"}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}