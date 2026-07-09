// // // import React from "react";
// // // import Sidebar from "../components/Sidebar";

// // // function DashboardLayout({ children }) {
// // //   return (
// // //     <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

// // //       {/* Decorative ambient radial glow — bottom-left */}
// // //       <div style={{
// // //         position: "fixed",
// // //         bottom: "-120px",
// // //         left: "80px",
// // //         width: "500px",
// // //         height: "500px",
// // //         borderRadius: "50%",
// // //         background: "radial-gradient(circle, rgba(26,128,96,0.07) 0%, transparent 70%)",
// // //         pointerEvents: "none",
// // //         zIndex: 0,
// // //       }} />
// // //       {/* Top-right ambient glow */}
// // //       <div style={{
// // //         position: "fixed",
// // //         top: "-100px",
// // //         right: "-80px",
// // //         width: "400px",
// // //         height: "400px",
// // //         borderRadius: "50%",
// // //         background: "radial-gradient(circle, rgba(22,107,79,0.05) 0%, transparent 70%)",
// // //         pointerEvents: "none",
// // //         zIndex: 0,
// // //       }} />

// // //       <Sidebar />
// // //       <main style={{ flex: 1, padding: "3rem 4rem", overflowY: "auto", height: "100vh" }}>
// // //         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
// // //           {children}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default DashboardLayout;

// // // src/layouts/DashboardLayout.js
// // import React, { useState } from "react";
// // import Sidebar from "../components/Sidebar";
// // import { Menu, Globe } from "lucide-react";


// // function DashboardLayout({ children }) {
// //   const [isCollapsed, setIsCollapsed] = useState(false);

// //   return (
// //     <div style={{ 
// //       display: "flex", 
// //       minHeight: "100vh", 
// //       background: "#F8FAF9", 
// //       overflow: "hidden" 
// //     }}>

// //       {/* Decorative Ambient Background Radial Glows */}
// //       <div style={{
// //         position: "fixed",
// //         bottom: "-100px",
// //         left: "120px",
// //         width: "600px",
// //         height: "600px",
// //         borderRadius: "50%",
// //         background: "radial-gradient(circle, rgba(26,128,96,0.09) 0%, transparent 75%)",
// //         pointerEvents: "none",
// //         zIndex: 0,
// //       }} />
// //       <div style={{
// //         position: "fixed",
// //         top: "-80px",
// //         right: "-60px",
// //         width: "500px",
// //         height: "500px",
// //         borderRadius: "50%",
// //         background: "radial-gradient(circle, rgba(255,90,95,0.05) 0%, transparent 75%)",
// //         pointerEvents: "none",
// //         zIndex: 0,
// //       }} />

// //       {/* Pass structural state down into Sidebar */}
// //       <Sidebar isCollapsed={isCollapsed} />

// //       {/* Main Dynamic Workspace Area Layout Frame */}
// //       <div style={{ 
// //         flex: 1, 
// //         display: "flex", 
// //         flexDirection: "column",
// //         height: "100vh",
// //         overflow: "hidden"
// //       }}>
        
// //         {/* Top Sticky Persistent Navigation Bar Area */}
       
// // {/* Top Sticky Persistent Navigation Bar Area */}
// // {/* Top Sticky Persistent Navigation Bar Area */}
// // <header style={{
// //   height: "75px", // Slightly taller header for better breathing room
// //   background: "rgba(255, 255, 255, 0.8)",
// //   backdropFilter: "blur(12px)",
// //   borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "space-between",
// //   padding: "0 2.5rem",
// //   zIndex: 5,
// //   position: "relative"
// // }}>
// //   {/* Left Side: Hamburger Icon */}
// //   <button
// //     onClick={() => setIsCollapsed(!isCollapsed)}
// //     style={{
// //       background: "transparent",
// //       border: "none",
// //       cursor: "pointer",
// //       display: "flex",
// //       alignItems: "center",
// //       justifyContent: "center",
// //       padding: "8px",
// //       borderRadius: "8px",
// //       color: "#2B3E34",
// //       transition: "background 0.2s"
// //     }}
// //     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
// //     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
// //   >
// //     <Menu size={22} strokeWidth={2.2} />
// //   </button>

// //   {/* Right Side: Enhanced, Bigger & Shifted Forward Public Site Link */}
// //   <a 
// //     href="/landingPage" 
// //     style={{
// //       fontSize: "0.95rem", // Increased font size for a bigger look
// //       fontWeight: "700", // Thicker font weight to pull it forward visually
// //       color: "#2B3E34", // Darker army green base color for immediate prominence
// //       textDecoration: "none",
// //       display: "flex",
// //       alignItems: "center",
// //       gap: "8px", // More gap between icon and text
// //       transition: "all 0.2s ease",
// //       padding: "8px 16px", // Generous padding to expand the clickable button footprint
// //       borderRadius: "10px",
// //       backgroundColor: "rgba(232, 239, 234, 0.5)", // Soft visible backdrop tint by default
// //       border: "1px solid rgba(43, 62, 52, 0.1)", // Subtle outline structure
// //       marginRight: "0.5rem" // Adjust positioning balance on the far right edge
// //     }}
// //     onMouseEnter={(e) => {
// //       e.currentTarget.style.color = "#1E2D25";
// //       e.currentTarget.style.backgroundColor = "#E8EFEA"; // Solid elegant army green fill on hover
// //       e.currentTarget.style.transform = "translateY(-1px)"; // Interactive pop-up lift
// //       e.currentTarget.style.boxShadow = "0 4px 12px rgba(43, 62, 52, 0.05)";
// //     }}
// //     onMouseLeave={(e) => {
// //       e.currentTarget.style.color = "#2B3E34";
// //       e.currentTarget.style.backgroundColor = "rgba(232, 239, 234, 0.5)";
// //       e.currentTarget.style.transform = "translateY(0)";
// //       e.currentTarget.style.boxShadow = "none";
// //     }}
// //   >
// //     <Globe size={18} strokeWidth={2.2} /> {/* Bigger icon size */}
// //     <span>View Website</span>
// //   </a>
// // </header>
// //         {/* Scrollable Page Layout Children Viewport Node */}
// //         <main style={{ 
// //           flex: 1, 
// //           padding: "2.5rem 3.5rem", 
// //           overflowY: "auto",
// //           position: "relative",
// //           zIndex: 1
// //         }}>
// //           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
// //             {children}
// //           </div>
// //         </main>
// //       </div>

// //     </div>
// //   );
// // }

// // export default DashboardLayout;

// // src/layouts/DashboardLayout.js
// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { Menu, Globe } from "lucide-react";

// function DashboardLayout({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(true); // Default to closed/hidden for a clean view

//   return (
//     <div style={{ 
//       display: "flex", 
//       minHeight: "100vh", 
//       background: "#F8FAF9", 
//       overflow: "hidden" 
//     }}>

//       {/* Decorative Ambient Background Radial Glows */}
//       <div style={{
//         position: "fixed",
//         bottom: "-100px",
//         left: "120px",
//         width: "600px",
//         height: "600px",
//         borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(26,128,96,0.09) 0%, transparent 75%)",
//         pointerEvents: "none",
//         zIndex: 0,
//       }} />
//       <div style={{
//         position: "fixed",
//         top: "-80px",
//         right: "-60px",
//         width: "500px",
//         height: "500px",
//         borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(43,62,52,0.05) 0%, transparent 75%)",
//         pointerEvents: "none",
//         zIndex: 0,
//       }} />

//       {/* Sidebar component */}
//       <Sidebar isCollapsed={isCollapsed} />

//       {/* Main Content Area Container Panel */}
//       <div style={{ 
//         flex: 1, 
//         display: "flex", 
//         flexDirection: "column",
//         height: "100vh",
//         overflow: "hidden"
//       }}>
        
//         {/* Top Sticky Persistent Navigation Bar Area */}
//         <header style={{
//           height: "75px",
//           background: "rgba(255, 255, 255, 0.8)",
//           backdropFilter: "blur(12px)",
//           borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "0 2.5rem",
//           zIndex: 5,
//           position: "relative"
//         }}>
//           {/* Left Side: Hamburger Trigger Button */}
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             style={{
//               background: "transparent",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "8px",
//               borderRadius: "8px",
//               color: "#2B3E34",
//               transition: "background 0.2s"
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
//             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
//           >
//             <Menu size={22} strokeWidth={2.2} />
//           </button>

//           {/* Right Side: Public Site Link */}
//           <a 
//             href="/landingPage" 
//             style={{
//               fontSize: "0.95rem",
//               fontWeight: "700",
//               color: "#2B3E34",
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               transition: "all 0.2s ease",
//               padding: "8px 16px",
//               borderRadius: "10px",
//               backgroundColor: "rgba(232, 239, 234, 0.5)",
//               border: "1px solid rgba(43, 62, 52, 0.1)",
//               marginRight: "0.5rem"
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.color = "#1E2D25";
//               e.currentTarget.style.backgroundColor = "#E8EFEA";
//               e.currentTarget.style.transform = "translateY(-1px)";
//               e.currentTarget.style.boxShadow = "0 4px 12px rgba(43, 62, 52, 0.05)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.color = "#2B3E34";
//               e.currentTarget.style.backgroundColor = "rgba(232, 239, 234, 0.5)";
//               e.currentTarget.style.transform = "translateY(0)";
//               e.currentTarget.style.boxShadow = "none";
//             }}
//           >
//             <Globe size={18} strokeWidth={2.2} />
//             <span>View Website</span>
//           </a>
//         </header>

//         {/* Workspace Main Panel */}
//         <main style={{ 
//           flex: 1, 
//           padding: "2.5rem 3.5rem", 
//           overflowY: "auto",
//           position: "relative",
//           zIndex: 1
//         }}>
//           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//             {children}
//           </div>
//         </main>
//       </div>

//     </div>
//   );
// }

// export default DashboardLayout;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { Plus, Trash2, Crown, Users, Map, ArrowRight } from "lucide-react";

const TRIP_GRADIENTS = [
  "from-emerald-500/20 to-teal-500/10",
  "from-blue-500/20 to-indigo-500/10",
  "from-orange-500/20 to-amber-500/10",
  "from-purple-500/20 to-pink-500/10",
  "from-rose-500/20 to-red-500/10",
  "from-cyan-500/20 to-sky-500/10",
];

const TRIP_ICONS = ["🏔️", "🌊", "🏕️", "🗺️", "✈️", "🚂", "🌿", "🏜️", "⛵", "🦏"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }

    Promise.all([API.get("/auth/me"), API.get("/trips/my")])
      .then(([userRes, tripsRes]) => {
        setUser(userRes.data);
        setTrips(tripsRes.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleDelete = async (e, tripId, tripName) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${tripName}"? This can't be undone.`)) return;
    try {
      await API.delete(`/trips/${tripId}`);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete trip");
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const adminTrips = trips.filter((t) => t.role === "admin");
  const memberTrips = trips.filter((t) => t.role === "member");

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (loading) return (
    <DashboardLayout>
      <p className="text-[var(--text-dim)]">Loading...</p>
    </DashboardLayout>
  );

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="fade-up max-w-5xl mx-auto">

        {/* ── HERO GREETING ── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs text-[var(--text-dim)] uppercase tracking-widest mb-1">
              {greeting} 🙏
            </p>
            <h1 className="cinzel text-4xl text-[var(--accent)] mb-1">
              {user.name.split(" ")[0]}'s Dashboard
            </h1>
            <p className="text-sm text-[var(--text-dim)]">
              Your journey at a glance
            </p>
          </div>

          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center cinzel text-xl font-bold text-white shrink-0">
            {initials}
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Map size={20} />,   label: "Total Trips",  value: trips.length,        color: "text-[var(--accent)]" },
            { icon: <Crown size={20} />, label: "Organised",    value: adminTrips.length,   color: "text-yellow-500" },
            { icon: <Users size={20} />, label: "Joined",       value: memberTrips.length,  color: "text-blue-400" },
          ].map((stat, i) => (
            <div key={i} className="card p-5 flex items-center gap-4">
              <div className={`${stat.color} shrink-0`}>{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">{stat.value}</p>
                <p className="text-xs text-[var(--text-dim)] uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TRIPS SECTION ── */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="cinzel text-xl text-[var(--text)]">Your Trips</h2>
          <button
           onClick={() => navigate("/create-trip")}
            className="btn btn-primary px-5 py-2.5 text-sm"
          >
            + New Trip
          </button>
        </div>
            

        {trips.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-5xl mb-4">🗺️</p>
            <p className="cinzel text-xl text-[var(--text)] mb-2">No trips yet</p>
            <p className="text-sm text-[var(--text-dim)] mb-6">
              Start planning your first journey with your travel companions.
            </p>
            <button
              onClick={() => navigate("/create-trip")}
              className="btn btn-primary px-6 py-3"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {trips.map((trip, i) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/planner/${trip.id}`)}
                className={`relative rounded-2xl border border-[var(--border)] cursor-pointer group
                  overflow-hidden transition-all duration-200 hover:border-[var(--accent)]/50
                  hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-br ${TRIP_GRADIENTS[i % TRIP_GRADIENTS.length]}`}
              >
                <div className="p-5">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-2xl">
                      {TRIP_ICONS[i % TRIP_ICONS.length]}
                    </div>
                    <div className="flex items-center gap-2">
                      {trip.role === "admin" ? (
                        <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[var(--accent)] text-white font-medium">
                          <Crown size={10} /> Admin
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--border)] text-[var(--text-dim)]">
                          Member
                        </span>
                      )}
                      {trip.role === "admin" && (
                        <button
                          onClick={(e) => handleDelete(e, trip.id, trip.name)}
                          className="w-7 h-7 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-dim)] hover:text-red-400 hover:border-red-400/50 transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Trip name */}
                  <h3 className="cinzel text-lg font-semibold text-[var(--text)] leading-tight mb-1 truncate">
                    {trip.name}
                  </h3>
                  <p className="text-xs text-[var(--text-dim)] mb-4">
                    {trip.role === "admin" ? "You organised this" : "You joined this trip"}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-dim)]">
                      Open planner
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                      <ArrowRight size={13} className="text-[var(--text-dim)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Create new trip card */}
            <div
              onClick={() => navigate("/create-trip")}
              className="rounded-2xl border-2 border-dashed border-[var(--border)] cursor-pointer
                flex flex-col items-center justify-center p-8 gap-3
                hover:border-[var(--accent)]/50 transition-all duration-200 group min-h-[180px]"
            >
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)]/50 transition-colors">
                <Plus size={20} className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              <p className="text-sm text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors">
                New Trip
              </p>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}