import React, { useMemo, useState } from "react";

export default function MapComponent({ selectedDestination }) {
  const [mapError, setMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mapUrl = useMemo(() => {
    const encodedLocation = encodeURIComponent(selectedDestination || "Nepal");
    return `https://www.google.com/maps?q=${encodedLocation}&output=embed&z=13`;
  }, [selectedDestination]);

  if (!selectedDestination) {
    return (
      <div style={{ width: "100%", height: "100%", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", padding: "1rem" }}>
        <p style={{ margin: 0 }}>No destination selected</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#0f172a" }}>
      {isLoading && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#e2e8f0", background: "linear-gradient(135deg, #0f172a, #1e293b)", zIndex: 1 }}>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>Loading map for {selectedDestination}...</p>
        </div>
      )}

      {mapError ? (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "1.5rem", color: "#e2e8f0", textAlign: "center", background: "linear-gradient(135deg, #0f172a, #111827)" }}>
          <p style={{ margin: 0, fontWeight: 600 }}>Map preview unavailable</p>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#cbd5e1" }}>Open the location directly in Google Maps.</p>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDestination)}`} target="_blank" rel="noreferrer" style={{ color: "#f8fafc", textDecoration: "none", background: "#2563eb", padding: "0.65rem 1rem", borderRadius: "999px" }}>
            Open in Google Maps
          </a>
        </div>
      ) : (
        <iframe
          title={`Map for ${selectedDestination}`}
          width="100%"
          height="100%"
          src={mapUrl}
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setMapError(true);
          }}
          style={{ border: "none", width: "100%", height: "100%", minHeight: "320px" }}
        />
      )}
    </div>
  );
}