 // // import React from "react";
// // import Sidebar from "../components/Sidebar";

// // function DashboardLayout({ children }) {
// //   return (
// //     <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

// //       {/* Decorative ambient radial glow — bottom-left */}
// //       <div style={{
// //         position: "fixed",
// //         bottom: "-120px",
// //         left: "80px",
// //         width: "500px",
// //         height: "500px",
// //         borderRadius: "50%",
// //         background: "radial-gradient(circle, rgba(26,128,96,0.07) 0%, transparent 70%)",
// //         pointerEvents: "none",
// //         zIndex: 0,
// //       }} />
// //       {/* Top-right ambient glow */}
// //       <div style={{
// //         position: "fixed",
// //         top: "-100px",
// //         right: "-80px",
// //         width: "400px",
// //         height: "400px",
// //         borderRadius: "50%",
// //         background: "radial-gradient(circle, rgba(22,107,79,0.05) 0%, transparent 70%)",
// //         pointerEvents: "none",
// //         zIndex: 0,
// //       }} />

// //       <Sidebar />
// //       <main style={{ flex: 1, padding: "3rem 4rem", overflowY: "auto", height: "100vh" }}>
// //         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
// //           {children}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default DashboardLayout;

// // src/layouts/DashboardLayout.js
// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { Menu, Globe } from "lucide-react";


// function DashboardLayout({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);

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
//         background: "radial-gradient(circle, rgba(255,90,95,0.05) 0%, transparent 75%)",
//         pointerEvents: "none",
//         zIndex: 0,
//       }} />

//       {/* Pass structural state down into Sidebar */}
//       <Sidebar isCollapsed={isCollapsed} />

//       {/* Main Dynamic Workspace Area Layout Frame */}
//       <div style={{ 
//         flex: 1, 
//         display: "flex", 
//         flexDirection: "column",
//         height: "100vh",
//         overflow: "hidden"
//       }}>
        
//         {/* Top Sticky Persistent Navigation Bar Area */}
       
// {/* Top Sticky Persistent Navigation Bar Area */}
// {/* Top Sticky Persistent Navigation Bar Area */}
// <header style={{
//   height: "75px", // Slightly taller header for better breathing room
//   background: "rgba(255, 255, 255, 0.8)",
//   backdropFilter: "blur(12px)",
//   borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: "0 2.5rem",
//   zIndex: 5,
//   position: "relative"
// }}>
//   {/* Left Side: Hamburger Icon */}
//   <button
//     onClick={() => setIsCollapsed(!isCollapsed)}
//     style={{
//       background: "transparent",
//       border: "none",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "8px",
//       borderRadius: "8px",
//       color: "#2B3E34",
//       transition: "background 0.2s"
//     }}
//     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
//     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
//   >
//     <Menu size={22} strokeWidth={2.2} />
//   </button>

//   {/* Right Side: Enhanced, Bigger & Shifted Forward Public Site Link */}
//   <a 
//     href="/landingPage" 
//     style={{
//       fontSize: "0.95rem", // Increased font size for a bigger look
//       fontWeight: "700", // Thicker font weight to pull it forward visually
//       color: "#2B3E34", // Darker army green base color for immediate prominence
//       textDecoration: "none",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px", // More gap between icon and text
//       transition: "all 0.2s ease",
//       padding: "8px 16px", // Generous padding to expand the clickable button footprint
//       borderRadius: "10px",
//       backgroundColor: "rgba(232, 239, 234, 0.5)", // Soft visible backdrop tint by default
//       border: "1px solid rgba(43, 62, 52, 0.1)", // Subtle outline structure
//       marginRight: "0.5rem" // Adjust positioning balance on the far right edge
//     }}
//     onMouseEnter={(e) => {
//       e.currentTarget.style.color = "#1E2D25";
//       e.currentTarget.style.backgroundColor = "#E8EFEA"; // Solid elegant army green fill on hover
//       e.currentTarget.style.transform = "translateY(-1px)"; // Interactive pop-up lift
//       e.currentTarget.style.boxShadow = "0 4px 12px rgba(43, 62, 52, 0.05)";
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.color = "#2B3E34";
//       e.currentTarget.style.backgroundColor = "rgba(232, 239, 234, 0.5)";
//       e.currentTarget.style.transform = "translateY(0)";
//       e.currentTarget.style.boxShadow = "none";
//     }}
//   >
//     <Globe size={18} strokeWidth={2.2} /> {/* Bigger icon size */}
//     <span>View Website</span>
//   </a>
// </header>
//         {/* Scrollable Page Layout Children Viewport Node */}
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

// src/layouts/DashboardLayout.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, Globe } from "lucide-react";

function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to closed/hidden for a clean view

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "#F8FAF9", 
      overflow: "hidden" 
    }}>

      {/* Decorative Ambient Background Radial Glows */}
      <div style={{
        position: "fixed",
        bottom: "-100px",
        left: "120px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,128,96,0.09) 0%, transparent 75%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{
        position: "fixed",
        top: "-80px",
        right: "-60px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(43,62,52,0.05) 0%, transparent 75%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Sidebar component */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main Content Area Container Panel */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden"
      }}>
        
        {/* Top Sticky Persistent Navigation Bar Area */}
        <header style={{
          height: "75px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          zIndex: 5,
          position: "relative"
        }}>
          {/* Left Side: Hamburger Trigger Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              borderRadius: "8px",
              color: "#2B3E34",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          {/* Right Side: Public Site Link */}
          <a 
            href="/landingPage" 
            style={{
              fontSize: "0.95rem",
              fontWeight: "700",
              color: "#2B3E34",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              padding: "8px 16px",
              borderRadius: "10px",
              backgroundColor: "rgba(232, 239, 234, 0.5)",
              border: "1px solid rgba(43, 62, 52, 0.1)",
              marginRight: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1E2D25";
              e.currentTarget.style.backgroundColor = "#E8EFEA";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(43, 62, 52, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#2B3E34";
              e.currentTarget.style.backgroundColor = "rgba(232, 239, 234, 0.5)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Globe size={18} strokeWidth={2.2} />
            <span>View Website</span>
          </a>
        </header>

        {/* Workspace Main Panel */}
        <main style={{ 
          flex: 1, 
          padding: "2.5rem 3.5rem", 
          overflowY: "auto",
          position: "relative",
          zIndex: 1
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;