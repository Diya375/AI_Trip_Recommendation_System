// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate, Link } from "react-router-dom";

// import anthem from "../assets/audio/reshamfiriri.mp3";



// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();


//   const handleSignup = async () => {

 
//     setError("");
//     try {
//       await API.post("/auth/signup", { name, email, password });
//       navigate("/verify", { state: { email } });
//     } catch (err) {
//       setError(err.response?.data?.error || "Signup failed");
//     }
//   };

  
//   return (
//     <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <div className="card fade-up" style={{ width: "100%", maxWidth: "420px", padding: "3rem 2.5rem", textAlign: "center" }}>
//         <h1 className="cinzel" style={{ fontSize: "2.2rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
//           Join YatraVerse
//         </h1>
//         <p style={{ color: "var(--text-dim)", marginBottom: "2.5rem", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
//           Begin Your Journey
//         </p>

//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input"
//           />
//         </div>

//         {error && (
//           <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</p>
//         )}

//  {/* <button onClick={beginJourney} className="btn btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>
//           Enter YatraVerse
//         </button> */}

//         <button onClick={handleSignup} className="btn btn-primary" style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}>
//           Create Account
//         </button>

//         <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>
//           Already a traveler?{" "}
//           <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none" }}>
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

import anthem from "../assets/audio/reshamfiriri.mp3";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(anthem);
    audio.volume = 0.75;

    audio.play().catch((err) => {
      console.log("Audio play failed:", err);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleSignup = async () => {
    setError("");

    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      navigate("/verify", {
        state: { email },
      });
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      console.error(err);
    }
  };

  return (
    <div
      className="page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card fade-up"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "3rem 2.5rem",
          textAlign: "center",
        }}
      >
        <h1
          className="cinzel"
          style={{
            fontSize: "2.2rem",
            color: "var(--accent)",
            marginBottom: "0.5rem",
          }}
        >
          Join YatraVerse
        </h1>

        <p
          style={{
            color: "var(--text-dim)",
            marginBottom: "2.5rem",
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
          }}
        >
          Begin Your Journey
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        {error && (
          <p
            style={{
              color: "#e74c3c",
              fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: "0.85rem",
            fontSize: "1rem",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            marginTop: "2rem",
            fontSize: "0.85rem",
            color: "var(--text-dim)",
          }}
        >
          Already a traveler?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}