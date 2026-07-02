// // // const places = [
// // //   { name: "Pokhara", tag: "Nepal", note: "Lakes & Himalayas" },
// // //   {name: "Kathmandu", tag: "Nepal", note: "Temples & Heritage"  },
// // //   { name: "Bhaktapur", tag: "Nepal", note: "Ancient Newari City" },
// // //   {  name: "Bandipur", tag: "Nepal", note: "Quiet Hill Town"},
// // // ];

// // // export default function DestinationCards() {
// // //   return (
// // //     <section style={{
// // //       padding: "5rem 2.5rem",
// // //       background: "var(--bg)",
// // //     }}>
// // //       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
// // //         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
// // //           <h2 className="cinzel" style={{
// // //             fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
// // //             color: "var(--text)",
// // //             marginBottom: "0.6rem",
// // //             letterSpacing: "0.04em",
// // //           }}>
// // //             Popular Destinations
// // //           </h2>
// // //           <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
// // //             Start exploring some of the world's most beloved locations
// // //           </p>
// // //         </div>

// // //         <div style={{
// // //           display: "grid",
// // //           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// // //           gap: "1.25rem",
// // //         }}>
// // //           {places.map((p) => (
// // //             <div key={p.name} className="card card-hover" style={{ padding: "1.5rem" }}>
// // //               <div style={{
// // //                 fontSize: "0.7rem",
// // //                 color: "var(--accent)",
// // //                 letterSpacing: "0.12em",
// // //                 textTransform: "uppercase",
// // //                 marginBottom: "0.5rem",
// // //               }}>
// // //                 {p.tag}
// // //               </div>
// // //               <h3 className="cinzel" style={{
// // //                 fontSize: "1.25rem",
// // //                 color: "var(--text)",
// // //                 marginBottom: "0.4rem",
// // //               }}>
// // //                 {p.name}
// // //               </h3>
// // //               <p style={{ color: "var(--text-dim)", fontSize: "0.83rem" }}>{p.note}</p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }
// // // const places = [
// // //   { 
// // //     name: "Pokhara", 
// // //     tag: "Nepal", 
// // //     note: "Lakes & Himalayas",
// // //     image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80" // Phewa Lake / Machapuchare scene
// // //   },
// // //   {
// // //     name: "Kathmandu", 
// // //     tag: "Nepal", 
// // //     note: "Temples & Heritage",
// // //     image: "https://images.unsplash.com/photo-1578593139811-2921a3a7f9f3?auto=format&fit=crop&w=600&q=80" // Temple scene
// // //   },
// // //   { 
// // //     name: "Bhaktapur", 
// // //     tag: "Nepal", 
// // //     note: "Ancient Newari City",
// // //     image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80" // Traditional architecture scene
// // //   },
// // //   { 
// // //     name: "Bandipur", 
// // //     tag: "Nepal", 
// // //     note: "Quiet Hill Town",
// // //     image: "https://images.unsplash.com/photo-1623492701902-47dc207dfdcd?auto=format&fit=crop&w=600&q=80" // Traditional street scene
// // //   },
// // // ];

// // // export default function DestinationCards() {
// // //   return (
// // //     <section style={{
// // //       padding: "5rem 2.5rem",
// // //       background: "var(--bg)",
// // //     }}>
// // //       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
// // //         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
// // //           <h2 className="cinzel" style={{
// // //             fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
// // //             color: "var(--text)",
// // //             marginBottom: "0.6rem",
// // //             letterSpacing: "0.04em",
// // //           }}>
// // //             Popular Destinations
// // //           </h2>
// // //           <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
// // //             Start exploring some of the world's most beloved locations
// // //           </p>
// // //         </div>

// // //         <div style={{
// // //           display: "grid",
// // //           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // Bumped minmax up slightly to accommodate photos better
// // //           gap: "1.5rem",
// // //         }}>
// // //           {places.map((p) => (
// // //             <div 
// // //               key={p.name} 
// // //               className="card card-hover" 
// // //               style={{ 
// // //                 padding: "0",          // Removed overall card padding so image goes edge-to-edge
// // //                 overflow: "hidden",     // Ensures the image corners clip perfectly into the card border radius
// // //                 display: "flex",
// // //                 flexDirection: "column"
// // //               }}
// // //             >
// // //               {/* Image Box */}
// // //               <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
// // //                 <img 
// // //                   src={p.image} 
// // //                   alt={`${p.name} scene`} 
// // //                   style={{ 
// // //                     width: "100%", 
// // //                     height: "100%", 
// // //                     objectFit: "cover", // Forces image to scale nicely without distortion
// // //                     transition: "transform 0.5s ease" // Ready for hover transitions if using custom CSS
// // //                   }} 
// // //                 />
// // //               </div>

// // //               {/* Content Box (Padding applied here instead) */}
// // //               <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
// // //                 <div style={{
// // //                   fontSize: "0.7rem",
// // //                   color: "var(--accent)",
// // //                   letterSpacing: "0.12em",
// // //                   textTransform: "uppercase",
// // //                   marginBottom: "0.5rem",
// // //                 }}>
// // //                   {p.tag}
// // //                 </div>
// // //                 <h3 className="cinzel" style={{
// // //                   fontSize: "1.25rem",
// // //                   color: "var(--text)",
// // //                   marginBottom: "0.4rem",
// // //                 }}>
// // //                   {p.name}
// // //                 </h3>
// // //                 <p style={{ color: "var(--text-dim)", fontSize: "0.83rem", margin: 0 }}>{p.note}</p>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // 1. Import your local images first
// // import pokharaImg from "../assets/images/Fewalake.jpg";
// // import kathmanduImg from "../assets/images/Swayambhunath.jpg";
// // import bhaktapurImg from "../assets/images/Bhaktapur.jpg";
// // import bandipurImg from "../assets/images/Bandipur.jpg";
// // // 2. Assign the imported variables directly to the image properties
// // const places = [
// //   { 
// //     name: "Pokhara", 
// //     tag: "Nepal", 
// //     note: "Lakes & Himalayas",
// //     image: pokharaImg 
// //   },
// //   {
// //     name: "Kathmandu", 
// //     tag: "Nepal", 
// //     note: "Temples & Heritage",
// //     image: kathmanduImg
// //   },
// //   { 
// //     name: "Bhaktapur", 
// //     tag: "Nepal", 
// //     note: "Ancient Newari City",
// //     image: bhaktapurImg
// //   },
// //   { 
// //     name: "Bandipur", 
// //     tag: "Nepal", 
// //     note: "Quiet Hill Town",
// //     image: bandipurImg
// //   },
// // ];

// // export default function DestinationCards() {
// //   return (
// //     <section style={{
// //       padding: "5rem 2.5rem",
// //       background: "var(--bg)",
// //     }}>
// //       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
// //         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
// //           <h2 className="cinzel" style={{
// //             fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
// //             color: "var(--text)",
// //             marginBottom: "0.6rem",
// //             letterSpacing: "0.04em",
// //           }}>
// //             Popular Destinations
// //           </h2>
// //           <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
// //             Start exploring some of the world's most beloved locations
// //           </p>
// //         </div>

// //         <div style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
// //           gap: "1.5rem",
// //         }}>
// //           {places.map((p) => (
// //             <div 
// //               key={p.name} 
// //               className="card card-hover" 
// //               style={{ 
// //                 padding: "0",          
// //                 overflow: "hidden",     
// //                 display: "flex",
// //                 flexDirection: "column"
// //               }}
// //             >
// //               {/* Image Box */}
// //               <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
// //                 <img 
// //                   src={p.image} // This seamlessly handles either local imported paths or web URLs!
// //                   alt={`${p.name} scene`} 
// //                   style={{ 
// //                     width: "100%", 
// //                     height: "100%", 
// //                     objectFit: "cover", 
// //                     transition: "transform 0.5s ease" 
// //                   }} 
// //                 />
// //               </div>

// //               {/* Content Box */}
// //               <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
// //                 <div style={{
// //                   fontSize: "0.7rem",
// //                   color: "var(--accent)",
// //                   letterSpacing: "0.12em",
// //                   textTransform: "uppercase",
// //                   marginBottom: "0.5rem",
// //                 }}>
// //                   {p.tag}
// //                 </div>
// //                 <h3 className="cinzel" style={{
// //                   fontSize: "1.25rem",
// //                   color: "var(--text)",
// //                   marginBottom: "0.4rem",
// //                 }}>
// //                   {p.name}
// //                 </h3>
// //                 <p style={{ color: "var(--text-dim)", fontSize: "0.83rem", margin: 0 }}>{p.note}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import React, { useState } from "react";

// // 1. Import your exact local assets
// import pokharaImg from "../assets/images/Fewalake.jpg";
// import kathmanduImg from "../assets/images/Swayambhunath.jpg";
// import bhaktapurImg from "../assets/images/Bhaktapur.jpg";
// import bandipurImg from "../assets/images/Bandipur.jpg";

// // 2. Data array integrated with descriptions and highlights
// const places = [
//   { 
//     id: "pokhara",
//     name: "Pokhara",  
//     note: "Lakes & Himalayas",
//     image: pokharaImg,
//     summary: "Nestled at the base of the Annapurna range, Pokhara is Nepal's ultimate adventure hub and relaxation sanctuary. Pristine lakes perfectly reflect snow-capped mountain peaks, offering unmatched paragliding, trekking trail access, and peaceful boating.",
//     highlights: ["Phewa Lake Boating", "Sarangkot Sunrise", "Annapurna Basecamp Gateway"]
//   },
//   {
//     id: "kathmandu", 
//     name: "Kathmandu",  
//     note: "Temples & Heritage",
//     image: kathmanduImg,
//     summary: "The historic capital of Nepal is a vibrant, living museum of ancient architecture, sacred shrines, and bustling spiritual squares. From massive stupas to medieval royal courtyards, heritage comes alive here.",
//     highlights: ["Boudhanath Stupa", "Pashupatinath Temple", "Durbar Square"]
//   },
//   { 
//     id: "bhaktapur", 
//     name: "Bhaktapur", 
//     note: "Ancient Newari City",
//     image: bhaktapurImg,
//     summary: "Step back in time inside this meticulously preserved UNESCO world heritage town. Celebrated for its timeless brick streets, towering multi-roof wooden pagodas, exquisite pottery craft, and rich Newari cultural traditions.",
//     highlights: ["Nyatapola 5-Story Temple", "Pottery Square", "Famous Juju Dhau Curd"]
//   },
//   { 
//     id: "bandipur", 
//     name: "Bandipur", 
//     note: "Quiet Hill Town",
//     image: bandipurImg,
//     summary: "A living museum of traditional Newari architecture preserved along an isolated mountaintop ridge. Free from motorized vehicles, its clean main street is lined with beautifully restored 18th-century townhouses offering views of the central Himalayas.",
//     highlights: ["Siddha Gufa Caves", "Newari Architecture", "Gurungche Hill Viewpoint"]
//   },
// ];

// export default function DestinationCards() {
//   // Set Pokhara as the initially selected active showcase item
//   const [selectedId, setSelectedId] = useState("pokhara");

//   const activePlace = places.find((p) => p.id === selectedId);

//   const handleViewGuide = (name) => {
//     alert(`Redirecting to full detail guide page for ${name}`);
//     // If using react-router-dom, change this to: navigate(`/destinations/${id}`)
//   };

//   return (
//     <section style={{
//       padding: "5rem 2.5rem",
//       background: "var(--bg)",
//     }}>
//       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
//         {/* Section Header */}
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

//         {/* Interactive Grid Columns */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
//           gap: "1.5rem",
//           marginBottom: "4rem"
//         }}>
//           {places.map((p) => {
//             const isSelected = p.id === selectedId;
//             return (
//               <div 
//                 key={p.name} 
//                 onClick={() => setSelectedId(p.id)}
//                 className="card card-hover" 
//                 style={{ 
//                   padding: "0",          
//                   overflow: "hidden",     
//                   display: "flex",
//                   flexDirection: "column",
//                   cursor: "pointer",
//                   border: isSelected ? "2px solid var(--text)" : "1px solid rgba(0,0,0,0.05)",
//                   transform: isSelected ? "translateY(-4px)" : "translateY(0)",
//                   transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
//                   boxShadow: isSelected ? "0 12px 24px rgba(0,0,0,0.08)" : "none"
//                 }}
//               >
//                 {/* Image Box */}
//                 <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
//                   <img 
//                     src={p.image} 
//                     alt={`${p.name} scene`} 
//                     style={{ 
//                       width: "100%", 
//                       height: "100%", 
//                       objectFit: "cover", 
//                       transition: "transform 0.5s ease" 
//                     }} 
//                   />
//                 </div>

//                 {/* Content Box */}
//                 <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
//                   <div style={{
//                     fontSize: "0.7rem",
//                     color: "var(--accent)",
//                     letterSpacing: "0.12em",
//                     textTransform: "uppercase",
//                     marginBottom: "0.5rem",
//                   }}>
//                     {p.tag}
//                   </div>
//                   <h3 className="cinzel" style={{
//                     fontSize: "1.25rem",
//                     color: "var(--text)",
//                     marginBottom: "0.4rem",
//                   }}>
//                     {p.name}
//                   </h3>
//                   <p style={{ color: "var(--text-dim)", fontSize: "0.83rem", margin: 0 }}>{p.note}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* 🏔️ Dynamic Big Picture Description Section */}
//         {activePlace && (
//           <div style={{
//             backgroundColor: "rgba(255, 255, 255, 0.6)",
//             borderRadius: "20px",
//             overflow: "hidden",
//             border: "1px solid rgba(0, 0, 0, 0.06)",
//             display: "flex",
//             flexDirection: "row",
//             flexWrap: "wrap",
//             minHeight: "380px",
//             animation: "fadeIn 0.4s ease"
//           }}>
//             {/* Left Column: Big Picture Image Block */}
//             <div style={{ flex: "1 1 400px", minHeight: "260px", position: "relative" }}>
//               <img 
//                 src={activePlace.image} 
//                 alt={activePlace.name} 
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             </div>

//             {/* Right Column: Descriptions & Navigation triggers */}
//             <div style={{
//               flex: "1 1 350px",
//               padding: "2.5rem",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center"
//             }}>
//               <span style={{
//                 fontSize: "0.75rem",
//                 letterSpacing: "0.2em",
//                 color: "var(--accent)",
//                 fontWeight: "700",
//                 textTransform: "uppercase",
//                 marginBottom: "0.5rem"
//               }}>
//                 Destination Spotlight
//               </span>
//               <h3 className="cinzel" style={{
//                 fontSize: "2rem",
//                 fontWeight: "500",
//                 color: "var(--text)",
//                 margin: "0 0 1rem"
//               }}>
//                 {activePlace.name}
//               </h3>
//               <p style={{
//                 fontSize: "0.95rem",
//                 lineHeight: "1.65",
//                 color: "var(--text-dim)",
//                 margin: "0 0 1.5rem",
//                 fontFamily: "system-ui, -apple-system, sans-serif"
//               }}>
//                 {activePlace.summary}
//               </p>

//               {/* Badges Layout */}
//               <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
//                 {activePlace.highlights.map((badge, idx) => (
//                   <span key={idx} style={{
//                     backgroundColor: "rgba(0, 0, 0, 0.04)",
//                     color: "var(--text)",
//                     fontSize: "0.78rem",
//                     padding: "0.35rem 0.85rem",
//                     borderRadius: "50px",
//                     fontWeight: "500",
//                     fontFamily: "system-ui, -apple-system, sans-serif"
//                   }}>
//                     {badge}
//                   </span>
//                 ))}
//               </div>

//               {/* Interactive Click Handler Trigger */}
//               <div>
//                 <button
//                   onClick={() => handleViewGuide(activePlace.name)}
//                   style={{
//                     backgroundColor: "var(--text)",
//                     color: "var(--bg)",
//                     border: "none",
//                     borderRadius: "10px",
//                     padding: "0.85rem 1.75rem",
//                     fontSize: "0.9rem",
//                     fontWeight: "600",
//                     cursor: "pointer",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "opacity 0.2s ease"
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
//                   onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
//                 >
//                   <span>Explore {activePlace.name} Page</span>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="5" y1="12" x2="19" y2="12"></line>
//                     <polyline points="12 5 19 12 12 19"></polyline>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );


// }


// src/components/DestinationCards.js
import React from "react";
import { Link } from "react-router-dom";
import { places } from "../components/destinationsData";

export default function DestinationCards() {
  return (
    <section style={{ 
      padding: "2rem 2.5rem 5rem", // Reduced top padding from 5rem to 2rem to move it upper
      background: "var(--bg)" 
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="cinzel" style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", // Slightly boosted title size for the larger layout
            color: "var(--text)",
            marginBottom: "0.6rem",
            letterSpacing: "0.04em",
          }}>
            Popular Destinations
          </h2>
          <p style={{ color: "var(--text-dim)",fontFamily: "'Playfair Display', 'Georgia', serif",fontSize: "0.95rem" }}>
            Start exploring some of the world's most beloved locations
          </p>
        </div>

        {/* 2-Column Responsive Grid Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", // Forces 2 items per row on desktop, scales nicely on tablets
          gap: "2rem", // Increased gap slightly to match the larger box style
        }}>
          {places.map((p) => (
            <Link to={`/explore/${p.id}`} key={p.id} style={{ textDecoration: "none" }}>
              <div className="card card-hover" style={{ 
                padding: "0",          
                overflow: "hidden",     
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "#ffffff",
                borderRadius: "20px", // Rounded corners enhanced for the bigger display scale
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)"
              }}>
                {/* Bigger Image Box */}
                <div style={{ width: "100%", height: "280px", overflow: "hidden" }}> {/* Increased height from 160px to 280px */}
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transition: "transform 0.5s ease" 
                    }} 
                  />
                </div>

                {/* Content Box */}
                <div style={{ padding: "1.75rem 2rem 2rem" }}> {/* Expanded padding for larger look */}
                  <div style={{
                    fontSize: "0.75rem",
                    color: "var(--accent, #374F43)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "0.6rem",
                    fontWeight: "600"
                  }}>
                    {p.tag}
                  </div>
                  <h3 className="cinzel" style={{
                    fontSize: "1.5rem", // Made title larger to match the big card format
                    color: "var(--text)",
                    marginBottom: "0.5rem",
                  }}>
                    {p.name}
                  </h3>
                  <p style={{ 
                    color: "var(--text-dim)", 
                    fontSize: "0.95rem", // Slightly bigger note text
                    margin: 0 
                  }}>
                    {p.note}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}