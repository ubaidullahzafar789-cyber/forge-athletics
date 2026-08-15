import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  'STRENGTH',
  'PERFORMANCE',
  'DISCIPLINE',
  'PROGRESS',
  'POWER',
  'ENDURANCE',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    // Duplicate content for seamless loop
    const content = track.innerHTML;
    track.innerHTML = content + content;

    let direction = 1;
    const scroll = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        direction = self.direction === 1 ? 1 : -1;
      },
    });

    let rafId: number;
    const animate = () => {
      scroll.val += direction * 0.6;
      const maxScroll = track.scrollWidth / 2;
      if (scroll.val >= maxScroll) scroll.val = 0;
      if (scroll.val <= -maxScroll) scroll.val = 0;
      gsap.set(track, { x: -scroll.val });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      st.kill();
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <div className="relative py-8 bg-forge-bg overflow-hidden border-y border-white/5">
      <div ref={trackRef} className="marquee-track">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 px-12 font-display text-5xl sm:text-7xl text-white/90"
          >
            <span>{item}</span>
            <span className="text-forge-accent">—</span>
          </div>
        ))}
      </div>
    </div>
  );
}
