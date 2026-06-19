import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AISection from "../components/AISection";
import DestinationCards from "../components/DestinationCards";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <AISection />
      <DestinationCards />
      <Footer />
    </>
  );
}