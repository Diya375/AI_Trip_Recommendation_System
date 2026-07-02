// const places = [
//   { name: "Pokhara", tag: "Nepal", note: "Lakes & Himalayas" },
//   {name: "Kathmandu", tag: "Nepal", note: "Temples & Heritage"  },
//   { name: "Bhaktapur", tag: "Nepal", note: "Ancient Newari City" },
//   {  name: "Bandipur", tag: "Nepal", note: "Quiet Hill Town"},
// ];

// export default function DestinationCards() {
//   return (
//     <section style={{
//       padding: "5rem 2.5rem",
//       background: "var(--bg)",
//     }}>
//       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//           <h2 className="cinzel" style={{
//             fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
//             color: "var(--text)",
//             marginBottom: "0.6rem",
//             letterSpacing: "0.04em",
//           }}>
//             Popular Destinations
//           </h2>
//           <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
//             Start exploring some of the world's most beloved locations
//           </p>
//         </div>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: "1.25rem",
//         }}>
//           {places.map((p) => (
//             <div key={p.name} className="card card-hover" style={{ padding: "1.5rem" }}>
//               <div style={{
//                 fontSize: "0.7rem",
//                 color: "var(--accent)",
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 marginBottom: "0.5rem",
//               }}>
//                 {p.tag}
//               </div>
//               <h3 className="cinzel" style={{
//                 fontSize: "1.25rem",
//                 color: "var(--text)",
//                 marginBottom: "0.4rem",
//               }}>
//                 {p.name}
//               </h3>
//               <p style={{ color: "var(--text-dim)", fontSize: "0.83rem" }}>{p.note}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// const places = [
//   { 
//     name: "Pokhara", 
//     tag: "Nepal", 
//     note: "Lakes & Himalayas",
//     image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80" // Phewa Lake / Machapuchare scene
//   },
//   {
//     name: "Kathmandu", 
//     tag: "Nepal", 
//     note: "Temples & Heritage",
//     image: "https://images.unsplash.com/photo-1578593139811-2921a3a7f9f3?auto=format&fit=crop&w=600&q=80" // Temple scene
//   },
//   { 
//     name: "Bhaktapur", 
//     tag: "Nepal", 
//     note: "Ancient Newari City",
//     image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80" // Traditional architecture scene
//   },
//   { 
//     name: "Bandipur", 
//     tag: "Nepal", 
//     note: "Quiet Hill Town",
//     image: "https://images.unsplash.com/photo-1623492701902-47dc207dfdcd?auto=format&fit=crop&w=600&q=80" // Traditional street scene
//   },
// ];

// export default function DestinationCards() {
//   return (
//     <section style={{
//       padding: "5rem 2.5rem",
//       background: "var(--bg)",
//     }}>
//       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//           <h2 className="cinzel" style={{
//             fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
//             color: "var(--text)",
//             marginBottom: "0.6rem",
//             letterSpacing: "0.04em",
//           }}>
//             Popular Destinations
//           </h2>
//           <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
//             Start exploring some of the world's most beloved locations
//           </p>
//         </div>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // Bumped minmax up slightly to accommodate photos better
//           gap: "1.5rem",
//         }}>
//           {places.map((p) => (
//             <div 
//               key={p.name} 
//               className="card card-hover" 
//               style={{ 
//                 padding: "0",          // Removed overall card padding so image goes edge-to-edge
//                 overflow: "hidden",     // Ensures the image corners clip perfectly into the card border radius
//                 display: "flex",
//                 flexDirection: "column"
//               }}
//             >
//               {/* Image Box */}
//               <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
//                 <img 
//                   src={p.image} 
//                   alt={`${p.name} scene`} 
//                   style={{ 
//                     width: "100%", 
//                     height: "100%", 
//                     objectFit: "cover", // Forces image to scale nicely without distortion
//                     transition: "transform 0.5s ease" // Ready for hover transitions if using custom CSS
//                   }} 
//                 />
//               </div>

//               {/* Content Box (Padding applied here instead) */}
//               <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
//                 <div style={{
//                   fontSize: "0.7rem",
//                   color: "var(--accent)",
//                   letterSpacing: "0.12em",
//                   textTransform: "uppercase",
//                   marginBottom: "0.5rem",
//                 }}>
//                   {p.tag}
//                 </div>
//                 <h3 className="cinzel" style={{
//                   fontSize: "1.25rem",
//                   color: "var(--text)",
//                   marginBottom: "0.4rem",
//                 }}>
//                   {p.name}
//                 </h3>
//                 <p style={{ color: "var(--text-dim)", fontSize: "0.83rem", margin: 0 }}>{p.note}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// 1. Import your local images first
// DestinationCards.js
import React, { useState } from "react";

import pokharaImg from "../assets/images/Fewalake.jpg";
import kathmanduImg from "../assets/images/Swayambhunath.jpg";
import bhaktapurImg from "../assets/images/Bhaktapur.jpg";
import bandipurImg from "../assets/images/Bandipur.jpg";

const places = [
  {
    name: "Pokhara",
    tag: "Lakes & Himalayas",
    note:
      "Mirror-still Phewa Lake framed by towering Annapurna peaks — the jewel of Nepal's adventure capital.",
    image: pokharaImg,
    elevation: "827m",
  },
  {
    name: "Kathmandu",
    tag: "Temples & Heritage",
    note:
      "A living museum of ancient Newari temples, vibrant bazaars, and timeless spiritual traditions.",
    image: kathmanduImg,
    elevation: "1,400m",
  },
  {
    name: "Bhaktapur",
    tag: "Ancient Newari City",
    note:
      "Step back in time through medieval courtyards, terracotta rooftops, and centuries-old pagodas.",
    image: bhaktapurImg,
    elevation: "1,401m",
  },
  {
    name: "Bandipur",
    tag: "Quiet Hill Town",
    note:
      "A perfectly preserved hilltop bazaar town with sweeping Himalayan views and colonial-era charm.",
    image: bandipurImg,
    elevation: "1,030m",
  },
];

export default function DestinationCards() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

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
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "300px",
          background:
            "radial-gradient(ellipse at center, rgba(75,119,98,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                color: "var(--accent)",
                textTransform: "uppercase",
                fontWeight: "600",
                marginBottom: "1.2rem",
                padding: "0.4rem 1.2rem",
                border: "1px solid rgba(201, 169, 110, 0.2)",
                borderRadius: "50px",
              }}
            >
              Top Picks
            </span>

            <h2
              className="cinzel"
              style={{
                display: "block",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "700",
                letterSpacing: "0.03em",
                lineHeight: 1.2,
                marginTop: "1rem",
              }}
            >
              Beloved{" "}
              <span style={{ color: "var(--accent)" }}>Destinations.</span>
            </h2>
          </div>

          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.9rem",
              maxWidth: "320px",
              lineHeight: 1.8,
              fontWeight: "300",
              textAlign: "right",
            }}
          >
            Each destination hand-curated by our AI from thousands of verified
            traveller reviews and local expert insights.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {places.map((p, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div
                key={p.name}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "3/4",
                  transform: isHovered ? "translateY(-10px) scale(1.01)" : "translateY(0) scale(1)",
                  transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isHovered
                    ? "0 30px 70px rgba(0,0,0,0.6)"
                    : "0 6px 30px rgba(0,0,0,0.35)",
                  border: isHovered
                    ? "1px solid rgba(22, 107, 79, 0.3)"
                    : "1px solid var(--border)",
                }}
              >
                {/* Image */}
                <img
                  src={p.image}
                  alt={`${p.name} scene`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: isHovered ? "scale(1.08)" : "scale(1.0)",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isHovered
                      ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                    transition: "background 0.45s ease",
                  }}
                />

                {/* Top badge: elevation */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "50px",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "0.1em",
                  }}
                >
                  {p.elevation}
                </div>

                {/* Bottom content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "2rem 1.75rem",
                  }}
                >
                  {/* Tag */}
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {p.tag}
                  </span>

                  {/* Name */}
                  <h3
                    className="cinzel"
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "700",
                      color: "var(--text)",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {p.name}
                  </h3>

                  {/* Note — slides in on hover */}
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text)",
                      lineHeight: "1.7",
                      fontWeight: "300",
                      margin: 0,
                      maxHeight: isHovered ? "100px" : "0",
                      opacity: isHovered ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease, opacity 0.4s ease",
                    }}
                  >
                    {p.note}
                  </p>

                  {/* Explore CTA */}
                  <div
                    style={{
                      marginTop: isHovered ? "1.25rem" : "0",
                      maxHeight: isHovered ? "40px" : "0",
                      overflow: "hidden",
                      opacity: isHovered ? 1 : 0,
                      transition: "all 0.4s ease 0.05s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.75rem",
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.15em",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      fontWeight: "600",
                    }}
                  >
                    Discover
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}