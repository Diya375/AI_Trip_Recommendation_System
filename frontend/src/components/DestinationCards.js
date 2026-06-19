const places = [
  { name: "Pokhara", tag: "Nepal", note: "Lakes & Himalayas" },
  { name: "Bali", tag: "Indonesia", note: "Temples & Beaches" },
  { name: "Tokyo", tag: "Japan", note: "Culture & Energy" },
  { name: "Paris", tag: "France", note: "Art & Romance" },
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
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
        }}>
          {places.map((p) => (
            <div key={p.name} className="card card-hover" style={{ padding: "1.5rem" }}>
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
              <p style={{ color: "var(--text-dim)", fontSize: "0.83rem" }}>{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}