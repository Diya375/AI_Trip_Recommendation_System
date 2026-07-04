import React from "react";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

      {/* Decorative ambient radial glow — bottom-left */}
      <div style={{
        position: "fixed",
        bottom: "-120px",
        left: "80px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,128,96,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      {/* Top-right ambient glow */}
      <div style={{
        position: "fixed",
        top: "-100px",
        right: "-80px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(22,107,79,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <Sidebar />

      <main style={{
        flex: 1,
        padding: "3rem 4rem",
        overflowY: "auto",
        height: "100vh",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;