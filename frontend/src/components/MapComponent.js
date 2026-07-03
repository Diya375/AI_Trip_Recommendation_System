// // src/components/MapComponent.js
// import React, { useEffect, useState } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// const LIBRARIES = ["places"];

// const darkMapStyle = [
//   { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
//   { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
//   { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
//   { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c54" }] },
//   { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
//   { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
//   { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1b2a" }] },
//   { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
//   { featureType: "poi", stylers: [{ visibility: "off" }] },
//   { featureType: "transit", stylers: [{ visibility: "off" }] },
// ];

// export default function MapComponent({ selectedDestination }) {
//   const [mapInstance, setMapInstance] = useState(null);
//   const [markerPosition, setMarkerPosition] = useState({ lat: 28.2096, lng: 83.9856 });

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: LIBRARIES,
//   });

//   useEffect(() => {
//     // Ensure both the maps script and the specific map rendering instance are active
//     if (isLoaded && window.google && selectedDestination && mapInstance) {
//       const geocoder = new window.google.maps.Geocoder();

//       geocoder.geocode({ address: selectedDestination }, (results, status) => {
//         if (status === "OK" && results[0]) {
//           const coords = {
//             lat: results[0].geometry.location.lat(),
//             lng: results[0].geometry.location.lng(),
//           };

//           // Update marker position
//           setMarkerPosition(coords);

//           // Force the camera frame to move to the exact spot programmatically
//           mapInstance.panTo(coords);
//           mapInstance.setZoom(12); 
//         } else {
//           console.error("Geocoding failed layout updates: " + status);
//         }
//       });
//     }
//   }, [isLoaded, selectedDestination, mapInstance]);

//   if (!isLoaded) return <div style={{ height: "100%", background: "#1a1a2e" }} />;

//   return (
//     <GoogleMap
//       mapContainerStyle={{ width: "100%", height: "100%" }}
//       center={markerPosition} // Initial startup centering
//       zoom={12}
//       onLoad={(map) => setMapInstance(map)} // Store map reference in state context
//       options={{
//         disableDefaultUI: false,
//         zoomControl: true,
//         scrollwheel: true,
//         styles: darkMapStyle,
//         fullscreenControl: false,
//         streetViewControl: false,
//         mapTypeControl: false,
//       }}
//     >
//       <Marker position={markerPosition} />
//     </GoogleMap>
//   );
// }

// src/components/MapComponent.js
import React from "react";

export default function MapComponent({ selectedDestination }) {
  if (!selectedDestination) {
    return (
      <div style={{ width: "100%", height: "100%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
        <p>No destination selected</p>
      </div>
    );
  }

  // Encodes spaces and special characters cleanly (e.g. "Mount Everest" -> "Mount%20Everest")
  const encodedLocation = encodeURIComponent(selectedDestination);
  
  // High-performance dark-themed styled embed map URL
  const mapUrl = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#1a1a2e" }}>
      <iframe
        title="Wanderlog Inspired Map Layout"
        width="100%"
        height="100%"
        src={mapUrl}
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        style={{
          border: "none",
          filter: "invert(90%) hue-rotate(180deg) ssaturate(150%)", // Applies a clean dark-mode filter skin natively
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
}