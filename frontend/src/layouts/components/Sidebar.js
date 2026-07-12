 import React, { useEffect, useState } from "react";
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
    <aside style={{
      width: isCollapsed ? "0px" : "290px",
      minWidth: isCollapsed ? "0px" : "290px",
      height: "100vh",
      background: "#ffffff",
      borderRight: isCollapsed ? "none" : "1px solid rgba(0, 0, 0, 0.06)",
      display: "flex",
      flexDirection: "column",
      padding: isCollapsed ? "2rem 0px" : "2rem 1.5rem",
      boxShadow: isCollapsed ? "none" : "4px 0 24px rgba(0, 0, 0, 0.01)",
      position: "sticky",
      top: 0,
      zIndex: 10,
      // Premium, elongated slider curve (0.5s duration)
      transition: "all 0.5s cubic-bezier(0.3, 1, 0.4, 1)", 
      fontFamily: "system-ui, sans-serif",
    }}>

      {/* Internal scroll wrapper to allow full-height scrolling when active */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        flex1: 1
      }}>

        {/* YatraVerse Branding Header */}
        <div style={{ 
          marginBottom: "2.5rem", 
          paddingLeft: "0.5rem",
          whiteSpace: "nowrap"
        }}>
          <div className="cinzel" style={{
            fontSize: "1.65rem",
            fontWeight: "800",
            letterSpacing: "0.08em",
            color: "#2B3E34",
            lineHeight: "1.2"
          }}>
            YATRAVERSE
          </div>
          <div style={{
            fontSize: "0.68rem",
            fontWeight: "700",
            letterSpacing: "0.18em",
            color: "#3d5a49",
            marginTop: "0.25rem"
          }}>
            AI TRAVEL COMPANION
          </div>
        </div>

        {/* Navigation Links Stack */}
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
                gap: "0.9rem",
                padding: "0.8rem",
                paddingLeft: isActive ? "0.75rem" : "1rem",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "0.92rem",
                fontWeight: isActive ? "600" : "500",
                color: isActive ? "#2B3E34" : "#5A6A61",
                backgroundColor: isActive ? "#E8EFEA" : "transparent",
                transition: "all 0.2s ease-in-out",
                borderLeft: isActive ? "4px solid #2B3E34" : "4px solid transparent",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.href.includes(window.location.pathname)) {
                  e.currentTarget.style.backgroundColor = "#F8FAFC";
                  e.currentTarget.style.color = "#2B3E34";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.href.includes(window.location.pathname)) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#5A6A61";
                }
              }}
            >
              <IconComponent size={18} strokeWidth={2.2} style={{ shrink: 0 }} />
              <span style={{ whiteSpace: "nowrap" }}>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Push Map and Logout to the exact bottom of the scroll track container */}
        <div style={{ marginTop: "auto" }}>
          
          {/* 📍 Live Map Frame Widget (Safely anchored back at the bottom) */}
          <div style={{ marginBottom: "1.5rem", whiteSpace: "nowrap" }}>
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
                cursor: "pointer"
              }}
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
                gap: "4px"
              }}>
                <Maximize2 size={10} />
                Expand Map
              </div>
            </div>
          </div>

          {/* Logout Action Trigger Button */}
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
              justifyContent: "center",
              gap: "0.6rem",
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#FFE4E6"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#FFF1F2"}
          >
            <LogOut size={16} style={{ shrink: 0 }} />
            <span>Log out</span>
          </button>
          
        </div>
      </div>
    </aside>
  );
}