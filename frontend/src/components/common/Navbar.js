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
  const token = localStorage.getItem("token");
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-7 sm:px-10 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
      {/* 🧭 REFINED TYPOGRAPHIC LOGO (Icon removed) */}
      <Link to="/" className="flex items-center no-underline">
        <span className="cinzel text-[1.4rem] uppercase font-bold tracking-[0.22em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          YatraVerse
          <span className="ml-1 text-[var(--accent)]">.</span>
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
      <div className="flex items-center gap-4">
  {token ? (
    <>
      <Link
        to="/dashboard"
        className="text-white text-sm font-semibold font-serif no-underline"
      >
        Dashboard
      </Link>

      <button
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 font-serif"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="text-white text-sm font-semibold font-serif no-underline"
      >
        Login
      </Link>

      <Link to="/signup">
        <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 font-serif">
          Sign Up
        </button>
      </Link>
    </>
  )}
</div>
    </header>
  );
}