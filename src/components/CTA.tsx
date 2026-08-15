import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.fromTo(
          section.querySelector('.cta-bg'),
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
        ).fromTo(
          section.querySelectorAll('.cta-word > span'),
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
          },
          '-=0.6'
        );
      },
    });
    return () => st.kill();
  }, [reduced]);

  const words = ['YOUR', 'STRONGEST', 'SELF', 'AWAITS.'];

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-forge-bg"
    >
      <div
        className="cta-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/6389516/pexels-photo-6389516.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          opacity: 0,
          filter: 'brightness(0.3)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forge-bg via-forge-bg/50 to-forge-bg" />

      <div className="relative z-10 text-center px-6">
        <div className="text-xs uppercase tracking-[0.4em] text-forge-accent mb-6">
          No Excuses. Just Results.
        </div>
        <div className="font-display text-5xl sm:text-7xl md:text-8xl text-white leading-[0.9]">
          {words.map((w, i) => (
            <div key={i} className="cta-word overflow-hidden">
              <span
                className={`inline-block ${
                  i === 3 ? 'text-forge-accent' : 'text-white'
                }`}
              >
                {w}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <MagneticButton
            href="#membership"
            as="a"
            className="px-10 py-5 bg-forge-accent text-white text-sm uppercase tracking-widest font-semibold hover:bg-forge-accent-dim transition-colors"
          >
            Join Now
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
