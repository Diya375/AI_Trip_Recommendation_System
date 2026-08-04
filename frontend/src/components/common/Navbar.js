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

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: "all 0.3s ease",
    padding: "0 2rem",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...(scrolled
      ? {
        background: "rgba(15,23,42,0.85)",
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }
      : {
        background: "transparent",
      }),
  };

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
          }}>
            <Plane size={18} color="#fff" strokeWidth={2.5} style={{ transform: "rotate(-45deg)" }} />
          </div>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "1.25rem",
            background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}>
            YatraVerse
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center" style={{ gap: "0.25rem" }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                padding: "0.5rem 0.875rem",
                borderRadius: "10px",
                transition: "all 0.2s ease",
                display: "block",
              }}
              onMouseEnter={e => {
                e.target.style.color = "#fff";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                e.target.style.color = "rgba(255,255,255,0.75)";
                e.target.style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center" style={{ gap: "0.75rem" }}>
          {token ? (
            <>
              <Link to="/dashboard" style={{
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.85)"}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "0.55rem 1.2rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.target.style.background = "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: "0.55rem 1rem",
                borderRadius: "10px",
                transition: "all 0.2s ease",
              }}>
                Login
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button style={{
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "0.6rem 1.3rem",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(59,130,246,0.4)",
                  transition: "all 0.2s ease",
                }}
                  onMouseEnter={e => {
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(59,130,246,0.5)";
                  }}
                  onMouseLeave={e => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 14px rgba(59,130,246,0.4)";
                  }}
                >
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(v => !v)}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
            padding: "0.5rem",
            cursor: "pointer",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            zIndex: 49,
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "1rem 1.5rem 1.5rem",
            animation: "fadeInDown 0.2s ease",
          }}
        >
          {navLinks.map(link => (
            <a key={link.label} href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 500,
                padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
            {token ? (
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "12px",
                  padding: "0.75rem 1.25rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textAlign: "center",
                  boxShadow: "0 4px 14px rgba(59,130,246,0.4)",
                }}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "0.75rem 1.25rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textAlign: "center",
                  }}
                >
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "12px",
                    padding: "0.75rem 1.25rem",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textAlign: "center",
                    boxShadow: "0 4px 14px rgba(59,130,246,0.4)",
                  }}
                >
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