import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: 'viewport' | 'load';
  stagger?: number;
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  trigger = 'viewport',
  stagger = 0.08,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.reveal-word > span');

    if (reduced) {
      gsap.set(words, { y: 0 });
      return;
    }

    if (trigger === 'load') {
      gsap.fromTo(
        words,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger,
          delay,
          ease: 'power4.out',
        }
      );
      return;
    }

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          words,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger,
            delay,
            ease: 'power4.out',
          }
        );
      },
    });

    return () => st.kill();
  }, [delay, reduced, stagger, trigger]);

  const wordArray = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {wordArray.map((word, i) => (
        <span key={i} className="reveal-word">
          <span>{word}&nbsp;</span>
        </span>
      ))}
    </div>
  );
}
