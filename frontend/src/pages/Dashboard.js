import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mountain from "../assets/images/top.jpg";
 
export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  return (
    
    <div className= "relative min-h-screen bg-cover bg-top text-white p-6 sm:p-10"
          style={{ backgroundImage: `url(${mountain})` }}>

      {/* Sidebar */}
      <div className="w-64 flex flex-col bg-white/[0.06] border-r border-white/10 backdrop-blur-xl px-5 py-8">
        <h1 className="font-['Cinzel',serif] text-2xl tracking-widest mb-1 text-white">
          YatraVerse
        </h1>
        <p className="text-xs text-white/40 mb-10 font-['Cinzel',serif]">AI Travel Companion</p>

        <div className="p-2 grid grid-cols-1 gap-4">
                 <button onClick={() => navigate("/home")} className="p-4 bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3  rounded-xl">
        Home
      </button>

      <button onClick={() => navigate("/explore")} className="p-4 bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl">
        Explore
      </button>

      <button onClick={() => navigate("/planner")} className="p-4 bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl">
        Planner
      </button>

      <button onClick={() => navigate("/expenses")} className="p-4 bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl">
        Expenses
      </button>

      <button onClick={() => navigate("/profile")} className="p-4 bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl">
        Profile
      </button>

      <button onClick={() => navigate("/results")} className="p-4 bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl">
        Results
      </button>

      <button onClick={() => navigate("/assistant")} className="p-4 bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl">
        AI Assistant
      </button>
     </div>


        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="mt-6 w-full py-3 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-300 hover:text-red-200 text-sm font-medium transition-all duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Top bar */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">
          <div>
            <h2 className="font-['Cinzel',serif] text-2xl tracking-wide">Dashboard</h2>
            <p className="text-white/40 text-xs mt-0.5">Your journey at a glance</p>
          </div>
          <div className="flex items-center gap-3 bg-white/[0.06] border border-white/10 px-4 py-2 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">👤</div>
            <span className="text-sm text-white/70">Welcome back, Explorer 🇳🇵</span>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: "Total Trips", value: "12", icon: "🗺️", color: "from-blue-500/20 to-blue-600/10" },
              { label: "AI Suggestions", value: "5", icon: "✨", color: "from-purple-500/20 to-purple-600/10" },
              { label: "Collaborations", value: "3", icon: "🤝", color: "from-emerald-500/20 to-emerald-600/10" },
            ].map(({ label, value, icon, color }) => (
              <div
                key={label}
                className={`bg-gradient-to-br ${color} border border-white/10 rounded-2xl p-6 backdrop-blur-sm`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs text-white/50 uppercase tracking-widest">{label}</span>
                  <span className="text-xl">{icon}</span>
                </div>
                <p className="text-4xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">✨</span>
              <h2 className="font-['Cinzel',serif] text-lg tracking-wide">AI Travel Recommendations</h2>
            </div>
            <div className="space-y-3">
              {[
                { emoji: "🏔️", place: "Pokhara", desc: "Best for relaxation & adventure", tag: "Nepal" },
                { emoji: "🏝️", place: "Bali", desc: "Best for beach + budget travel", tag: "Indonesia" },
                { emoji: "🏙️", place: "Tokyo", desc: "Best for tech + culture experience", tag: "Japan" },
              ].map(({ emoji, place, desc, tag }) => (
                <div
                  key={place}
                  className="flex items-center justify-between p-4 bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-150 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <p className="font-semibold text-white group-hover:text-white/90">{place}</p>
                      <p className="text-xs text-white/50 mt-0.5">{desc}</p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/60">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}