import Navbar from '../../components/common/Navbar';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import AISection from '../../components/ai/AISection';
import DestinationCards from '../../components/destinations/DestinationCards';
import Footer from '../../components/common/Footer';
import { Compass, ShieldCheck, Sparkles, Users } from 'lucide-react';

const highlights = [
  {
    icon: Compass,
    title: 'Plan smarter',
    text: 'Discover destinations, organize itineraries, and keep every trip detail in one place.',
  },
  {
    icon: Sparkles,
    title: 'Travel with AI',
    text: 'Get personalized recommendations, smart budget ideas, and trip support in seconds.',
  },
  {
    icon: ShieldCheck,
    title: 'Travel with confidence',
    text: 'Stay organized with shared plans, expense tracking, and a smoother group experience.',
  },
  {
    icon: Users,
    title: 'Built for groups',
    text: 'Coordinate with friends, split expenses, and make shared travel planning effortless.',
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <section id="about" className="scroll-mt-24 bg-[var(--bg)] px-4 py-16 text-[var(--text)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[var(--border)]/60 bg-[var(--bg-card)] p-8 shadow-[0_14px_40px_rgba(75,119,98,0.12)] sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              About YatraVerse
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[var(--text)] sm:text-4xl">
              Your AI travel companion for unforgettable journeys.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-dim)]">
              YatraVerse helps travelers plan, organize, and enjoy every trip with ease. From discovering destinations to managing group expenses, our platform brings everything together in one simple experience.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--border)]/70 bg-[var(--bg-subtle)] p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Features />
      <AISection />
      <DestinationCards />
      <Footer />
    </>
  );
}