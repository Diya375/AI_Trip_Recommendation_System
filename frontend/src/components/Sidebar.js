// // // import React, { useEffect, useState } from "react";
// // // import { NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth } from "../context/AuthContext";
// // // import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// // // import { Expand } from "lucide-react";

// // // const navItems = [
// // //   { label: "Dashboard",    path: "/dashboard" },
// // //   { label: "Home",         path: "/home" },
// // //    {label: "View website",      path: "/landingPage" },
  
// // //   { label: "Planner",      path: "/planner" },
// // // { label: "Explore",      path: "/explore" },
// // //   { label: "Expenses",     path: "/expenses" },
// // //   { label: "AI Assistant", path: "/assistant" },
 
// // //   { label: "Profile",      path: "/profile" }
  
// // // ];

// // // const LIBRARIES = ["places"];

// // // const tealMapStyle = [
// // //   { elementType: "geometry", stylers: [{ color: "#060f0e" }] },
// // //   { elementType: "labels.text.stroke", stylers: [{ color: "#060f0e" }] },
// // //   { elementType: "labels.text.fill", stylers: [{ color: "#3d6b65" }] },
// // //   { featureType: "road", elementType: "geometry", stylers: [{ color: "#0a1f1c" }] },
// // //   { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#071c19" }] },
// // //   { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7aa8a3" }] },
// // //   { featureType: "water", elementType: "geometry", stylers: [{ color: "#041413" }] },
// // //   { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#14b8a6" }] },
// // //   { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#0a2320" }] },
// // //   { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0d2924" }] },
// // //   { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
// // //   { featureType: "transit", stylers: [{ visibility: "off" }] },
// // // ];

// // // function Sidebar() {
// // //   const { logout } = useAuth();
// // //   const navigate = useNavigate();
// // //   const [userLocation, setUserLocation] = useState(null);

// // //   const { isLoaded } = useJsApiLoader({
// // //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
// // //     libraries: LIBRARIES,
// // //   });

// // //   useEffect(() => {
// // //     if (navigator.geolocation) {
// // //       navigator.geolocation.getCurrentPosition(
// // //         (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
// // //         () => setUserLocation({ lat: 28.2096, lng: 83.9856 })
// // //       );
// // //     }
// // //   }, []);

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/login");
// // //   };

// // //   return (
// // //     <aside className="sidebar flex flex-col h-screen overflow-y-auto">

// // //       {/* Logo */}
// // //       <div>
// // //         <div className="sidebar-logo">YatraVerse</div>
// // //         <div className="sidebar-tagline">AI TRAVEL COMPANION</div>
// // //       </div>

// // //       <hr className="divider" />

// // //       {/* Nav */}
// // //       <nav className="flex-1 flex flex-col gap-[2px]">
// // //         {navItems.map(({ label, path }) => (
// // //           <NavLink
// // //             key={path}
// // //             to={path}
// // //             className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
// // //           >
// // //             {label}
// // //           </NavLink>
// // //         ))}
// // //       </nav>

// // //       <hr className="divider" />

// // //       {/* Map widget */}
// // //       <div className="pb-4">
// // //         <p className="text-[0.7rem] text-[var(--text-dim)] uppercase tracking-widest mb-2">
// // //           📍 Your Location
// // //         </p>

// // //         <div
// // //           onClick={() => navigate("/map")}
// // //           className="relative rounded-xl overflow-hidden border border-[var(--border)] h-40 cursor-pointer group"
// // //         >
// // //           {isLoaded && userLocation ? (
// // //             <GoogleMap
// // //               mapContainerStyle={{ width: "100%", height: "100%" }}
// // //               center={userLocation}
// // //               zoom={13}
// // //               options={{
// // //                 disableDefaultUI: true,
// // //                 zoomControl: false,
// // //                 scrollwheel: false,
// // //                 gestureHandling: "none",
// // //                 styles: tealMapStyle,
// // //               }}
// // //             >
// // //               <Marker position={userLocation} />
// // //             </GoogleMap>
// // //           ) : (
// // //             <div className="w-full h-full bg-[var(--bg)] flex items-center justify-center text-xs text-[var(--text-dim)]">
// // //               Loading map...
// // //             </div>
// // //           )}

// // //           {/* Hover overlay */}
// // //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 pointer-events-none rounded-xl" />

// // //           {/* Expand hint */}
// // //           <div className="absolute bottom-2 right-2 bg-black/60 rounded-md px-2 py-[3px] text-[0.7rem] text-white flex items-center gap-1 pointer-events-none">
// // //             <Expand size={11} />
// // //             Full map
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <hr className="divider" />

// // //       <button
// // //         className="btn btn-danger w-full text-center"
// // //         onClick={handleLogout}
// // //       >
// // //         Logout
// // //       </button>
// // //     </aside>
// // //   );
// // // }

// // // export default Sidebar;

// // // // import React, { useEffect, useState } from "react";
// // // // import { NavLink, useNavigate } from "react-router-dom";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// // // // import { Expand, Sun, Moon } from "lucide-react"; // Imported clean icons from lucide-react

// // // // const navItems = [
// // // //   { label: "Dashboard",    path: "/dashboard" },
// // // //   { label: "Home",         path: "/home" },
// // // //   { label: "Explore",      path: "/explore" },
// // // //   { label: "Planner",      path: "/planner" },
// // // //   { label: "Expenses",     path: "/expenses" },
// // // //   { label: "AI Assistant", path: "/assistant" },
// // // //   { label: "Profile",      path: "/profile" },
// // // //  { label: "Main Page",      path: "/landingpage" }
// // // // ];

// // // // const LIBRARIES = ["places"];

// // // // const darkMapStyle = [
// // // //   { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
// // // //   { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
// // // //   { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
// // // //   { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c54" }] },
// // // //   { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
// // // //   { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
// // // //   { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1b2a" }] },
// // // //   { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
// // // //   { featureType: "poi", stylers: [{ visibility: "off" }] },
// // // //   { featureType: "transit", stylers: [{ visibility: "off" }] },
// // // // ];

// // // // function Sidebar() {
// // // //   const { logout } = useAuth();
// // // //   const navigate = useNavigate();
// // // //   const [userLocation, setUserLocation] = useState(null);

// // // //   // 🌓 1. INIT STATE & READING INITIAL BROWSER PREFERENCE
// // // //   const [isDarkMode, setIsDarkMode] = useState(() => {
// // // //     return document.documentElement.classList.contains("dark");
// // // //   });

// // // //   // 🌓 2. TOGGLE ACTION THAT FLIPS THE GLOBAL HTML CLASS
// // // //   const toggleTheme = () => {
// // // //     const nextMode = !isDarkMode;
// // // //     setIsDarkMode(nextMode);
// // // //     if (nextMode) {
// // // //       document.documentElement.classList.add("dark");
// // // //     } else {
// // // //       document.documentElement.classList.remove("dark");
// // // //     }
// // // //   };

// // // //   const { isLoaded } = useJsApiLoader({
// // // //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
// // // //     libraries: LIBRARIES,
// // // //   });

// // // //   useEffect(() => {
// // // //     if (navigator.geolocation) {
// // // //       navigator.geolocation.getCurrentPosition(
// // // //         (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
// // // //         () => setUserLocation({ lat: 28.2096, lng: 83.9856 })
// // // //       );
// // // //     }
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/login");
// // // //   };

// // // //   return (
// // // //     <aside className="sidebar flex flex-col h-screen overflow-y-auto">

// // // //       {/* Header Container grouping Logo + Toggle */}
// // // //       <div className="flex items-center justify-between pr-2">
// // // //         <div>
// // // //           <div className="sidebar-logo">
            
// // // //             YatraVerse</div>
// // // //           <div className="sidebar-tagline">AI TRAVEL COMPANION</div>
// // // //         </div>

// // // //         {/* 🌓 3. EYE-CATCHING THEME TOGGLE SWITCH BUTTON */}
// // // //         <button
// // // //           onClick={toggleTheme}
// // // //           title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
// // // //           style={{
// // // //             background: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
// // // //             border: `1px solid ${isDarkMode ? "rgba(201, 169, 110, 0.3)" : "rgba(0, 0, 0, 0.08)"}`,
// // // //             borderRadius: "50%",
// // // //             width: "36px",
// // // //             height: "36px",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //             cursor: "pointer",
// // // //             transition: "all 0.25s ease"
// // // //           }}
// // // //           onMouseEnter={(e) => {
// // // //             e.currentTarget.style.transform = "scale(1.05)";
// // // //           }}
// // // //           onMouseLeave={(e) => {
// // // //             e.currentTarget.style.transform = "scale(1)";
// // // //           }}
// // // //         >
// // // //           {isDarkMode ? (
// // // //             <Sun size={16} color="var(--accent, #c9a96e)" fill="var(--accent, #c9a96e)" />
// // // //           ) : (
// // // //             <Moon size={16} color="#131916" fill="#131916" />
// // // //           )}
// // // //         </button>
// // // //       </div>

// // // //       <hr className="divider" />

// // // //       {/* Nav */}
// // // //       <nav className="flex-1 flex flex-col gap-[2px]">
// // // //         {navItems.map(({ label, path }) => (
// // // //           <NavLink
// // // //             key={path}
// // // //             to={path}
// // // //             className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
// // // //           >
// // // //             {label}
// // // //           </NavLink>
// // // //         ))}
// // // //       </nav>

// // // //       <hr className="divider" />

// // // //       {/* Map widget */}
// // // //       <div className="pb-4">
// // // //         <p className="text-[0.7rem] text-[var(--text-dim)] uppercase tracking-widest mb-2">
// // // //           📍 Your Location
// // // //         </p>

// // // //         <div
// // // //           onClick={() => navigate("/map")}
// // // //           className="relative rounded-xl overflow-hidden border border-[var(--border)] h-40 cursor-pointer group"
// // // //         >
// // // //           {isLoaded && userLocation ? (
// // // //             <GoogleMap
// // // //               mapContainerStyle={{ width: "100%", height: "100%" }}
// // // //               center={userLocation}
// // // //               zoom={13}
// // // //               options={{
// // // //                 disableDefaultUI: true,
// // // //                 zoomControl: false,
// // // //                 scrollwheel: false,
// // // //                 gestureHandling: "none",
// // // //                 styles: darkMapStyle,
// // // //               }}
// // // //             >
// // // //               <Marker position={userLocation} />
// // // //             </GoogleMap>
// // // //           ) : (
// // // //             <div className="w-full h-full bg-[var(--bg)] flex items-center justify-center text-xs text-[var(--text-dim)]">
// // // //               Loading map...
// // // //             </div>
// // // //           )}

// // // //           {/* Hover overlay */}
// // // //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 pointer-events-none rounded-xl" />

// // // //           {/* Expand hint */}
// // // //           <div className="absolute bottom-2 right-2 bg-black/60 rounded-md px-2 py-[3px] text-[0.7rem] text-white flex items-center gap-1 pointer-events-none">
// // // //             <Expand size={11} />
// // // //             Full map
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <hr className="divider" />

// // // //       <button
// // // //         className="btn btn-danger w-full text-center"
// // // //         onClick={handleLogout}
// // // //       >
// // // //         Logout
// // // //       </button>
// // // //     </aside>
// // // //   );
// // // // }

// // // // export default Sidebar;

// // // src/components/Sidebar.js
// // import React, { useEffect, useState } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// // import { 
// //   LayoutDashboard, 
// //   Home, 
// //   Globe, 
// //   Compass, 
// //   CalendarDays, 
// //   Receipt, 
// //   Bot, 
// //   User, 
// //   LogOut, 
// //   Maximize2 
// // } from "lucide-react";

// // const navItems = [
// //   { label: "Dashboard",    path: "/dashboard",   icon: LayoutDashboard },
// //   { label: "Home",         path: "/home",        icon: Home },
 
// //   { label: "Planner",      path: "/planner",     icon: CalendarDays },
// //   { label: "Explore",      path: "/explore",     icon: Compass },

// //   { label: "Expenses",     path: "/expenses",    icon: Receipt },
// //   { label: "AI Assistant", path: "/assistant",   icon: Bot },
// //   { label: "Profile",      path: "/profile",     icon: User }
// // ];

// // const LIBRARIES = ["places"];

// // const tealMapStyle = [
// //   { elementType: "geometry", stylers: [{ color: "#0d1716" }] },
// //   { elementType: "labels.text.stroke", stylers: [{ color: "#0d1716" }] },
// //   { elementType: "labels.text.fill", stylers: [{ color: "#4d7c75" }] },
// //   { featureType: "road", elementType: "geometry", stylers: [{ color: "#122a26" }] },
// //   { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0e2420" }] },
// //   { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8bb8b3" }] },
// //   { featureType: "water", elementType: "geometry", stylers: [{ color: "#061a18" }] },
// //   { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#14b8a6" }] },
// //   { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#0f2e2a" }] },
// //   { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#113530" }] },
// //   { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
// //   { featureType: "transit", stylers: [{ visibility: "off" }] },
// // ];

// // export default function Sidebar({ isCollapsed }) {
// //   const { logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [userLocation, setUserLocation] = useState(null);

// //   const { isLoaded } = useJsApiLoader({
// //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
// //     libraries: LIBRARIES,
// //   });

// //   useEffect(() => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
// //         () => setUserLocation({ lat: 28.2096, lng: 83.9856 })
// //       );
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //   };

// //   return (
// //     <aside style={{
// //       width: isCollapsed ? "80px" : "290px",
// //       minWidth: isCollapsed ? "80px" : "290px",
// //       height: "100vh",
// //       background: "#ffffff",
// //       borderRight: "1px solid rgba(0, 0, 0, 0.06)",
// //       display: "flex",
// //       flexDirection: "column",
// //       padding: isCollapsed ? "2rem 0.75rem" : "2rem 1.5rem",
// //       boxShadow: "4px 0 24px rgba(0, 0, 0, 0.01)",
// //       position: "sticky",
// //       top: 0,
// //       zIndex: 10,
// //       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
// //       fontFamily: "system-ui, sans-serif",
// //       overflow: "hidden"
// //     }}>

// //       {/* YatraVerse Identity Branding Frame */}
// //       <div style={{ 
// //         marginBottom: "2.5rem", 
// //         paddingLeft: isCollapsed ? "0" : "0.5rem",
// //         textAlign: isCollapsed ? "center" : "left",
// //         transition: "all 0.3s"
// //       }}>
// //         <div className="cinzel" style={{
// //           fontSize: isCollapsed ? "1.1rem" : "1.65rem",
// //           fontWeight: "800",
// //           letterSpacing: "0.08em",
// //           color: "#2B3E34",
// //           lineHeight: "1.2"
// //         }}>
// //           {isCollapsed ? "YV" : "YATRAVERSE"}
// //         </div>
// //         {!isCollapsed && (
// //           <div style={{
// //             fontSize: "0.68rem",
// //             fontWeight: "700",
// //             letterSpacing: "0.18em",
// //             color: "#3d5a49", // Matched branding line to subtle dark army green accent
// //             marginTop: "0.25rem",
// //             whiteSpace: "nowrap"
// //           }}>
// //             AI TRAVEL COMPANION
// //           </div>
// //         )}
// //       </div>

// //       {/* Navigation Stack Links */}
// //       <nav style={{ 
// //         flex: 1, 
// //         display: "flex", 
// //         flexDirection: "column", 
// //         gap: "0.35rem",
// //         overflowY: "auto",
// //         overflowX: "hidden"
// //       }}>
// //         {navItems.map(({ label, path, icon: IconComponent }) => (
// //           <NavLink
// //             key={path}
// //             to={path}
// //             title={isCollapsed ? label : ""}
// //             style={({ isActive }) => ({
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: isCollapsed ? "center" : "flex-start",
// //               gap: isCollapsed ? "0" : "0.9rem",
// //               padding: "0.8rem",
// //               paddingLeft: isCollapsed ? "0.8rem" : (isActive ? "0.75rem" : "1rem"),
// //               borderRadius: "12px",
// //               textDecoration: "none",
// //               fontSize: "0.92rem",
// //               fontWeight: isActive ? "600" : "500",
// //               color: isActive ? "#2B3E34" : "#5A6A61", // Army green highlighted text active color
// //               backgroundColor: isActive ? "#E8EFEA" : "transparent", // Light elegant timber/army green background tint
// //               transition: "all 0.2s ease-in-out",
// //               borderLeft: !isCollapsed && isActive ? "4px solid #2B3E34" : "4px solid transparent",
// //             })}
// //             onMouseEnter={(e) => {
// //               if (!e.currentTarget.href.includes(window.location.pathname)) {
// //                 e.currentTarget.style.backgroundColor = "#F8FAFC";
// //                 e.currentTarget.style.color = "#2B3E34";
// //               }
// //             }}
// //             onMouseLeave={(e) => {
// //               if (!e.currentTarget.href.includes(window.location.pathname)) {
// //                 e.currentTarget.style.backgroundColor = "transparent";
// //                 e.currentTarget.style.color = "#5A6A61";
// //               }
// //             }}
// //           >
// //             <IconComponent size={18} strokeWidth={2.2} style={{ shrink: 0 }} />
// //             {!isCollapsed && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
// //           </NavLink>
// //         ))}
// //       </nav>

// //       {/* Live Map Frame Widget */}
// //       <div style={{ 
// //         marginTop: "1.5rem", 
// //         marginBottom: "1.5rem",
// //         opacity: isCollapsed ? 0 : 1,
// //         visibility: isCollapsed ? "hidden" : "visible",
// //         height: isCollapsed ? "0px" : "auto",
// //         transition: "all 0.2s ease"
// //       }}>
// //         <p style={{
// //           fontSize: "0.7rem",
// //           color: "#99AAB0",
// //           fontWeight: "700",
// //           textTransform: "uppercase",
// //           letterSpacing: "0.12em",
// //           marginBottom: "0.6rem",
// //           paddingLeft: "0.25rem"
// //         }}>
// //           📍 Your Location
// //         </p>
// //         <div
// //           onClick={() => navigate("/map")}
// //           style={{
// //             position: "relative",
// //             borderRadius: "16px",
// //             overflow: "hidden",
// //             border: "1px solid rgba(0, 0, 0, 0.08)",
// //             height: "150px",
// //             cursor: "pointer"
// //           }}
// //         >
// //           {isLoaded && userLocation ? (
// //             <GoogleMap
// //               mapContainerStyle={{ width: "100%", height: "100%" }}
// //               center={userLocation}
// //               zoom={13}
// //               options={{
// //                 disableDefaultUI: true,
// //                 zoomControl: false,
// //                 scrollwheel: false,
// //                 gestureHandling: "none",
// //                 styles: tealMapStyle,
// //               }}
// //             >
// //               <Marker position={userLocation} />
// //             </GoogleMap>
// //           ) : (
// //             <div style={{ width: "100%", height: "100%", background: "#F1F5F9" }} />
// //           )}
// //           <div style={{
// //             position: "absolute",
// //             bottom: "8px",
// //             right: "8px",
// //             backgroundColor: "rgba(13, 23, 22, 0.85)",
// //             backdropFilter: "blur(4px)",
// //             borderRadius: "6px",
// //             padding: "3px 8px",
// //             fontSize: "0.65rem",
// //             color: "#ffffff",
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "4px"
// //           }}>
// //             <Maximize2 size={10} />
// //             Expand Map
// //           </div>
// //         </div>
// //       </div>

// //       {/* Updated Logout Action Control Button ("Log out") */}
// //       <button
// //         onClick={handleLogout}
// //         title={isCollapsed ? "Log out" : ""}
// //         style={{
// //           width: "100%",
// //           padding: "0.75rem 1rem",
// //           background: "#FFF1F2",
// //           color: "#F43F5E",
// //           border: "none",
// //           borderRadius: "12px",
// //           fontSize: "0.9rem",
// //           fontWeight: "600",
// //           cursor: "pointer",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           gap: isCollapsed ? "0" : "0.6rem",
// //           transition: "all 0.2s"
// //         }}
// //         onMouseEnter={(e) => e.currentTarget.style.background = "#FFE4E6"}
// //         onMouseLeave={(e) => e.currentTarget.style.background = "#FFF1F2"}
// //       >
// //         <LogOut size={16} style={{ shrink: 0 }} />
// //         {!isCollapsed && <span style={{ whiteSpace: "nowrap" }}>Log out</span>}
// //       </button>

// //     </aside>
// //   );
// // }

// // src/components/Sidebar.js
// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import { 
//   LayoutDashboard, 
//   Home, 
//   Compass, 
//   CalendarDays, 
//   Receipt, 
//   Bot, 
//   User, 
//   LogOut, 
//   Maximize2 
// } from "lucide-react";

// const navItems = [
//   { label: "Dashboard",    path: "/dashboard",   icon: LayoutDashboard },
//   { label: "Home",         path: "/home",        icon: Home },
//   { label: "Explore",      path: "/explore",     icon: Compass },
//   { label: "Planner",      path: "/planner",     icon: CalendarDays },
//   { label: "Expenses",     path: "/expenses",    icon: Receipt },
//   { label: "AI Assistant", path: "/assistant",   icon: Bot },
//   { label: "Profile",      path: "/profile",     icon: User }
// ];

// const LIBRARIES = ["places"];

// const tealMapStyle = [
//   { elementType: "geometry", stylers: [{ color: "#0d1716" }] },
//   { elementType: "labels.text.stroke", stylers: [{ color: "#0d1716" }] },
//   { elementType: "labels.text.fill", stylers: [{ color: "#4d7c75" }] },
//   { featureType: "road", elementType: "geometry", stylers: [{ color: "#122a26" }] },
//   { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0e2420" }] },
//   { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8bb8b3" }] },
//   { featureType: "water", elementType: "geometry", stylers: [{ color: "#061a18" }] },
//   { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#14b8a6" }] },
//   { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#0f2e2a" }] },
//   { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#113530" }] },
//   { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
//   { featureType: "transit", stylers: [{ visibility: "off" }] },
// ];

// export default function Sidebar({ isCollapsed }) {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [userLocation, setUserLocation] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: LIBRARIES,
//   });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
//         () => setUserLocation({ lat: 28.2096, lng: 83.9856 })
//       );
//     }
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <aside style={{
//       width: isCollapsed ? "0px" : "290px",
//       minWidth: isCollapsed ? "0px" : "290px",
//       height: "100vh",
//       background: "#ffffff",
//       borderRight: isCollapsed ? "none" : "1px solid rgba(0, 0, 0, 0.06)",
//       display: "flex",
//       flexDirection: "column",
//       padding: isCollapsed ? "2rem 0px" : "2rem 1.5rem", // Closes off margins cleanly
//       boxShadow: isCollapsed ? "none" : "4px 0 24px rgba(0, 0, 0, 0.01)",
//       position: "sticky",
//       top: 0,
//       zIndex: 10,
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       fontFamily: "system-ui, sans-serif",
//       overflow: "hidden"
//     }}>

//       {/* YatraVerse Identity Branding Frame */}
//       <div style={{ 
//         marginBottom: "2.5rem", 
//         paddingLeft: "0.5rem",
//         transition: "all 0.3s",
//         whiteSpace: "nowrap"
//       }}>
//         <div className="cinzel" style={{
//           fontSize: "1.65rem",
//           fontWeight: "800",
//           letterSpacing: "0.08em",
//           color: "#2B3E34",
//           lineHeight: "1.2"
//         }}>
//           YATRAVERSE
//         </div>
//         <div style={{
//           fontSize: "0.68rem",
//           fontWeight: "700",
//           letterSpacing: "0.18em",
//           color: "#3d5a49",
//           marginTop: "0.25rem"
//         }}>
//           AI TRAVEL COMPANION
//         </div>
//       </div>

//       {/* Navigation Stack Links */}
//       <nav style={{ 
//         flex: 1, 
//         display: "flex", 
//         flexDirection: "column", 
//         gap: "0.35rem",
//         overflowY: "auto",
//         overflowX: "hidden"
//       }}>
//         {navItems.map(({ label, path, icon: IconComponent }) => (
//           <NavLink
//             key={path}
//             to={path}
//             style={({ isActive }) => ({
//               display: "flex",
//               alignItems: "center",
//               gap: "0.9rem",
//               padding: "0.8rem",
//               paddingLeft: isActive ? "0.75rem" : "1rem",
//               borderRadius: "12px",
//               textDecoration: "none",
//               fontSize: "0.92rem",
//               fontWeight: isActive ? "600" : "500",
//               color: isActive ? "#2B3E34" : "#5A6A61",
//               backgroundColor: isActive ? "#E8EFEA" : "transparent",
//               transition: "all 0.2s ease-in-out",
//               borderLeft: isActive ? "4px solid #2B3E34" : "4px solid transparent",
//             })}
//             onMouseEnter={(e) => {
//               if (!e.currentTarget.href.includes(window.location.pathname)) {
//                 e.currentTarget.style.backgroundColor = "#F8FAFC";
//                 e.currentTarget.style.color = "#2B3E34";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!e.currentTarget.href.includes(window.location.pathname)) {
//                 e.currentTarget.style.backgroundColor = "transparent";
//                 e.currentTarget.style.color = "#5A6A61";
//               }
//             }}
//           >
//             <IconComponent size={18} strokeWidth={2.2} style={{ shrink: 0 }} />
//             <span style={{ whiteSpace: "nowrap" }}>{label}</span>
//           </NavLink>
//         ))}
//       </nav>

//       {/* Live Map Frame Widget */}
//       <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem", whiteSpace: "nowrap" }}>
//         <p style={{
//           fontSize: "0.7rem",
//           color: "#99AAB0",
//           fontWeight: "700",
//           textTransform: "uppercase",
//           letterSpacing: "0.12em",
//           marginBottom: "0.6rem",
//           paddingLeft: "0.25rem"
//         }}>
//           📍 Your Location
//         </p>
//         <div
//           onClick={() => navigate("/map")}
//           style={{
//             position: "relative",
//             borderRadius: "16px",
//             overflow: "hidden",
//             border: "1px solid rgba(0, 0, 0, 0.08)",
//             height: "180px",
//             cursor: "pointer"
//           }}
//         >
//           {isLoaded && userLocation ? (
//             <GoogleMap
//               mapContainerStyle={{ width: "100%", height: "100%" }}
//               center={userLocation}
//               zoom={13}
//               options={{
//                 disableDefaultUI: true,
//                 zoomControl: false,
//                 scrollwheel: false,
//                 gestureHandling: "none",
//                 styles: tealMapStyle,
//               }}
//             >
//               <Marker position={userLocation} />
//             </GoogleMap>
//           ) : (
//             <div style={{ width: "100%", height: "100%", background: "#F1F5F9" }} />
//           )}
//           <div style={{
//             position: "absolute",
//             bottom: "8px",
//             right: "8px",
//             backgroundColor: "rgba(13, 23, 22, 0.85)",
//             backdropFilter: "blur(4px)",
//             borderRadius: "6px",
//             padding: "3px 8px",
//             fontSize: "0.65rem",
//             color: "#ffffff",
//             display: "flex",
//             alignItems: "center",
//             gap: "4px"
//           }}>
//             <Maximize2 size={10} />
//             Expand Map
//           </div>
//         </div>
//       </div>

//       {/* Logout Trigger Action Control */}
//       <button
//         onClick={handleLogout}
//         style={{
//           width: "100%",
//           padding: "0.75rem 1rem",
//           background: "#FFF1F2",
//           color: "#F43F5E",
//           border: "none",
//           borderRadius: "12px",
//           fontSize: "0.9rem",
//           fontWeight: "600",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "0.6rem",
//           transition: "all 0.2s",
//           whiteSpace: "nowrap"
//         }}
//         onMouseEnter={(e) => e.currentTarget.style.background = "#FFE4E6"}
//         onMouseLeave={(e) => e.currentTarget.style.background = "#FFF1F2"}
//       >
//         <LogOut size={16} style={{ shrink: 0 }} />
//         <span>Log out</span>
//       </button>

//     </aside>
//   );
// }

// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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