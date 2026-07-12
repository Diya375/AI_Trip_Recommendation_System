import Navbar from '../../components/common/Navbar';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import AISection from '../../components/ai/AISection';
import DestinationCards from '../../components/destinations/DestinationCards';
import Footer from '../../components/common/Footer';

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