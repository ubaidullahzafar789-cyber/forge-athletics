import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useMotionPrefs';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          el.querySelectorAll('.footer-reveal'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
        );
      },
    });
    return () => st.kill();
  }, [reduced]);

  return (
    <footer
      ref={ref}
      className="relative bg-forge-bg border-t border-white/10 px-6 sm:px-10 py-20 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="footer-reveal font-display text-5xl sm:text-7xl text-white mb-4">
              FORGE<span className="text-forge-accent">.</span>
            </div>
            <p className="footer-reveal text-forge-muted max-w-sm">
              Building stronger humans since 2016. More than a gym — a
              community forged in iron.
            </p>
          </div>

          <div className="footer-reveal">
            <h4 className="text-xs uppercase tracking-[0.3em] text-forge-accent mb-4">
              Visit
            </h4>
            <p className="text-forge-muted text-sm leading-relaxed">
              142 Iron Street
              <br />
              Brooklyn, NY 11201
              <br />
              Open 24/7
            </p>
          </div>

          <div className="footer-reveal">
            <h4 className="text-xs uppercase tracking-[0.3em] text-forge-accent mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="#"
                className="nav-link text-forge-muted hover:text-white transition-colors w-max"
                data-cursor="link"
              >
                Instagram
              </a>
              <a
                href="#"
                className="nav-link text-forge-muted hover:text-white transition-colors w-max"
                data-cursor="link"
              >
                TikTok
              </a>
              <a
                href="#"
                className="nav-link text-forge-muted hover:text-white transition-colors w-max"
                data-cursor="link"
              >
                YouTube
              </a>
              <a
                href="#"
                className="nav-link text-forge-muted hover:text-white transition-colors w-max"
                data-cursor="link"
              >
                hello@forge.athletics
              </a>
            </div>
          </div>
        </div>

        <div className="footer-reveal flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <p className="text-xs text-forge-muted">
            © 2026 FORGE ATHLETICS. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-forge-muted">
            <a href="#" className="hover:text-white transition-colors" data-cursor="link">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors" data-cursor="link">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Giant background text */}
      <div className="absolute -bottom-8 left-0 right-0 text-center pointer-events-none overflow-hidden">
        <div className="font-display text-[20vw] leading-none text-white/[0.03] whitespace-nowrap">
          FORGE ATHLETICS
        </div>
      </div>
    </footer>
  );
}
