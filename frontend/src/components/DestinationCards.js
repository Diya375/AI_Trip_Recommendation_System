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
import pokharaImg from "../assets/images/Fewalake.jpg";
import kathmanduImg from "../assets/images/Swayambhunath.jpg";
import bhaktapurImg from "../assets/images/Bhaktapur.jpg";
import bandipurImg from "../assets/images/Bandipur.jpg";
// 2. Assign the imported variables directly to the image properties
const places = [
  { 
    name: "Pokhara", 
    tag: "Nepal", 
    note: "Lakes & Himalayas",
    image: pokharaImg 
  },
  {
    name: "Kathmandu", 
    tag: "Nepal", 
    note: "Temples & Heritage",
    image: kathmanduImg
  },
  { 
    name: "Bhaktapur", 
    tag: "Nepal", 
    note: "Ancient Newari City",
    image: bhaktapurImg
  },
  { 
    name: "Bandipur", 
    tag: "Nepal", 
    note: "Quiet Hill Town",
    image: bandipurImg
  },
];

export default function DestinationCards() {
  return (
    <section style={{
      padding: "5rem 2.5rem",
      background: "var(--bg)",
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="cinzel" style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            color: "var(--text)",
            marginBottom: "0.6rem",
            letterSpacing: "0.04em",
          }}>
            Popular Destinations
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
            Start exploring some of the world's most beloved locations
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "1.5rem",
        }}>
          {places.map((p) => (
            <div 
              key={p.name} 
              className="card card-hover" 
              style={{ 
                padding: "0",          
                overflow: "hidden",     
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Image Box */}
              <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
                <img 
                  src={p.image} // This seamlessly handles either local imported paths or web URLs!
                  alt={`${p.name} scene`} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover", 
                    transition: "transform 0.5s ease" 
                  }} 
                />
              </div>

              {/* Content Box */}
              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                <div style={{
                  fontSize: "0.7rem",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}>
                  {p.tag}
                </div>
                <h3 className="cinzel" style={{
                  fontSize: "1.25rem",
                  color: "var(--text)",
                  marginBottom: "0.4rem",
                }}>
                  {p.name}
                </h3>
                <p style={{ color: "var(--text-dim)", fontSize: "0.83rem", margin: 0 }}>{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}