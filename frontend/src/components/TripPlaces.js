// import { useEffect, useState, useRef } from "react";
// import { MapPin, Trash2, Plus, Search } from "lucide-react";
// import API from "../services/api";

// export default function TripPlaces({ tripId }) {
//   const [places, setPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [adding, setAdding] = useState(false);
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const inputRef = useRef(null);
//   const sessionTokenRef = useRef(null);

//   useEffect(() => {
//     API.get(`/trips/${tripId}/places`)
//       .then((res) => setPlaces(res.data))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, [tripId]);

//   // init session token when google is ready
//   useEffect(() => {
//     if (window.google?.maps?.places) {
//       sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
//     }
//   }, []);

//   const handleQueryChange = async (e) => {
//     const val = e.target.value;
//     setQuery(val);

//     if (!val.trim() || val.length < 2) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     try {
//       const { AutocompleteSuggestion } = await window.google.maps.importLibrary("places");
//       const request = {
//         input: val,
//         sessionToken: sessionTokenRef.current,
//       };
//       const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
//       setSuggestions(results || []);
//       setShowSuggestions(true);
//     } catch (err) {
//       console.error("Autocomplete error:", err);
//     }
//   };

//   const handleSelectSuggestion = async (suggestion) => {
//     setShowSuggestions(false);
//     setQuery(suggestion.placePrediction.text.toString());
//     setAdding(true);

//     try {
//       const place = suggestion.placePrediction.toPlace();
//       await place.fetchFields({ fields: ["displayName", "formattedAddress", "location", "id"] });

//       const lat = place.location.lat();
//       const lng = place.location.lng();

//       const res = await API.post(`/trips/${tripId}/places`, {
//         name: place.displayName,
//         address: place.formattedAddress,
//         lat,
//         lng,
//         place_id: place.id,
//       });

//       setPlaces((prev) => [...prev, res.data]);
//       setQuery("");

//       // refresh session token after a place is selected
//       sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to save place");
//     } finally {
//       setAdding(false);
//     }
//   };

//   const handleDelete = async (placeId) => {
//     try {
//       await API.delete(`/trips/${tripId}/places/${placeId}`);
//       setPlaces((prev) => prev.filter((p) => p.id !== placeId));
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to remove place");
//     }
//   };

//   return (
//     <div style={{ marginTop: "2.5rem" }}>
//       <h3 className="cinzel" style={{ fontSize: "1.1rem", color: "var(--text)", marginBottom: "1.25rem" }}>
//         📌 Places to Visit
//       </h3>

//       {/* Search box */}
//       <div style={{ position: "relative", marginBottom: "1.25rem" }}>
//         <div style={{ position: "relative" }}>
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search and add a place..."
//             value={query}
//             onChange={handleQueryChange}
//             onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
//             onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
//             className="input"
//             style={{ width: "100%", paddingRight: "44px", paddingLeft: "40px" }}
//             disabled={adding}
//           />
//           <Search size={16} style={{
//             position: "absolute", left: "12px", top: "50%",
//             transform: "translateY(-50%)", color: "var(--text-dim)", pointerEvents: "none"
//           }} />
//           <div style={{
//             position: "absolute", right: "12px", top: "50%",
//             transform: "translateY(-50%)", color: "var(--text-dim)",
//             display: "flex", alignItems: "center",
//           }}>
//             {adding ? (
//               <span style={{ fontSize: "0.7rem" }}>Saving...</span>
//             ) : (
//               <Plus size={18} />
//             )}
//           </div>
//         </div>

//         {/* Suggestions dropdown */}
//         {showSuggestions && suggestions.length > 0 && (
//           <div style={{
//             position: "absolute",
//             top: "calc(100% + 4px)",
//             left: 0,
//             right: 0,
//             background: "var(--bg-card)",
//             border: "1px solid var(--border)",
//             borderRadius: "10px",
//             overflow: "hidden",
//             zIndex: 50,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
//           }}>
//             {suggestions.map((s, i) => {
//               const prediction = s.placePrediction;
//               const main = prediction.mainText?.toString() || "";
//               const secondary = prediction.secondaryText?.toString() || "";
//               return (
//                 <div
//                   key={i}
//                   onMouseDown={() => handleSelectSuggestion(s)}
//                   style={{
//                     padding: "0.75rem 1rem",
//                     cursor: "pointer",
//                     borderBottom: i < suggestions.length - 1 ? "1px solid var(--border)" : "none",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     gap: "0.75rem",
//                     transition: "background 0.15s",
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg)"}
//                   onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
//                 >
//                   <MapPin size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} />
//                   <div>
//                     <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text)", fontWeight: 500 }}>{main}</p>
//                     {secondary && (
//                       <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-dim)" }}>{secondary}</p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.4rem" }}>
//           Search for a place and select it from the dropdown to add.
//         </p>
//       </div>

//       {/* Places list */}
//       {loading ? (
//         <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>Loading places...</p>
//       ) : places.length === 0 ? (
//         <div className="card" style={{ textAlign: "center", padding: "2rem", background: "var(--bg)" }}>
//           <MapPin size={28} color="var(--text-dim)" style={{ marginBottom: "0.75rem" }} />
//           <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
//             No places saved yet. Search above to add destinations.
//           </p>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//           {places.map((place) => (
//             <div
//               key={place.id}
//               className="card"
//               style={{
//                 display: "flex", alignItems: "flex-start",
//                 justifyContent: "space-between", gap: "1rem",
//                 padding: "0.85rem 1rem", background: "var(--bg)",
//               }}
//             >
//               <div style={{ display: "flex", gap: "0.75rem", flex: 1, minWidth: 0 }}>
//                 <MapPin size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} />
//                 <div>
//                   <p style={{ fontWeight: 600, color: "var(--text)", margin: 0, fontSize: "0.9rem" }}>
//                     {place.name}
//                   </p>
//                   {place.address && (
//                     <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", margin: "0.2rem 0 0" }}>
//                       {place.address}
//                     </p>
//                   )}
//                   <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", margin: "0.2rem 0 0" }}>
//                     Added by {place.added_by}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleDelete(place.id)}
//                 style={{
//                   background: "none", border: "none", cursor: "pointer",
//                   color: "var(--text-dim)", padding: 0, flexShrink: 0,
//                   display: "flex", alignItems: "center",
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.color = "#e74c3c"}
//                 onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-dim)"}
//               >
//                 <Trash2 size={15} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

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

