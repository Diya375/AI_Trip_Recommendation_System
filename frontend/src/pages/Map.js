import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { MapPin } from "lucide-react";

const LIBRARIES = ["places"];

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c54" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1b2a" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

export default function MapPage() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [locationName, setLocationName] = useState("Your Location");
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(coords);
          if (window.google) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: coords }, (results, status) => {
              if (status === "OK" && results[0]) {
                setLocationName(results[0].formatted_address);
              }
            });
          }
        },
        () => {
          setUserLocation({ lat: 28.2096, lng: 83.9856 });
          setLocationName("Pokhara, Nepal");
        }
      );
    }
  }, [isLoaded]);

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-transparent border-none text-[var(--text-dim)] text-sm cursor-pointer p-0 mb-2 hover:text-[var(--text)] transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h2 className="cinzel text-3xl text-[var(--accent)] m-0">
            Your Location
          </h2>
        </div>

        {/* Location pill */}
        <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-4 py-2 text-xs text-[var(--text-dim)] max-w-[280px]">
          <MapPin size={13} className="text-[var(--accent)] shrink-0" />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {locationName}
          </span>
        </div>
      </div>

      {/* Map */}
      <div
        className="rounded-2xl overflow-hidden border border-[var(--border)] min-h-[400px]"
        style={{ height: "calc(100vh - 220px)" }}
      >
        {isLoaded && userLocation ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={userLocation}
            zoom={14}
            onLoad={(map) => (mapRef.current = map)}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              scrollwheel: true,
              styles: darkMapStyle,
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            <Marker
              position={userLocation}
              onClick={() => setSelectedMarker(userLocation)}
            />

            {selectedMarker && (
              <InfoWindow
                position={selectedMarker}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="bg-[#1a1a2e] text-white px-3 py-2 rounded-lg text-xs max-w-[200px]">
                  <p className="font-semibold m-0 mb-1">📍 You are here</p>
                  <p className="m-0 opacity-70 text-[0.7rem]">{locationName}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-full bg-[var(--bg)] flex flex-col items-center justify-center gap-3 text-[var(--text-dim)]">
            <MapPin size={32} />
            <p className="text-sm">Loading your location...</p>
          </div>
        )}
      </div>

    </DashboardLayout>
  );
}