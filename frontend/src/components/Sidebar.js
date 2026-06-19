import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard",   path: "/dashboard" },
  { label: "Home",        path: "/home" },
  { label: "Explore",     path: "/explore" },
  { label: "Planner",     path: "/planner" },
  { label: "Expenses",    path: "/expenses" },
  { label: "AI Assistant",path: "/assistant" },
  { label: "Profile",     path: "/profile" },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">YatraVerse</div>
        <div className="sidebar-tagline">AI TRAVEL COMPANION</div>
      </div>

      <hr className="divider" />

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <hr className="divider" />

      <button className="btn btn-danger" style={{ width: "100%", textAlign: "center" }} onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;