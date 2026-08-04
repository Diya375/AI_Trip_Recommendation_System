import { Link } from "react-router-dom";
import { Compass, Sparkles, ShieldCheck, Users } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const highlights = [
  {
    icon: Compass,
    title: "Plan smarter",
    text: "Discover destinations, organize itineraries, and keep every trip detail in one place.",
  },
  {
    icon: Sparkles,
    title: "Travel with AI",
    text: "Get personalized recommendations, smart budget ideas, and trip support in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Travel with confidence",
    text: "Stay organized with shared plans, expense tracking, and a smoother group experience.",
  },
  {
    icon: Users,
    title: "Built for groups",
    text: "Coordinate with friends, split expenses, and make shared travel planning effortless.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-10 lg:p-14">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                About YatraVerse
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Your AI travel companion for unforgettable journeys.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                YatraVerse helps travelers plan, organize, and enjoy every trip with ease. From discovering destinations to managing group expenses, our platform brings everything together in one simple experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Back to Home
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  Start Planning
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
