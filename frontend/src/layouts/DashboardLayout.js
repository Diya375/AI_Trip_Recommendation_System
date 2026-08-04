import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Menu, Globe, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

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
    <div className="relative flex min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="pointer-events-none absolute -bottom-24 left-28 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_rgba(26,128,96,0.09)_0%,_transparent_75%)]" />
      <div className="pointer-events-none absolute -top-20 right-[-60px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(43,62,52,0.05)_0%,_transparent_75%)]" />

      <Sidebar isCollapsed={isCollapsed} />

      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <header className="flex h-[75px] items-center justify-between border-b border-slate-200/80 bg-[var(--bg-card)] backdrop-blur-xl px-4 sm:px-6 lg:px-10 transition-colors duration-300 z-20">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text)] transition-colors duration-200 hover:bg-[var(--bg-subtle)]"
            aria-label="Toggle sidebar"
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text)] transition-colors duration-200 hover:bg-[var(--bg-subtle)]"
            >
              {theme === "light" ? <Moon size={20} strokeWidth={2.2} /> : <Sun size={20} strokeWidth={2.2} />}
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-[var(--bg-subtle)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition duration-200 hover:bg-slate-100 hover:text-[var(--accent)]"
            >
              <Globe size={18} strokeWidth={2.2} />
              <span>View Website</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-[1200px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
