import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const images = [
  'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/20594780/pexels-photo-20594780.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/13980219/pexels-photo-13980219.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export default function PinnedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const active = Math.min(Math.floor(p * images.length), images.length - 1);

        imgRefs.current.forEach((img, i) => {
          if (!img) return;
          if (i === active) {
            gsap.to(img, { opacity: 1, scale: 1, duration: 0.5 });
          } else if (i < active) {
            gsap.set(img, { opacity: 0, scale: 1.1 });
          } else {
            gsap.set(img, { opacity: 0, scale: 1 });
          }
        });
      },
    });

    return () => st.kill();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-forge-bg"
    >
      {/* Pinned headline */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-white text-center leading-[0.9] mix-blend-difference">
          MORE THAN
          <br />
          <span className="text-forge-accent">A GYM.</span>
        </h2>
      </div>

      {/* Changing images */}
      {images.map((src, i) => (
        <div
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === 0 ? 1 : 0,
            filter: 'brightness(0.4)',
          }}
        />
      ))}

      {/* Image counter */}
      <div className="absolute bottom-10 right-10 z-20 font-display text-white">
        <span className="text-forge-accent">01</span>
        <span className="text-white/30"> / 03</span>
      </div>
    </section>
  );
}
