import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'FORGE',
    price: 49,
    features: [
      '24/7 Gym Access',
      '2 Group Classes / Week',
      'Fitness Assessment',
      'Locker Room Access',
    ],
    featured: false,
  },
  {
    name: 'FORGE PRO',
    price: 99,
    features: [
      'Everything in Forge',
      'Unlimited Group Classes',
      '1 PT Session / Month',
      'Nutrition Plan',
      'Recovery Suite Access',
    ],
    featured: true,
  },
  {
    name: 'ELITE',
    price: 199,
    features: [
      'Everything in Forge Pro',
      'Weekly 1-on-1 Coaching',
      'Custom Programming',
      'InBody Composition Scan',
      'Priority Booking',
    ],
    featured: false,
  },
];

export default function Membership() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const cards = section.querySelectorAll('.plan-card');
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
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
      id="membership"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-forge-surface overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.4em] text-forge-accent mb-4">
            Choose Your Path
          </div>
          <TextReveal
            text="MEMBERSHIP PLANS"
            className="font-display text-5xl sm:text-7xl text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`plan-card relative p-8 border ${
                plan.featured
                  ? 'border-forge-accent bg-forge-bg scale-105'
                  : 'border-white/10 bg-forge-bg/50'
              }`}
              style={{ opacity: reduced ? 1 : 0 }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-forge-accent text-white text-[10px] uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-2xl text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-display text-5xl text-white">
                  ${plan.price}
                </span>
                <span className="text-forge-muted text-sm">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm text-forge-text/80"
                  >
                    <span className="w-1 h-1 bg-forge-accent rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
              <MagneticButton
                href="#"
                as="a"
                className={`w-full justify-center px-6 py-3 text-sm uppercase tracking-widest font-semibold ${
                  plan.featured
                    ? 'bg-forge-accent text-white hover:bg-forge-accent-dim'
                    : 'border border-white/30 text-white hover:border-white'
                } transition-colors`}
              >
                Join {plan.name}
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
