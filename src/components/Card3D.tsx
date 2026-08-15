import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxRotate?: number;
}

export default function Card3D({
  children,
  className = '',
  maxRotate = 8,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * maxRotate;
    const ry = (px - 0.5) * 2 * maxRotate;

    gsap.to(ref.current, {
      rotateX: rx,
      rotateY: ry,
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    });

    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      transformPerspective: 800,
    });
  };

  return (
    <div
      ref={ref}
      className={`card-3d ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="link"
      data-cursor-text="EXPLORE"
    >
      <div className="card-3d-inner relative">{children}</div>
      <div className="card-3d-shine" />
    </div>
  );
}
