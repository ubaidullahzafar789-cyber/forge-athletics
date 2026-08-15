import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from './Hero3D';
import MagneticButton from './MagneticButton';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG =
  'https://images.pexels.com/photos/6389516/pexels-photo-6389516.jpeg?auto=compress&cs=tinysrgb&w=1600';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Mouse parallax
    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x, y };
    };

    if (!isTouch && !reduced) {
      window.addEventListener('mousemove', onMouse, { passive: true });
    }

    // Hero text reveal on load
    if (!reduced) {
      const words = headlineRef.current?.querySelectorAll('.reveal-word > span');
      if (words) {
        gsap.fromTo(
          words,
        { y: '120%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          delay: 1.0,
          ease: 'power4.out',
        });
      }
      gsap.fromTo(
        canvasWrapRef.current,
        { opacity: 0, rotation: -20, scale: 0.8 },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          delay: 1.5,
          ease: 'power3.out',
        }
      );
      gsap.fromTo(
        section.querySelector('.hero-cta'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.8,
          ease: 'power3.out',
        }
      );
    }

    // Scroll-linked parallax + hero transformation
    if (!reduced) {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          scrollRef.current = self.progress;
          const p = self.progress;
          gsap.set(bgRef.current, {
            yPercent: p * 30,
            scale: 1 + p * 0.15,
          });
          gsap.set(midRef.current, { yPercent: p * 15 });
          gsap.set(contentRef.current, {
            yPercent: p * 40,
            opacity: 1 - p * 1.4,
          });
          gsap.set(headlineRef.current, {
            yPercent: p * 20,
          });
        },
      });

      // Mouse-based layer parallax via rAF
      let rafId: number;
      const parallax = () => {
        if (!reduced && !isTouch) {
          const { x, y } = mouseRef.current;
          gsap.to(bgRef.current, {
            x: x * 15,
            y: y * 15 + scrollRef.current * 0,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(midRef.current, {
            x: x * 30,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(contentRef.current, {
            x: x * -8,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
        rafId = requestAnimationFrame(parallax);
      };
      rafId = requestAnimationFrame(parallax);

      return () => {
        window.removeEventListener('mousemove', onMouse);
        st.kill();
        cancelAnimationFrame(rafId);
      };
    }

    return () => window.removeEventListener('mousemove', onMouse);
  }, [reduced, isTouch]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-forge-bg"
      style={{ perspective: '1200px' }}
    >
      {/* Layer 1: Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ zIndex: 1 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            filter: 'brightness(0.35) contrast(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forge-bg/40 via-transparent to-forge-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-bg/60 via-transparent to-forge-bg/40" />
      </div>

      {/* Layer 2: Atmospheric particles / grid */}
      <div
        ref={midRef}
        className="absolute inset-0 will-change-transform"
        style={{ zIndex: 2 }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Floating accent dots */}
        <div className="absolute top-1/4 left-[12%] w-2 h-2 rounded-full bg-forge-accent float-element" />
        <div className="absolute top-2/3 right-[15%] w-1.5 h-1.5 rounded-full bg-forge-gold float-element" />
        <div className="absolute top-1/3 right-[8%] w-1 h-1 rounded-full bg-white/40 float-element" />
      </div>

      {/* Layer 3: 3D Canvas */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0"
        style={{ zIndex: 3, opacity: 0 }}
      >
        <Hero3D mouseRef={mouseRef} scrollRef={scrollRef} />
      </div>

      {/* Layer 4: Foreground content */}
      <div
        ref={contentRef}
        className="relative h-full flex flex-col items-center justify-center text-center px-6 will-change-transform"
        style={{ zIndex: 4 }}
      >
        <div className="mb-6 overflow-hidden">
          <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-forge-accent font-medium">
            Est. 2016 — Strength Redefined
          </span>
        </div>

        <div ref={headlineRef} className="font-display leading-[0.85]">
          <div className="overflow-hidden">
            <span className="reveal-word block sm:inline-block">
              <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white block">
                BUILD
              </span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-word block sm:inline-block">
              <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white/70 block">
                YOUR
              </span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-word block sm:inline-block">
              <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white block">
                STRONGEST
              </span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-word block sm:inline-block">
              <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-forge-accent block">
                SELF.
              </span>
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 hero-cta" style={{ opacity: 0 }}>
          <MagneticButton
            href="#membership"
            as="a"
            className="px-8 py-4 bg-forge-accent text-white text-sm uppercase tracking-widest font-semibold hover:bg-forge-accent-dim transition-colors"
          >
            Start Your Journey
          </MagneticButton>
          <MagneticButton
            href="#programs"
            as="a"
            className="px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest font-semibold hover:border-white transition-colors"
          >
            Explore Programs
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-forge-muted">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-forge-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}
