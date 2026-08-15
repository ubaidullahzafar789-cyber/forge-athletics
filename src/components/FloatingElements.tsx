import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingElements() {
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || isTouch || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.float-element');
    const triggers: ScrollTrigger[] = [];
    elements.forEach((el, i) => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.1');
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.set(el, {
            y: (self.progress - 0.5) * 100 * speed * (i % 2 === 0 ? 1 : -1),
          });
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [reduced, isTouch]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100]">
      <div
        className="float-element absolute top-[120vh] left-[5%] w-24 h-24 rounded-full border border-forge-accent/20 flex items-center justify-center"
        data-speed="0.15"
      >
        <span className="text-[10px] uppercase tracking-widest text-forge-accent/60 rotate-[-20deg]">
          EST. 2016
        </span>
      </div>
      <div
        className="float-element absolute top-[180vh] right-[8%] w-20 h-20 rounded-full border border-forge-gold/20 flex items-center justify-center"
        data-speed="0.2"
      >
        <span className="text-[10px] uppercase tracking-widest text-forge-gold/60">
          24/7
        </span>
      </div>
      <div
        className="float-element absolute top-[280vh] left-[10%] w-16 h-16 border border-white/10"
        data-speed="0.25"
      />
      <div
        className="float-element absolute top-[350vh] right-[12%] w-2 h-2 bg-forge-accent rounded-full"
        data-speed="0.3"
      />
    </div>
  );
}
