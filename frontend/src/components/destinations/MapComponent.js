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
      <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-400 p-4">
        <p className="m-0">No destination selected</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-slate-950">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-slate-100 bg-[linear-gradient(135deg,#0f172a,#1e293b)]">
          <p className="m-0 text-[0.95rem]">Loading map for {selectedDestination}...</p>
        </div>
      )}

      {mapError ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-slate-100 text-center bg-[linear-gradient(135deg,#0f172a,#111827)]">
          <p className="m-0 font-semibold">Map preview unavailable</p>
          <p className="m-0 text-sm text-slate-300">Open the location directly in Google Maps.</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDestination)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white no-underline"
          >
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
          className="border-0 w-full h-full min-h-[320px]"
        />
      )}
    </div>
  );
}