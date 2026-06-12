import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import CountdownSection from '../sections/CountdownSection';
import AboutSection from '../sections/AboutSection';
import VideoSection from '../sections/VideoSection';
import SignificadoSection from '../sections/SignificadoSection';
import ServiciosPreviewSection from '../sections/ServiciosPreviewSection';
import TestimoniosSection from '../sections/TestimoniosSection';
import CTAJoinSection from '../sections/CTAJoinSection';
import InstagramGallery from '../sections/InstagramGallery';
import Footer from '../sections/Footer';

export default function Home() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <AboutSection />
      <VideoSection />
      <SignificadoSection />
      <ServiciosPreviewSection />
      <TestimoniosSection />
      <CTAJoinSection />
      <InstagramGallery />
      <Footer />
    </div>
  );
}
