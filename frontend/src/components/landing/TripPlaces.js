 import { useEffect, useState, useRef } from "react";
import { MapPin, Trash2, Plus, Search } from "lucide-react";
import API from "../../services/api";

export default function TripPlaces({ tripId }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const mapRef = useRef(null);
  const googleMapInstance = useRef(null);
  const markersRef = useRef([]);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  // Load places from DB
  useEffect(() => {
    API.get(`/trips/${tripId}/places`)
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error("Error fetching places:", err))
      .finally(() => setLoading(false));
  }, [tripId]);

  // Robust poll initialization checking for window.google readiness
  useEffect(() => {
    let checkGoogleInterval = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places && mapRef.current) {
        clearInterval(checkGoogleInterval);
        initMap();
      }
    }, 300); // Check every 300ms

    return () => clearInterval(checkGoogleInterval);
  }, [loading]);

  const initMap = () => {
    if (googleMapInstance.current) return; // Prevent duplicate injection

    try {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      
      googleMapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.3949, lng: 84.1240 }, // Nepal Bounds
        zoom: 7,
      });

      placesService.current = new window.google.maps.places.PlacesService(googleMapInstance.current);
      renderMarkers();
    } catch (error) {
      console.error("Google Maps SDK failed to construct:", error);
    }
  };

  const renderMarkers = () => {
    if (!googleMapInstance.current) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    if (places.length === 0) return;
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.lat || !place.lng) return;
      const position = { lat: parseFloat(place.lat), lng: parseFloat(place.lng) };

      const marker = new window.google.maps.Marker({
        position,
        map: googleMapInstance.current,
        title: place.name,
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    googleMapInstance.current.fitBounds(bounds);
    if (places.length === 1) googleMapInstance.current.setZoom(13);
  };

  useEffect(() => {
    renderMarkers();
  }, [places]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (!val.trim() || val.length < 2 || !autocompleteService.current) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      { input: val },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
          setShowSuggestions(true);
        }
      }
    );
  };

  const handleSelectSuggestion = (suggestion) => {
    setShowSuggestions(false);
    setQuery(suggestion.description);
    setAdding(true);

    if (!placesService.current) return;

    placesService.current.getDetails(
      { placeId: suggestion.place_id, fields: ["name", "formatted_address", "geometry"] },
      async (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          try {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            const res = await API.post(`/trips/${tripId}/places`, {
              name: place.name,
              address: place.formatted_address || "",
              lat,
              lng,
              place_id: suggestion.place_id,
            });

            setPlaces((prev) => [...prev, res.data]);
            setQuery("");
          } catch (err) {
            console.error(err);
          } finally {
            setAdding(false);
          }
        } else {
          setAdding(false);
        }
      }
    );
  };

  const handleDelete = async (placeId) => {
    try {
      await API.delete(`/trips/${tripId}/places/${placeId}`);
      setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.06)" }}>
      <h3 className="cinzel" style={{ fontSize: "1.2rem", color: "#2B3E34", marginBottom: "1.25rem", fontWeight: "700" }}>
        📌 Places to Visit
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <div style={{ position: "relative", marginBottom: "1.25rem" }}>
            <input
              type="text"
              placeholder="Search and add a place..."
              value={query}
              onChange={handleQueryChange}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #cbd5e1" }}
              disabled={adding}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "10px", zIndex: 999, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSelectSuggestion(s)}
                    style={{ padding: "0.75rem 1rem", cursor: "pointer", borderBottom: "1px solid #f1f5f9", fontSize: "0.85rem", color: "#334155" }}
                  >
                    {s.description}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {places.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No destinations added yet.</p>
            ) : (
              places.map((place) => (
                <div key={place.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: "0.88rem", color: "#1e293b" }}>{place.name}</p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>{place.address}</p>
                  </div>
                  <button onClick={() => handleDelete(place.id)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div ref={mapRef} style={{ width: "100%", height: "350px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#f1f5f9" }} />
      </div>
    </div>
  );
}

