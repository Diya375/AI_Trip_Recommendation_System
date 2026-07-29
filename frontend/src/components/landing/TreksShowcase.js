// src/components/TreksShowcase.js
import React, { useState, useEffect } from "react";

export default function TreksShowcase() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live trekking routes from the public YatraTech endpoint
    fetch("https://api.yatratech.com/api/v1/tourism/treks/routes")
      .then((res) => res.json())
      .then((data) => {
        // Fallback to mock data if the API returns empty during development
        const trailData = data.routes || [
          { id: 1, name: "Annapurna Circuit", difficulty: "Hard", duration: "12 Days" },
          { id: 2, name: "Langtang Valley Trek", difficulty: "Medium", duration: "7 Days" }
        ];
        setRoutes(trailData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-slate-500">Loading live trails...</div>;

  return (
    <div className="p-12 bg-slate-50">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Live Featured Trekking Routes
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <div key={route.id} className="rounded-[12px] border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="m-0 text-lg font-semibold text-slate-900">{route.name}</h4>
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${route.difficulty === "Hard" ? "bg-rose-100 text-rose-700" : "bg-yellow-100 text-amber-800"}`}>
              {route.difficulty}
            </span>
            <p className="mt-3 text-sm text-slate-600">⏱️ Duration: {route.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}