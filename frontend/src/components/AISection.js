// // export default function AISection() {
// //   return (
// //     <section style={{
// //       padding: "5rem 2.5rem",
// //       background: "var(--bg-card)",
// //       borderTop: "1px solid var(--border)",
// //       borderBottom: "1px solid var(--border)",
// //     }}>
// //       <div style={{
// //         maxWidth: "700px",
// //         margin: "0 auto",
// //         textAlign: "center",
// //       }}>
// //         <span style={{
// //           display: "inline-block",
// //           padding: "0.3rem 0.9rem",
// //           border: "1px solid rgba(201,169,110,0.3)",
// //           borderRadius: "20px",
// //           fontSize: "0.75rem",
// //           color: "var(--accent)",
// //           letterSpacing: "0.12em",
// //           textTransform: "uppercase",
// //           marginBottom: "1.5rem",
// //         }}>
// //           Powered by AI
// //         </span>

// //         <h2 className="cinzel" style={{
// //           fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
// //           color: "var(--text)",
// //           marginBottom: "1rem",
// //           letterSpacing: "0.04em",
// //           lineHeight: 1.3,
// //         }}>
// //           Recommendations that understand you
// //         </h2>

// //         <p style={{
// //           color: "var(--text-dim)",
// //           fontSize: "1rem",
// //           lineHeight: 1.8,
// //         }}>
// //           Our AI analyzes your interests, budget, travel history, and group preferences
// //           to suggest destinations that truly match who you are — not just what's trending.
// //         </p>

// //         <div style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(3, 1fr)",
// //           gap: "1rem",
// //           marginTop: "2.5rem",
// //         }}>
// //           {["500+ Destinations", "Smart Itineraries", "Real-time Pricing"].map((stat) => (
// //             <div
// //               key={stat}
// //               style={{
// //                 padding: "1rem",
// //                 border: "1px solid var(--border)",
// //                 borderRadius: "10px",
// //                 color: "var(--text-dim)",
// //                 fontSize: "0.82rem",
// //               }}
// //             >
// //               {stat}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // AISection.js
// export default function AISection() {
//   return (
//     <section style={{
//       padding: "6rem 2.5rem 8rem", // Expanded bottom margin padding to space out the upcoming destination element below
//       background: "var(--bg-card)",
//       borderTop: "1px solid var(--border)",
//       borderBottom: "1px solid var(--border)",
//     }}>
//       <div style={{
//         maxWidth: "700px",
//         margin: "0 auto",
//         textAlign: "center",
//       }}>
//         <span style={{
//           display: "inline-block",
//           padding: "0.3rem 0.9rem",
//           border: "1px solid rgba(201,169,110,0.3)",
//           borderRadius: "20px",
//           fontSize: "0.75rem",
//           color: "var(--accent)",
//           letterSpacing: "0.12em",
//           textTransform: "uppercase",
//           marginBottom: "1.5rem",
//         }}>
//           Powered by AI
//         </span>

//         <h2 className="cinzel" style={{
//           fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
//           color: "var(--text)",
//           marginBottom: "1.25rem",
//           letterSpacing: "0.04em",
//           lineHeight: 1.3,
//         }}>
//           Recommendations that understand you
//         </h2>

//         <p style={{
//           color: "var(--text-dim)",
//           fontSize: "1rem",
//           lineHeight: 1.8,
//           marginBottom: "3rem"
//         }}>
//           Our AI analyzes your interests, budget, travel history, and group preferences
//           to suggest destinations that truly match who you are — not just what's trending.
//         </p>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", // Adaptive grid framework
//           gap: "1rem",
//           maxWidth: "600px",
//           margin: "0 auto"
//         }}>
//           {["500+ Destinations", "Smart Itineraries", "Real-time Pricing"].map((stat) => (
//             <div
//               key={stat}
//               style={{
//                 padding: "0.6rem 1rem",
//                 // Subtle color tint inside the existing design borders so it behaves like static informational badges
//                 background: "rgba(75, 119, 98, 0.04)", 
//                 border: "1px solid rgba(75, 119, 98, 0.15)",
//                 borderRadius: "30px", // Rounded layout matches tag formats
//                 color: "var(--text)",
//                 fontSize: "0.82rem",
//                 fontWeight: "500",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "0.4rem"
//               }}
//             >
//               <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>✓</span> {stat}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// AISection.js
// AISection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const statsData = [
  {
    label: "500+",
    sublabel: "Destinations",
    path: "/explore",
    description:
      "Discover hidden base camps, historic shrines, and local viewpoints — all analyzed specifically for your pace and preference.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Smart",
    sublabel: "Itineraries",
    path: "/planner",
    description:
      "Generate adaptive daily trail plans, travel timelines, and route schedules mapped seamlessly around your unique travel style.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Live",
    sublabel: "Pricing",
    path: "/expenses",
    description:
      "Monitor localized indexes, project budget forecasts, and calculate live currency estimates effortlessly at every step.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function AISection() {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const isLoggedIn = true;

  const handleStatClick = (destinationPath) => {
    navigate(isLoggedIn ? destinationPath : "/login");
  };

  return (
    <section
      style={{
        width: "100%",
        padding: "8rem 2rem",
        background: "var(--bg)",
        color: "var(--text)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(75,119,98,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(75,119,98,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Top gradient fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, var(--bg), transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1150px", margin: "0 auto", position: "relative" }}>
        {/* Two-column layout: text left, stats right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left: Editorial text block */}
          <div style={{ paddingTop: "1rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                color: "var(--accent)",
                textTransform: "uppercase",
                fontWeight: "600",
                marginBottom: "2rem",
                padding: "0.4rem 1.2rem",
                border: "1px solid rgba(201, 169, 110, 0.2)",
                borderRadius: "50px",
              }}
            >
              Powered by AI
            </span>

            <h2
              className="cinzel"
              style={{
                display: "block",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: "700",
                letterSpacing: "0.03em",
                lineHeight: 1.25,
                marginTop: "1.5rem",
                marginBottom: "1.75rem",
              }}
            >
              Recommendations that{" "}
              <span style={{ color: "var(--accent)" }}>understand you.</span>
            </h2>

            <p
              style={{
                color: "var(--text-dim)",
                fontSize: "1.05rem",
                lineHeight: "1.9",
                fontWeight: "300",
                maxWidth: "460px",
                marginBottom: "3rem",
              }}
            >
              Our AI analyzes your interests, budget, travel history, and group
              preferences to suggest destinations that truly match who you are —
              not just what's trending.
            </p>

            {/* Divider line */}
            <div
              style={{
                width: "60px",
                height: "1px",
                background:
                  "linear-gradient(90deg, var(--accent), transparent)",
                marginBottom: "3rem",
              }}
            />

            {/* Proof points */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "Personalized to your budget & interests",
                "Adapts in real-time as you explore",
                "Curated from 500+ verified Nepali destinations",
              ].map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    color: "var(--text-dim)",
                    fontSize: "0.9rem",
                    fontWeight: "300",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: "var(--text-dim)" }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stat cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {statsData.map((stat, index) => {
              const isHovered = hoveredIdx === index;
              return (
                <div
                  key={stat.label}
                  onClick={() => handleStatClick(stat.path)}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.5rem",
                    padding: "1.75rem 2rem",
                    borderRadius: "16px",
                    background: isHovered
                      ? "linear-gradient(135deg, rgba(22,107,79,0.08) 0%, rgba(244,247,245,1) 100%)"
                      : "var(--bg-card)",
                    border: isHovered
                      ? "1px solid rgba(22,107,79,0.3)"
                      : "1px solid var(--border)",
                    cursor: "pointer",
                    transform: isHovered ? "translateX(6px)" : "translateX(0)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isHovered
                      ? "0 8px 32px rgba(0,0,0,0.4)"
                      : "none",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: isHovered
                        ? "rgba(22,107,79,0.1)"
                        : "rgba(22,107,79,0.04)",
                      border: isHovered
                        ? "1px solid rgba(22,107,79,0.35)"
                        : "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: isHovered
                        ? "var(--accent)"
                        : "var(--text-dim)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {stat.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    {/* Big number / label */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.4rem" }}>
                      <span
                        className="cinzel"
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "700",
                          color: isHovered ? "var(--text)" : "var(--text)",
                          letterSpacing: "0.02em",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {stat.label}
                      </span>
                      <span
                        className="cinzel"
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "var(--text-dim)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {stat.sublabel}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--text-dim)",
                        lineHeight: "1.7",
                        fontWeight: "300",
                        margin: 0,
                      }}
                    >
                      {stat.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      flexShrink: 0,
                      color: isHovered
                        ? "var(--accent)"
                        : "var(--text-dim)",
                      opacity: isHovered ? 1 : 0.4,
                      transition: "all 0.3s ease",
                      transform: isHovered ? "translateX(3px)" : "translateX(0)",
                      marginTop: "4px",
                    }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}