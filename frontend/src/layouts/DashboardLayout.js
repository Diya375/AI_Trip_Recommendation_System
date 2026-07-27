import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Menu, Globe, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
        overflow: "hidden",
        color: "var(--text)",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Decorative Ambient Background Radial Glows */}
      <div
        style={{
          position: "fixed",
          bottom: "-100px",
          left: "120px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,128,96,0.09) 0%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "-80px",
          right: "-60px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(43,62,52,0.05) 0%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Sidebar component */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main Content Area Container Panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Top Sticky Persistent Navigation Bar Area */}
        <header
          style={{
            height: "75px",
            background: "var(--bg-card)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2.5rem",
            zIndex: 5,
            position: "relative",
            transition: "background 0.3s ease, border-color 0.3s ease",
          }}
        >
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
              color: "var(--text)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--bg-subtle)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          {/* Right Side Control Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                borderRadius: "8px",
                color: "var(--text)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--bg-subtle)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={20} strokeWidth={2.2} /> : <Sun size={20} strokeWidth={2.2} />}
            </button>

            {/* Public Site Link */}
            <Link
              to="/"
              style={{
                fontSize: "0.95rem",
                fontWeight: "700",
                color: "var(--text)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                padding: "8px 16px",
                borderRadius: "10px",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                marginRight: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.backgroundColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(43, 62, 52, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.backgroundColor =
                  "var(--bg-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Globe size={18} strokeWidth={2.2} />
              <span>View Website</span>
            </Link>
          </div>
        </header>

        {/* Workspace Main Panel */}
        <main
          style={{
            flex: 1,
            padding: "2.5rem 3.5rem",
            overflowY: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
