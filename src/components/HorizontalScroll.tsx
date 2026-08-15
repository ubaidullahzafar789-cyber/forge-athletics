import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: 'STRENGTH',
    desc: 'Build the foundation. Heavy compound lifts, progressive overload.',
    img: 'https://images.pexels.com/photos/2261481/pexels-photo-2261481.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'POWER',
    desc: 'Explosive force. Olympic lifts, plyometrics, athletic development.',
    img: 'https://images.pexels.com/photos/17944268/pexels-photo-17944268.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'MOBILITY',
    desc: 'Move freely. Joint health, flexibility, injury prevention.',
    img: 'https://images.pexels.com/photos/6390225/pexels-photo-6390225.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'CONDITIONING',
    desc: 'Build the engine. High-intensity intervals, metabolic conditioning.',
    img: 'https://images.pexels.com/photos/7188069/pexels-photo-7188069.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    title: 'PERFORMANCE',
    desc: 'Compete and excel. Sport-specific training, peak preparation.',
    img: 'https://images.pexels.com/photos/4720793/pexels-photo-4720793.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reduced) return;

    if (isTouch) {
      // On touch, use native horizontal scroll — no pinning
      return;
    }

    const totalWidth = track.scrollWidth;
    const distance = totalWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, isTouch]);

  return (
    <section
      ref={sectionRef}
      id="train"
      className={`relative bg-forge-bg ${isTouch ? 'overflow-x-auto' : 'overflow-hidden'}`}
      style={isTouch ? {} : { height: '100vh' }}
    >
      <div className="absolute top-10 left-6 sm:left-10 z-10">
        <div className="text-xs uppercase tracking-[0.4em] text-forge-accent mb-2">
          Train Different
        </div>
        <h2 className="font-display text-4xl sm:text-6xl text-white">
          THE METHOD
        </h2>
      </div>

      <div
        ref={trackRef}
        className={`flex gap-6 sm:gap-10 items-center h-full ${
          isTouch ? 'w-max px-6 pt-24' : 'px-[10vw]'
        }`}
        style={isTouch ? { scrollSnapType: 'x mandatory' } : {}}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="h-card relative flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[42vw] h-[60vh] sm:h-[70vh] overflow-hidden group"
            style={isTouch ? { scrollSnapAlign: 'center' } : {}}
            data-cursor="link"
            data-cursor-text="VIEW"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forge-bg via-forge-bg/30 to-transparent" />
            <div className="absolute bottom-0 p-8 sm:p-10">
              <div className="font-display text-sm text-forge-accent mb-2">
                0{i + 1}
              </div>
              <h3 className="font-display text-4xl sm:text-6xl text-white mb-3">
                {item.title}
              </h3>
              <p className="text-forge-muted max-w-md">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
