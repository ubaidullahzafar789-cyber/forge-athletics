import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMG =
  'https://images.pexels.com/photos/6388373/pexels-photo-6388373.jpeg?auto=compress&cs=tinysrgb&w=1200';

const stats = [
  { value: 10, suffix: '+', label: 'Years of Excellence' },
  { value: 25, suffix: '+', label: 'Expert Coaches' },
  { value: 5000, suffix: '+', label: 'Members Trained', isComma: true },
  { value: 24, suffix: '/7', label: 'Gym Access' },
];

function StatCounter({
  value,
  suffix,
  label,
  isComma,
}: {
  value: number;
  suffix: string;
  label: string;
  isComma?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const v = Math.round(obj.val);
            el.textContent = (isComma ? v.toLocaleString() : String(v)) + suffix;
          },
        });
      },
    });
    return () => st.kill();
  }, [value, suffix, isComma, reduced]);

  return (
    <div className="border-t border-white/10 pt-6">
      <div
        ref={ref}
        className="font-display text-5xl sm:text-6xl text-white"
      >
        0{suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-forge-muted">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !imgRef.current) return;
    const st = ScrollTrigger.create({
      trigger: imgRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(imgRef.current, {
          yPercent: self.progress * 20 - 10,
        });
      },
    });
    return () => st.kill();
  }, [reduced]);

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-forge-bg overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative overflow-hidden h-[400px] sm:h-[560px]">
            <div
              ref={imgRef}
              className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${ABOUT_IMG})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forge-bg/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em] text-forge-accent">
              The Forge Facility
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-forge-accent mb-6">
              More Than A Gym
            </div>
            <TextReveal
              text="We don't just train bodies. We forge discipline, resilience, and the mindset of champions."
              className="font-display text-3xl sm:text-5xl leading-[1.05] text-white"
              stagger={0.04}
            />
            <p className="mt-8 text-forge-muted leading-relaxed max-w-xl">
              Founded in 2016, FORGE ATHLETICS was built on a single belief:
              that every person carries untapped strength within. Our coaches,
              our facility, and our community exist to draw that strength out —
              rep by rep, day by day.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((s, i) => (
                <StatCounter key={i} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
