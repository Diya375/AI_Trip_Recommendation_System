import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import temple from "../assets/images/Nepali-Temple.jpg";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password });
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${temple})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

      {/* Glass card */}
      <div className="relative z-10 w-[450px] px-11 py-12 rounded-3xl border border-white/20 bg-white/[0.08] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] text-white text-center">

        <h1 className="font-['Cinzel',serif] text-5xl tracking-widest mb-2">
          Join YatraVerse
        </h1>

        <p className="font-['Cinzel',serif] text-sm opacity-90 mb-9">
          Begin Your Himalayan Journey 🇳🇵
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-4 mb-5 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-500 text-base outline-none focus:ring-2 focus:ring-white/50"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-4 mb-5 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-500 text-base outline-none focus:ring-2 focus:ring-white/50"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-4 mb-6 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-500 text-base outline-none focus:ring-2 focus:ring-white/50"
        />

        <button
          onClick={handleSignup}
          className="w-full py-4 rounded-2xl bg-white/20 hover:bg-white/30 active:bg-white/10 text-white font-['Cinzel',serif] text-lg backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer"
        >
          Create Your Journey
        </button>

        <p
          onClick={() => navigate("/login")}
          className="mt-6 text-sm opacity-80 hover:opacity-100 cursor-pointer transition-opacity duration-150"
        >
          Already a traveler?{" "}
          <span className="underline underline-offset-2">Login</span>
        </p>
      </div>
    </div>
  );
}