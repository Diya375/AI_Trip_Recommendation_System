// src/components/Sidebar.js
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Fixed import
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
  Maximize2 
} from "lucide-react";

const navItems = [
  { label: "Dashboard",    path: "/dashboard",   icon: LayoutDashboard },
  { label: "Home",         path: "/home",        icon: Home },
  { label: "Planner",      path: "/planner",     icon: CalendarDays },
  { label: "Explore",      path: "/explore",     icon: Compass },
  { label: "Expenses",     path: "/expenses",    icon: Receipt },
  { label: "AI Assistant", path: "/assistant",   icon: Bot },
  { label: "Profile",      path: "/profile",     icon: User }
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
    <aside style={{
      width: isCollapsed ? "80px" : "290px",
      minWidth: isCollapsed ? "80px" : "290px",
      height: "100vh",
      background: "var(--bg-card)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      padding: isCollapsed ? "2rem 0.5rem" : "2rem 1.5rem",
      boxShadow: "4px 0 24px rgba(0, 0, 0, 0.01)",
      position: "sticky",
      top: 0,
      zIndex: 10,
      transition: "all 0.5s cubic-bezier(0.3, 1, 0.4, 1)", 
      fontFamily: "system-ui, sans-serif",
    }}>

      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        flex: 1
      }}>

        {/* Branding Header: Displays "YV" when collapsed and full brand name when open */}
        <div style={{ 
          marginBottom: "2.5rem", 
          paddingLeft: isCollapsed ? "0px" : "0.5rem",
          textAlign: isCollapsed ? "center" : "left",
          whiteSpace: "nowrap"
        }}>
          <div className="cinzel" style={{
            fontSize: isCollapsed ? "1.6rem" : "1.65rem",
            fontWeight: "800",
            letterSpacing: isCollapsed ? "0.05em" : "0.08em",
            color: "var(--accent)",
            lineHeight: "1.2",
            transition: "all 0.3s"
          }}>
            {isCollapsed ? "YV" : "YATRAVERSE"}
          </div>
          
          {/* Subtitle slides/hides away on collapse */}
          <div style={{
            fontSize: "0.68rem",
            fontWeight: "700",
            letterSpacing: "0.18em",
            color: "var(--accent-2)",
            marginTop: "0.25rem",
            opacity: isCollapsed ? 0 : 1,
            maxHeight: isCollapsed ? 0 : "20px",
            transition: "opacity 0.2s, max-height 0.2s",
            overflow: "hidden"
          }}>
            AI TRAVEL COMPANION
          </div>
        </div>

        {/* Permanent Navigation Icons Stack */}
        <nav style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "0.35rem",
          marginBottom: "2rem"
        }}>
          {navItems.map(({ label, path, icon: IconComponent }) => (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: isCollapsed ? "0px" : "0.9rem",
                padding: "0.8rem",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "0.92rem",
                fontWeight: isActive ? "600" : "500",
                color: isActive ? "var(--text)" : "var(--text-dim)",
                backgroundColor: isActive ? "var(--bg-subtle)" : "transparent",
                transition: "all 0.2s ease-in-out",
                borderLeft: !isCollapsed && isActive ? "4px solid var(--accent)" : "4px solid transparent",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.href.includes(window.location.pathname)) {
                  e.currentTarget.style.backgroundColor = "var(--bg-subtle)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.href.includes(window.location.pathname)) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-dim)";
                }
              }}
            >
              <IconComponent size={20} strokeWidth={2.2} style={{ flexShrink: 0 }} />
              
              <span style={{ 
                whiteSpace: "nowrap",
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : "auto",
                transition: "opacity 0.2s, width 0.2s",
                overflow: "hidden"
              }}>
                {label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions Container */}
        <div style={{ marginTop: "auto" }}>
          
          {/* Map Widget Layout */}
          <div style={{ 
            marginBottom: isCollapsed ? "0px" : "1.5rem", 
            whiteSpace: "nowrap",
            opacity: isCollapsed ? 0 : 1,
            maxHeight: isCollapsed ? 0 : "220px",
            transition: "opacity 0.2s, max-height 0.3s, margin 0.2s",
            overflow: "hidden"
          }}>
            <p style={{
              fontSize: "0.7rem",
              color: "#99AAB0",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.6rem",
              paddingLeft: "0.25rem"
            }}>
              📍 Your Location
            </p>
            <div
              onClick={() => navigate("/map")}
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                height: "180px",
                width: "100%",
                cursor: "pointer"
              }}
            >
              {isLoaded && userLocation ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%", position: "absolute" }}
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
                <div style={{ width: "100%", height: "100%", background: "#F1F5F9" }} />
              )}
              <div style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                backgroundColor: "rgba(13, 23, 22, 0.85)",
                backdropFilter: "blur(4px)",
                borderRadius: "6px",
                padding: "3px 8px",
                fontSize: "0.65rem",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                zIndex: 2
              }}>
                <Maximize2 size={10} />
                Expand Map
              </div>
            </div>
          </div>

          {/* Permanent Logout Action Button */}
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: "#FFF1F2",
              color: "#F43F5E",
              border: "none",
              borderRadius: "12px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "center",
              gap: isCollapsed ? "0px" : "0.6rem",
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#FFE4E6"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#FFF1F2"}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            <span style={{ 
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
              transition: "opacity 0.2s, width 0.2s",
              overflow: "hidden"
            }}>
              Log out
            </span>
          </button>
          
        </div>
      </div>
    </aside>
  );
}