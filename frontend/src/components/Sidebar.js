import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Expand } from "lucide-react";

const navItems = [
  { label: "Dashboard",    path: "/dashboard" },
  { label: "Home",         path: "/home" },
  { label: "Explore",      path: "/explore" },
  { label: "Planner",      path: "/planner" },
  { label: "Expenses",     path: "/expenses" },
  { label: "AI Assistant", path: "/assistant" },
  { label: "Profile",      path: "/profile" },
];

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

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: 28.2096, lng: 83.9856 })
      );
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar flex flex-col h-screen overflow-y-auto">

      {/* Logo */}
      <div>
        <div className="sidebar-logo">YatraVerse</div>
        <div className="sidebar-tagline">AI TRAVEL COMPANION</div>
      </div>

      <hr className="divider" />

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-[2px]">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <hr className="divider" />

      {/* Map widget */}
      <div className="pb-4">
        <p className="text-[0.7rem] text-[var(--text-dim)] uppercase tracking-widest mb-2">
          📍 Your Location
        </p>

        <div
          onClick={() => navigate("/map")}
          className="relative rounded-xl overflow-hidden border border-[var(--border)] h-40 cursor-pointer group"
        >
          {isLoaded && userLocation ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={userLocation}
              zoom={13}
              options={{
                disableDefaultUI: true,
                zoomControl: false,
                scrollwheel: false,
                gestureHandling: "none",
                styles: darkMapStyle,
              }}
            >
              <Marker position={userLocation} />
            </GoogleMap>
          ) : (
            <div className="w-full h-full bg-[var(--bg)] flex items-center justify-center text-xs text-[var(--text-dim)]">
              Loading map...
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 pointer-events-none rounded-xl" />

          {/* Expand hint */}
          <div className="absolute bottom-2 right-2 bg-black/60 rounded-md px-2 py-[3px] text-[0.7rem] text-white flex items-center gap-1 pointer-events-none">
            <Expand size={11} />
            Full map
          </div>
        </div>
      </div>

      <hr className="divider" />

      <button
        className="btn btn-danger w-full text-center"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;