import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Train', href: '#train' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Membership', href: '#membership' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (!menuRef.current || !itemsRef.current) return;
    const items = itemsRef.current.querySelectorAll('.menu-item');
    if (open) {
      gsap.to(menuRef.current, {
        clipPath: 'inset(0 0 0 0)',
        duration: 0.5,
        ease: 'power4.inOut',
      });
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'power4.inOut',
      });
    }
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          scrolled
            ? 'bg-forge-bg/80 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          <a
            href="#hero"
            className="font-display text-2xl tracking-wider text-white"
            data-cursor="link"
          >
            FORGE<span className="text-forge-accent">.</span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-sm uppercase tracking-widest text-forge-text/80 hover:text-white transition-colors"
                data-cursor="link"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#membership"
            className="hidden lg:inline-flex items-center px-6 py-2.5 border border-forge-accent/50 text-sm uppercase tracking-widest text-white hover:bg-forge-accent hover:border-forge-accent transition-all duration-300"
            data-cursor="link"
            data-cursor-text="JOIN"
          >
            Join Now
          </a>

          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            data-cursor="link"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[8999] bg-forge-bg flex flex-col items-center justify-center"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <div ref={itemsRef} className="flex flex-col items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="menu-item font-display text-4xl text-white hover:text-forge-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#membership"
            onClick={() => setOpen(false)}
            className="menu-item mt-4 px-8 py-3 bg-forge-accent text-white font-display text-xl tracking-wider"
          >
            JOIN NOW
          </a>
        </div>
      </div>
    </>
  );
}
