import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete();
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      0.2
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power3.inOut' },
        0.5
      )
      .to([logoRef.current, lineRef.current], {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.05,
      })
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.6,
          ease: 'power4.inOut',
        },
        '>-0.1'
      );

    return () => {
      tl.kill();
    };
  }, [onComplete, reduced]);

  if (done) return null;

  return (
    <div ref={overlayRef} className="intro-overlay">
      <div
        ref={logoRef}
        className="font-display text-5xl sm:text-7xl tracking-wider text-white"
        style={{ opacity: 0 }}
      >
        FORGE
      </div>
      <div
        ref={lineRef}
        className="intro-line mt-6 w-32 sm:w-48"
        style={{ opacity: 1 }}
      />
    </div>
  );
}
