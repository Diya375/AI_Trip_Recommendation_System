import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Trips", path: "/trips" },
  { label: "Expenses", path: "/expenses" },
  { label: "Explore", path: "/explore" },
  { label: "Recommendations", path: "/recommendations" },
  { label: "AI Assistant", path: "/assistant" },
  { label: "Profile", path: "/profile" },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-black/90 border-r border-white/10 flex flex-col p-6 text-white">
      <div className="mb-10">
        <h1 className="font-['Cinzel',serif] text-2xl">YatraVerse</h1>
        <p className="text-xs text-white/50 mt-1">AI Travel Companion</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-3 rounded-lg bg-red-900/40 text-red-300 border border-red-800/50 hover:bg-red-900/60 transition"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;