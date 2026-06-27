// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav style={{
//       background: "var(--bg-card)",
//       borderBottom: "1px solid var(--border)",
//       padding: "0 2.5rem",
//       height: "64px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       position: "sticky",
//       top: 0,
//       zIndex: 50,
//     }}>
//       <h1 className="cinzel" style={{ color: "var(--accent)", fontSize: "1.25rem", letterSpacing: "0.08em" }}>
//         YatraVerse
//       </h1>

//       <div style={{ display: "flex", gap: "0.75rem" }}>
//         <Link to="/login">
//           <button className="btn" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
//             Login
//           </button>
//         </Link>
//         <Link to="/signup">
//           <button className="btn btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>
//             Sign Up
//           </button>
//         </Link>
//       </div>
//     </nav>
//   );
// }
// Header.js
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{
      position: "absolute",  // 1. Sits directly on top of the slideshow layers
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,            // 2. Higher than the hero text so links remain clickable
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1.75rem 2.5rem",
      // 3. Subtle dark fade from the top down + frosted glass blur for micro-contrast
      background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)",
      backdropFilter: "blur(2px)", 
    }}>
    {/* 🧭 REFINED TYPOGRAPHIC LOGO (Icon removed) */}
<Link to="/" style={{ 
  display: "flex",
  alignItems: "center",
  textDecoration: "none"
}}>
  <span className="cinzel" style={{ 
    fontSize: "1.4rem", 
    color: "#ffffff",         // High-contrast clean white text
    letterSpacing: "0.22em",  // Expanded letter spacing for a luxury branding feel
    fontWeight: "700",
    textTransform: "uppercase",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)"
  }}>
    YatraVerse
    {/* A minimalist dot in your accent color replaces the star as a clean focal point */}
    <span style={{ color: "var(--accent)", marginLeft: "0.15rem" }}>.</span>
  </span>
</Link>

      {/* Navigation Links */}
      {/* <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}> */}
        {/* {["Home", "Explore", "Features"].map((item) => (
          <NavLink 
            key={item}
            to={`/${item.toLowerCase()}`} 
            style={{ 
              color: "#ffffff", // Pure white to cut through the photo tones
              textDecoration: "none", 
              fontSize: "0.9rem",
              fontWeight: "500",
              letterSpacing: "0.05em"
            }}
          >
            {item}
          </NavLink>
        ))}
      </nav> */}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/login" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.9rem" }}>
          Login
        </Link>
        <Link to="/signup">
          <button className="btn btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}