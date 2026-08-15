import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion, useIsTouch } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  'https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/14898419/pexels-photo-14898419.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4720800/pexels-photo-4720800.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/685531/pexels-photo-685531.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4164510/pexels-photo-4164510.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/10021279/pexels-photo-10021279.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const triggers: ScrollTrigger[] = [];

    const items = section.querySelectorAll('.gallery-item');
    items.forEach((item, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: item,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              item,
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: (i % 3) * 0.1,
                ease: 'power3.out',
              }
            );
          },
        })
      );
    });

    // Parallax on gallery images
    if (!isTouch) {
      const imgs = section.querySelectorAll('.gallery-img');
      imgs.forEach((img, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(img, {
                yPercent: (self.progress - 0.5) * (i % 2 === 0 ? 15 : -15),
              });
            },
          })
        );
      });
    }

    return () => triggers.forEach((t) => t.kill());
  }, [reduced, isTouch]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-forge-bg overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[0.4em] text-forge-accent mb-4">
            Inside The Forge
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-white">
            THE GRIND
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {gallery.map((src, i) => (
            <div
              key={i}
              className="gallery-item relative overflow-hidden h-[300px] sm:h-[400px] group"
              style={{ opacity: reduced ? 1 : 0 }}
              data-cursor="link"
              data-cursor-text="VIEW"
            >
              <div
                className="gallery-img absolute inset-[-15%] bg-cover bg-center will-change-transform transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forge-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 text-xs uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
