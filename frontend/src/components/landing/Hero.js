import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import npmountImg  from "../../assets/images/Nepali_mountain.jpg";
import kathmanduImg from "../../assets/images/Nepal-mountain.jpg";
import janakiImg   from "../../assets/images/Janaki-temple.jpg";
import bandipurImg from "../../assets/images/VALLEY.jpg";
import everImg     from "../../assets/images/Mount_Everest.jpg";

const slideshowImages = [
  { src: npmountImg,   alt: "Top of the World - Lakes & Himalayas" },
  { src: kathmanduImg, alt: "Mountain of Nepal - Natural Heritage" },
  { src: janakiImg,    alt: "Janaki Temple - Cultural Splendor" },
  { src: bandipurImg,  alt: "Valley - Deep valley of Nepal" },
  { src: everImg,      alt: "Mount Everest" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-8 pt-28 pb-16 overflow-hidden bg-white">

      {/* ── Slideshow images ── */}
      <div className="absolute inset-0 z-0">
        {slideshowImages.map((image, i) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: i === currentIndex ? 1 : 0,
              transform: i === currentIndex ? "scale(1.03)" : "scale(1.00)",
              transition: "opacity 1500ms ease-in-out, transform 6000ms ease-in-out",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(19,25,22,0.8) 85%, #ffffff 110%)",
          }}
        />
      </div>

      {/* ── Hero content ── */}
      <div className="fade-up relative z-20 mt-12 flex flex-col items-center">

        {/* Headline */}
        <h1
          className="cinzel font-bold text-white mb-7 leading-tight"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            letterSpacing: "0.02em",
            textShadow: "0 4px 16px rgba(0,0,0,0.6)",
          }}
        >
          Plan Smarter,<br />
          <span className="text-white">Travel Deeper.</span>
        </h1>

        {/* Subtext */}
        <p
          className="max-w-xl mx-auto mb-14 font-light tracking-wide leading-loose"
          style={{
            fontSize: "1.1rem",
            color: "rgba(245,245,245,0.85)",
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: "0.03em",
            lineHeight: "1.9",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          Traverse epic peaks, historic mountain hamlets, and sweeping gorges down to the
          vibrant heart of ancient heritage. Your journey across Nepal begins here.
        </p>

        {/* CTA */}
        <Link to={token ? "/dashboard" : "/signup"} className="no-underline">
          <button
            className="btn btn-primary rounded-full shadow-lg tracking-wide"
            style={{
              padding: "1.1rem 3rem",
              fontSize: "1.2rem",
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            {token ? "Go to Dashboard" : "Begin Your Journey"}
          </button>
        </Link>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-10">
          {slideshowImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full border-none cursor-pointer transition-all duration-300
                ${i === currentIndex
                  ? "w-6 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}