import React from "react";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "3rem 4rem", overflowY: "auto", height: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;