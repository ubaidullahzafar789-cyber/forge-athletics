import { useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Intro from '@/components/Intro';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Programs from '@/components/Programs';
import HorizontalScroll from '@/components/HorizontalScroll';
import PinnedSection from '@/components/PinnedSection';
import Trainers from '@/components/Trainers';
import Membership from '@/components/Membership';
import Gallery from '@/components/Gallery';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Intro onComplete={handleIntroComplete} />
      <CustomCursor />
      <ScrollProgress />
      <SmoothScroll>
        <Navigation />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Programs />
          <HorizontalScroll />
          <PinnedSection />
          <Trainers />
          <Membership />
          <Gallery />
          <CTA />
        </main>
        <Footer />
        {introDone && <FloatingElements />}
      </SmoothScroll>
    </>
  );
}
