import React from "react";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 p-10 text-white">{children}</main>
    </div>
  );
}

export default DashboardLayout;