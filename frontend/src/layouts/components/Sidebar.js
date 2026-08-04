// src/components/Sidebar.js
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  LayoutDashboard,
  Home,
  Compass,
  CalendarDays,
  Receipt,
  Bot,
  User,
  LogOut,
  Maximize2,
  MapPin,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Home", path: "/home", icon: Home },
  { label: "Planner", path: "/planner", icon: CalendarDays },
  { label: "Explore", path: "/explore", icon: Compass },
  { label: "Expenses", path: "/expenses", icon: Receipt },
  { label: "AI Assistant", path: "/assistant", icon: Bot },
  { label: "Profile", path: "/profile", icon: User },
];

const LIBRARIES = ["places"];

const tealMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0d1716" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0d1716" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4d7c75" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#122a26" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0e2420" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8bb8b3" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#061a18" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#14b8a6" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#0f2e2a" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#113530" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

export default function Sidebar({ isCollapsed }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

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

  useEffect(() => {
    if (mapRef.current && userLocation) {
      const timer = setTimeout(() => {
        const google = window.google;
        if (google && google.maps) {
          google.maps.event.trigger(mapRef.current, "resize");
          mapRef.current.panTo(userLocation);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed, userLocation]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  return (
    <aside
      className={`sticky top-0 z-10 flex h-screen flex-col border-r border-slate-200 bg-[var(--bg-card)] shadow-[4px_0_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-20 min-w-[80px] px-2 py-8" : "w-[290px] min-w-[290px] px-6 py-8"
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden overflow-y-auto">
        <div
          className={`mb-10 ${isCollapsed ? "text-center" : "text-left pl-2"}`}
        >
          <div
            className={`cinzel font-black tracking-[0.08em] text-[var(--accent)] transition-all duration-300 ${
              isCollapsed ? "text-2xl" : "text-[1.65rem]"
            }`}
          >
            {isCollapsed ? "YV" : "YATRAVERSE"}
          </div>
          <div
            className={`mt-1 max-w-full overflow-hidden text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--accent-2)] transition-all duration-200 ${
              isCollapsed ? "opacity-0 max-h-0" : "opacity-100 max-h-[20px]"
            }`}
          >
            AI TRAVEL COMPANION
          </div>
        </div>

        <nav className="mb-8 flex flex-col gap-2">
          {navItems.map(({ label, path, icon: IconComponent }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex items-center ${
                  isCollapsed ? "justify-center" : "justify-start"
                } gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--bg-subtle)] text-[var(--text)] border-l-4 border-[var(--accent)]"
                    : "border-l-4 border-transparent text-[var(--text-dim)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
                }`
              }
            >
              <IconComponent size={20} strokeWidth={2.2} className="flex-shrink-0" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
                  isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <div
            className={`overflow-hidden rounded-3xl transition-all duration-300 ${
              isCollapsed ? "max-h-0 opacity-0" : "mb-6 max-h-[220px] opacity-100"
            }`}
          >
            <div className="flex items-center gap-2 pb-3 pl-1 text-[0.78rem] font-bold uppercase tracking-[0.01em] text-[var(--text)]">
              <MapPin size={13} className="text-[var(--accent)] flex-shrink-0" strokeWidth={2.2} />
              <span>Your Location</span>
              <span className="rounded-full bg-[rgba(26,128,96,0.12)] px-2 py-0.5 text-[0.6rem] font-semibold text-[var(--accent)]">
                Live
              </span>
            </div>
            <div
              onClick={() => navigate("/map")}
              className="relative h-[180px] w-full cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-slate-100"
            >
              {isLoaded && userLocation ? (
                <GoogleMap
                  mapContainerClassName="absolute inset-0"
                  center={userLocation}
                  zoom={13}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    scrollwheel: false,
                    gestureHandling: "none",
                    styles: tealMapStyle,
                  }}
                >
                  <Marker position={userLocation} />
                </GoogleMap>
              ) : (
                <div className="absolute inset-0 bg-slate-100" />
              )}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-slate-950/85 px-2 py-1 text-[0.65rem] text-white backdrop-blur-sm">
                <Maximize2 size={10} />
                Expand Map
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFF1F2] px-4 py-3 text-sm font-semibold text-[#F43F5E] transition hover:bg-[#FFE4E6]"
          >
            <LogOut size={16} className="flex-shrink-0" />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              Log out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
