// const features = [
//   {
//     icon: "✦",
//     title: "AI Recommendations",
//     desc: "Smart suggestions based on your budget, interests, and travel history.",
//   },
//   {
//     icon: "◎",
//     title: "Budget Planning",
//     desc: "Set a budget and let our planner optimize every rupee of your trip.",
//   },
//   {
//     icon: "◈",
//     title: "Group Collaboration",
//     desc: "Plan together — share itineraries, split expenses, and vote on ideas.",
//   },
//   {
//     icon: "◇",
//     title: "Destination Insights",
//     desc: "Deep insights on hidden gems, best seasons, and local culture.",
//   },
// ];

// export default function Features() {
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
//             Everything You Need
//           </h2>
//           <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
//             A complete toolkit for thoughtful travel planning
//           </p>
//         </div>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
//           gap: "1.25rem",
//         }}>
//           {features.map((f) => (
//             <div
//               key={f.title}
//               className="card card-hover"
//               style={{ padding: "1.75rem 1.5rem" }}
//             >
//               <div style={{
//                 fontSize: "1.4rem",
//                 color: "var(--accent)",
//                 marginBottom: "0.9rem",
//               }}>
//                 {f.icon}
//               </div>
//               <h3 style={{
//                 fontFamily: "'Cinzel', serif",
//                 fontSize: "0.95rem",
//                 color: "var(--text)",
//                 marginBottom: "0.5rem",
//                 letterSpacing: "0.03em",
//               }}>
//                 {f.title}
//               </h3>
//               <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", lineHeight: 1.6 }}>
//                 {f.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// Features.js
// Tip: To perfect this page, import icons (e.g., Sparkles, Wallet, Users, Compass from 'lucide-react')
const features = [
  {
    icon: "✦",
    title: "AI Recommendations",
    desc: "Smart suggestions based on your budget, interests, and travel history.",
  },
  {
    icon: "◎",
    title: "Budget Planning",
    desc: "Set a budget and let our planner optimize every rupee of your trip.",
  },
  {
    icon: "◈",
    title: "Group Collaboration",
    desc: "Plan together — share itineraries, split expenses, and vote on ideas.",
  },
  {
    icon: "◇",
    title: "Destination Insights",
    desc: "Deep insights on hidden gems, best seasons, and local culture.",
  },
];

export default function Features() {
  return (
    <section style={{
      padding: "6rem 2.5rem", // Slightly increased block breathing room
      background: "var(--bg)",
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="cinzel" style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            color: "var(--text)",
            marginBottom: "0.6rem",
            letterSpacing: "0.06em", // Added sophisticated horizontal breathing
          }}>
            Everything You Need
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
            A complete toolkit for thoughtful travel planning
          </p>
        </div>

        <div style={{
          display: "grid",
          // Adjusted minimal box sizing up to 230px so that cards stack nicely before crowding text rows
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1.5rem", // Added slightly better spacing gap between containers
        }}>
          {features.map((f) => (
            <div
              key={f.title}
              className="card card-hover"
              style={{ 
                padding: "2rem 1.75rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                height: "100%" // Keeps grids locked uniformly
              }}
            >
              <div style={{
                fontSize: "1.5rem",
                color: "var(--accent)",
                marginBottom: "1rem",
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1rem",
                color: "var(--text)",
                marginBottom: "0.75rem",
                letterSpacing: "0.03em",
              }}>
                {f.title}
              </h3>
              <p style={{ 
                color: "var(--text-dim)", 
                fontSize: "0.85rem", 
                lineHeight: 1.6,
                margin: 0,
                flexGrow: 1 // Aligns backgrounds even if text blocks differ in length
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}