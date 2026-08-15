import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card3D from './Card3D';
import TextReveal from './TextReveal';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    title: 'STRENGTH',
    desc: 'Barbell-focused programming to build raw, functional power. Squat, deadlift, press — master the fundamentals.',
    img: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: '01',
  },
  {
    title: 'HYPERTROPHY',
    desc: 'Sculpt and grow. Isolation and compound volume work designed for serious muscle development.',
    img: 'https://images.pexels.com/photos/4753885/pexels-photo-4753885.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: '02',
  },
  {
    title: 'CONDITIONING',
    desc: 'Engine-building metcons, intervals, and conditioning circuits that forge relentless stamina.',
    img: 'https://images.pexels.com/photos/4164516/pexels-photo-4164516.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: '03',
  },
  {
    title: 'MOBILITY',
    desc: 'Move better, recover faster. Targeted mobility and recovery protocols for longevity in training.',
    img: 'https://images.pexels.com/photos/6390225/pexels-photo-6390225.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: '04',
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const cards = section.querySelectorAll('.program-card');
    cards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power3.out',
            }
          );
        },
      });
      return () => st.kill();
    });
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-forge-surface overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-forge-accent mb-4">
              What We Offer
            </div>
            <TextReveal
              text="TRAIN WITH PURPOSE"
              className="font-display text-5xl sm:text-7xl text-white"
            />
          </div>
          <p className="text-forge-muted max-w-sm">
            Four pillars of athletic development. Every program is coach-led and
            tailored to your level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p) => (
            <div key={p.tag} className="program-card" style={{ opacity: reduced ? 1 : 0 }}>
              <Card3D className="h-full">
                <div className="relative h-[420px] overflow-hidden bg-forge-bg group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forge-bg via-forge-bg/40 to-transparent" />
                  <div className="absolute top-5 right-5 font-display text-sm text-forge-accent">
                    {p.tag}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-3xl text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-forge-muted leading-relaxed max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
