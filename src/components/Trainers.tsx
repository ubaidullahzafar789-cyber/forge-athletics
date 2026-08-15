import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: 'MARCUS HALE',
    role: 'Head Strength Coach',
    img: 'https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&w=800',
    spec: 'Powerlifting • Olympic Lifting',
  },
  {
    name: 'ELENA VOSS',
    role: 'Conditioning Specialist',
    img: 'https://images.pexels.com/photos/4753995/pexels-photo-4753995.jpeg?auto=compress&cs=tinysrgb&w=800',
    spec: 'HIIT • Metabolic Conditioning',
  },
  {
    name: 'JAKE ROURKE',
    role: 'Mobility & Recovery',
    img: 'https://images.pexels.com/photos/11041241/pexels-photo-11041241.jpeg?auto=compress&cs=tinysrgb&w=800',
    spec: 'Mobility • Injury Prevention',
  },
];

export default function Trainers() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const cards = section.querySelectorAll('.trainer-card');
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cards,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      },
    });
    return () => st.kill();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="trainers"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-forge-bg overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.4em] text-forge-accent mb-4">
            The Team
          </div>
          <TextReveal
            text="COACHES WHO BUILD CHAMPIONS"
            className="font-display text-4xl sm:text-6xl lg:text-7xl text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {trainers.map((t, i) => (
            <div
              key={i}
              className="trainer-card group relative overflow-hidden h-[520px]"
              style={{ opacity: reduced ? 1 : 0 }}
              data-cursor="link"
              data-cursor-text="VIEW"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${t.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forge-bg via-forge-bg/20 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <div className="text-xs uppercase tracking-[0.3em] text-forge-accent mb-2">
                  {t.spec}
                </div>
                <h3 className="font-display text-3xl text-white mb-1">
                  {t.name}
                </h3>
                <p className="text-sm text-forge-muted">{t.role}</p>
              </div>
              <div className="absolute top-6 right-6 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 group-hover:border-forge-accent group-hover:text-forge-accent transition-colors">
                <span className="text-xs">0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
