import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { places } from "../../data/destinationsData";

import MapComponent from "../../components/destinations/MapComponent";



export default function DestinationPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("todo"); // Values: "todo", "eat", "stay"

 

  useEffect(() => {

    window.scrollTo(0, 0);

  }, [id]);



  const place = places?.find(

    (p) => p.id === id || p.name.toLowerCase() === id?.toLowerCase()

  );



  if (!place) {

    return (

      <div style={{ padding: "5rem", textAlign: "center", background: "#f8fafc", minHeight: "100vh" }}>

        <h2 className="cinzel" style={{ marginBottom: "1rem" }}>Destination Info Coming Soon</h2>

        <button onClick={() => navigate("/")} style={{ background: "#333", color: "#fff", padding: "0.75rem 1.5rem", border: "none", borderRadius: "8px", cursor: "pointer" }}>

          ← Back to Landing Page

        </button>

      </div>

    );

  }



  const descriptionText = place.description || `Explore local attractions, trip itineraries, and popular landmarks around the region.`;



  // Dynamic Content Array Selection based on your current state tab

  const activeCategories = place[activeTab] || [];



  // Icon Helper to display contextual prefixes

  const getTabIcon = () => {

    if (activeTab === "eat") return "🍲 Try ";

    if (activeTab === "stay") return "🏨 Book ";

    return "🌟 Explore ";

  };



  return (

    <div style={{

      display: "flex",

      width: "100vw",

      height: "100vh",

      overflow: "hidden",

      background: "var(--bg)",

      fontFamily: "system-ui, sans-serif"

    }}>

     

      {/* LEFT PANEL: SCROLLABLE TRAVEL GUIDE */}

      <div style={{ width: "55%", height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>

       

       {/* Hero Image Banner Container */}
  <div style={{
    position: "relative",
    minHeight: "52vh",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${place.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",    
    textAlign: "center",
    padding: "3rem 4rem"
  }}>
    
    {/* ACTIVE BACK BUTTON */}
    <button
      onClick={() => navigate(-1)} // -1 sends the user back one step in history, preserving scroll state
      style={{
        position: "absolute",
        top: "1.5rem",
        left: "2rem",
        color: "#ffffff",
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "0.5rem 1.1rem",
        borderRadius: "20px",
        fontWeight: "600",
        fontSize: "0.85rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        transition: "background 0.2s",
        zIndex: 10 // Ensures it sits above overlay masks
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.35)"}
    >
      ← Back
    </button>
    
    



<div

  style={{

    position: "absolute",

    top: "8px",

    right: "10px",

    display: "flex",

    alignItems: "center",

    gap: "14px",

  }}

>

  {token ? (

    <>

      <button

        onClick={() => navigate("/dashboard")}

        style={{

          background: "transparent",

          border: "none",

          color: "#fff",

          fontWeight: "600",

          fontSize: "0.9rem",

          cursor: "pointer",

        }}

      >

        Dashboard

      </button>



      <button

        onClick={() => {

          localStorage.removeItem("token");

          navigate("/");

        }}

        style={{

          background: "#fff",

          color: "var(--text-dark)",

          border: "none",

          borderRadius: "24px",

          padding: "8px 18px",

          fontWeight: "600",

          cursor: "pointer",

        }}

      >

        Logout

      </button>

    </>

  ) : (

    <>

      <button

        onClick={() => navigate("/login")}

        style={{

          background: "transparent",

          border: "none",

          color: "#fff",

          fontWeight: "600",

          fontSize: "0.9rem",

          cursor: "pointer",

        }}

      >

        Login

      </button>



      <button

        onClick={() => navigate("/signup")}

        style={{

          background: "#fff",

          color: "var(--text-dark)",

          border: "none",

          borderRadius: "24px",

          padding: "8px 18px",

          fontWeight: "600",

          cursor: "pointer",

        }}

      >

        Sign Up

      </button>

    </>

  )}

</div>



          <h1 className="cinzel" style={{

            color: "#ffffff",

            fontSize:

  place.name.length > 20

    ? "2rem"

    : place.name.length > 15

    ? "2.3rem"

    : place.name.length > 10

    ? "2.6rem"

    : "3.2rem",

    maxWidth: "70%",

            fontWeight: "700",

            margin: "0 0 1rem 0",

            textTransform: "uppercase",

            letterSpacing: "0.1em"

          }}>

            {place.name}

          </h1>



          <p style={{

            color: "rgba(255,255,255,0.92)",

            maxWidth: "680px",

            fontSize: "1rem",

            lineHeight: "1.65",

            margin: 0,

            fontWeight: "400"

          }}>

            {descriptionText}

          </p>

        </div>



        {/* Action Category Tab Row */}

        <div style={{ padding: "2rem 3rem 0", background: "var(--bg-card)" }}>

          <div style={{ display: "flex", gap: "0.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.25rem" }}>

            <button

              onClick={() => setActiveTab("todo")}

              style={{

                backgroundColor: activeTab === "todo" ? "var(--accent)" : "transparent",

                color: activeTab === "todo" ? "#ffffff" : "var(--text-dim)",

                border: "none", padding: "0.6rem 1.2rem", borderRadius: "20px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s"

              }}>

              📍 What to do

            </button>

            <button

              onClick={() => setActiveTab("eat")}

              style={{

                backgroundColor: activeTab === "eat" ? "var(--accent)" : "transparent",

                color: activeTab === "eat" ? "#ffffff" : "var(--text-dim)",

                border: "none", padding: "0.6rem 1.2rem", borderRadius: "20px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s"

              }}>

              🍴 What to eat

            </button>

            <button

              onClick={() => setActiveTab("stay")}

              style={{

                backgroundColor: activeTab === "stay" ? "var(--accent)" : "transparent",

                color: activeTab === "stay" ? "#ffffff" : "var(--text-dim)",

                border: "none", padding: "0.6rem 1.2rem", borderRadius: "20px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s"

              }}>

              🛏️ Where to stay

            </button>

          </div>

        </div>



        {/* Dynamic Categories Grid Content */}

        <div style={{ padding: "2.5rem 3rem", background: "var(--bg-card)", flex: 1 }}>

          <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text)", marginBottom: "1.25rem" }}>

            {activeTab === "todo" && "What to do"}

            {activeTab === "eat" && "Where to eat"}

            {activeTab === "stay" && "Where to stay"}

          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>

            {activeCategories.map((cat, index) => (

              <div key={index} style={{

                padding: "1.25rem", background: "var(--bg-subtle)", borderRadius: "12px", border: "1px solid var(--border)", fontWeight: "500", color: "var(--text)"

              }}>

                {getTabIcon()}{cat}

              </div>

            ))}

          </div>

        </div>

      </div>



      {/* RIGHT PANEL: LIVE INTERACTIVE GOOGLE MAP */}

      <div style={{ width: "45%", height: "100%" }}>

        <MapComponent selectedDestination={place.name} />

      </div>

    </div>

   

  );

}