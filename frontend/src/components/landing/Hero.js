 import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import npmountImg from "../../assets/images/Nepali_mountain.jpg";
import kathmanduImg from "../../assets/images/Nepal-mountain.jpg";
import janakiImg from "../../assets/images/Janaki-temple.jpg";
import bandipurImg from "../../assets/images/VALLEY.jpg";
import everImg from "../../assets/images/Mount_Everest.jpg"

const slideshowImages = [
  { src: npmountImg, alt: "Top of the World - Lakes & Himalayas" },
  { src: kathmanduImg, alt: "Mountain of Nepal - Natural Heritage" },
  { src: janakiImg, alt: "Janaki Temple - Cultural Splendor" },
  { src: bandipurImg, alt: "Valley - Deep valley of Nepal" },
  { src: everImg, alt: "Mount Everest"}
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Rotates the images every 6 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    // Inside Hero.js wrapper return statement:
<section style={{
  width: "100%",
  minHeight: "100vh",        // Changed from 88vh to full screen height for a true immersive splash
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "7rem 2rem 4rem", // Increased top padding (7rem) to accommodate the absolute header
  position: "relative",
  overflow: "hidden",
 background: "#ffffff",
}}>
      
      {/* 1. SLIDESHOW LAYER CONTAINER */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}>
        {slideshowImages.map((image, index) => {
          const isActive = index === currentIndex;
          return (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                // Combines a crisp 1.5s fade with a very subtle scale effect for a high-end cinematic feel
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1.03)" : "scale(1.00)",
                transition: "opacity 1500ms ease-in-out, transform 6000ms ease-in-out",
              }}
            />
          );
        })}

        {/* 2. PERSISTENT GRADIENT OVERLAY (Locked on top of the images to protect text contrast) */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(19,25,22,0.8),#ffffff 110%)",
          zIndex: 1,
        }} />
      </div>

      {/* 3. HERO CONTENT LAYER */}
     <div
  className="fade-up"
  style={{
    position: "relative",
    zIndex: 2,
    marginTop: "3rem",
  }}
>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          color: "var(--accent)", // Your gold/sage accent stands out perfectly
          marginBottom: "1.75rem",
          textTransform: "uppercase",
          fontWeight: "600",
          textShadow: "0 2px 4px rgba(0,0,0,0.4)",
        }}>
         
        </p>

        <h1 className="cinzel" style={{
          fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#ffffff", // Pure typography breaks through the image darkness
          marginBottom: "1.75rem",
          letterSpacing: "0.02em",
          textShadow: "0 4px 16px rgba(0,0,0,0.6)",
        }}>
          Plan Smarter,<br />
          <span style={{ color: "#ffffff" }}>Travel Deeper.</span>
        </h1>

    

       <p style={{
  fontSize: "1.1rem",
  // A soft silver-white lets the rich colors of Nepal's landscapes peak through the typography
  color: "rgba(245, 245, 245, 0.85)", 
  maxWidth: "620px",
  margin: "0 auto 3.5rem",
  lineHeight: "1.9", // Generous vertical space instantly feels premium
  // Opened tracking makes the prose look intentional, sophisticated, and editorial
  letterSpacing: "0.03em", 
  fontFamily: "'Playfair Display', 'Georgia', serif",
  fontStyle: "bold",
  fontWeight: "300",
  textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
}}>
  Traverse epic peaks, historic mountain hamlets, and sweeping gorges down to the 
  vibrant heart of ancient heritage. Your journey across Nepal begins here.
</p>

        <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
  to={token ? "/dashboard" : "/signup"}
  style={{ textDecoration: "none" }}
>
  <button
    className="btn btn-primary"
    style={{
      padding: "1.1rem 3rem",
      fontSize: "1.2rem",
      fontFamily: "'Playfair Display', 'Georgia', serif",
      letterSpacing: "0.04em",
      borderRadius: "30px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    }}
  >
    {token ? "Go to Dashboard" : "Begin Your Journey"}
  </button>
</Link>
        </div>
      </div>
    </section>
  );
}