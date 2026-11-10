import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import gsap from 'gsap';
import { useLanguage } from '../hooks/useLanguage';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(menuRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleClose = () => {
    gsap.to(menuRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: () => setMenuOpen(false),
    });
  };

  const navLinks = [
    { to: '/', label: t('nav.home') as string },
    { to: '/historia', label: t('nav.about') as string },
    { to: '/servicios', label: t('nav.services') as string },
    { to: '/membresias', label: t('nav.memberships') as string },
    { to: '/join', label: t('nav.work') as string },
    { to: '/espacios', label: t('nav.spaces') as string },
    { to: '/contacto', label: t('nav.contact') as string },
  ];

  const languages: Array<{ code: 'es' | 'en' | 'ko'; label: string }> = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome ? 'bg-bone/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-8 py-5 max-w-[1400px] mx-auto">
          <Link
            to="/"
            className={`font-display text-[18px] tracking-[4px] uppercase hover:opacity-70 transition-opacity duration-300 ${
              scrolled || !isHome ? 'text-charcoal' : 'text-white'
            }`}
          >
            ANCHOR:23
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className={`relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 ${
              scrolled || !isHome ? 'text-charcoal' : 'text-white'
            }`}
            aria-label="Menu"
          >
            <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''} ${scrolled || !isHome ? 'bg-charcoal' : 'bg-white'}`} />
            <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''} ${scrolled || !isHome ? 'bg-charcoal' : 'bg-white'}`} />
            <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''} ${scrolled || !isHome ? 'bg-charcoal' : 'bg-white'}`} />
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      {menuOpen && (
        <>
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-md opacity-0"
            onClick={handleClose}
          />
          <div
            ref={menuRef}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full md:w-[500px] bg-charcoal translate-x-full overflow-y-auto"
          >
            <div className="p-8 md:p-12 min-h-full flex flex-col">
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="relative w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors duration-300"
                  aria-label="Close"
                >
                  <span className="absolute w-6 h-px bg-current rotate-45" />
                  <span className="absolute w-6 h-px bg-current -rotate-45" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-12 flex-1">
                <ul className="space-y-6">
                  {navLinks.map((link, index) => (
                    <li
                      key={link.to}
                      className="opacity-0 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                    >
                      <Link
                        to={link.to}
                        onClick={handleClose}
                        className="font-display text-[28px] md:text-[36px] uppercase tracking-[3px] text-cream hover:text-earth transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA */}
              <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                <Link
                  to="/invitar"
                  onClick={handleClose}
                  className="inline-block font-display text-[14px] tracking-[2px] uppercase text-charcoal bg-cream px-10 py-4 hover:bg-earth hover:text-cream transition-colors duration-300"
                >
                  {t('nav.join') as string}
                </Link>
              </div>

              {/* Language Selector */}
              <div className="mt-12 pt-8 border-t border-cream/20 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <p className="font-display text-[12px] uppercase tracking-[2px] text-cream/40 mb-4">
                  Language / Idioma / 언어
                </p>
                <div className="flex gap-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`font-body text-[14px] tracking-[1px] transition-colors duration-300 ${
                        language === lang.code
                          ? 'text-cream border-b border-cream pb-0.5'
                          : 'text-cream/40 hover:text-cream/70'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                <a
                  href="https://www.instagram.com/anchor23.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/40 hover:text-cream transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-[20px]"></i>
                </a>
                <a
                  href="https://www.facebook.com/anchor23.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/40 hover:text-cream transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook-f text-[20px]"></i>
                </a>
                <a
                  href="https://www.youtube.com/anchor23.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/40 hover:text-cream transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube text-[20px]"></i>
                </a>
                <a
                  href="https://www.pinterest.com/anchor23.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/40 hover:text-cream transition-colors duration-300"
                  aria-label="Pinterest"
                >
                  <i className="fa-brands fa-pinterest-p text-[20px]"></i>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
