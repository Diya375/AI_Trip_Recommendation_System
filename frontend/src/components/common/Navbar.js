import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Explore", href: "#explore" },
  { label: "About", href: "#about" },
  { label: "Assistant", href: "#assistant" },
];

export default function Navbar() {
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex h-18 items-center justify-between px-4 py-3 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center">
          <Link to="/" className={`flex items-center gap-2 whitespace-nowrap no-underline ${scrolled ? "text-slate-800" : "text-white"}`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 shadow-lg shadow-sky-500/30">
              <Plane size={18} color="#fff" strokeWidth={2.5} className="rotate-[-45deg]" />
            </div>
            <span className={`text-lg font-extrabold tracking-[-0.02em] ${scrolled ? "text-slate-800" : "bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"}`}>
              YatraVerse
            </span>
          </Link>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-1 px-2 py-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-3">
          <div className="hidden items-center gap-3 md:flex">
            {token ? (
              <>
                <Link to="/dashboard" className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${scrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900" : "text-white/85 hover:bg-white/10 hover:text-white"}`}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${scrolled ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-100" : "border-white/20 bg-white/10 text-white hover:bg-white/20"}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${scrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900" : "text-white/85 hover:bg-white/10 hover:text-white"}`}>
                  Login
                </Link>
                <Link to="/signup" className="rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:translate-y-[-1px]">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className={`flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-md md:hidden ${scrolled ? "border-slate-300 bg-white/90 text-slate-700" : "border-white/15 bg-white/10 text-white"}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed left-0 right-0 top-16 z-40 border-b border-slate-200/70 bg-white/95 px-4 py-4 pb-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {token ? (
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-white">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}