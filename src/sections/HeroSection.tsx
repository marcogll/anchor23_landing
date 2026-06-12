import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo(subheadingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo(cta1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 });
      gsap.fromTo(cta2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero.jpg" alt="ANCHOR:23" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-[1000px]">
        <h1 ref={headingRef} className="font-display text-white text-[48px] md:text-[88px] uppercase tracking-[4px] md:tracking-[8px] leading-[1.1] opacity-0">
          {t('hero.title') as string}
        </h1>
        <h2 ref={subheadingRef} className="font-display text-white/70 text-[20px] md:text-[28px] uppercase tracking-[4px] md:tracking-[6px] mt-6 opacity-0">
          {t('hero.subtitle') as string}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
          <Link ref={cta1Ref} to="/servicios" className="inline-block font-display text-[14px] tracking-[2px] uppercase text-charcoal bg-cream px-10 py-4 hover:bg-white transition-colors duration-300 opacity-0">
            {t('hero.ctaServices') as string}
          </Link>
          <Link ref={cta2Ref} to="/invitar" className="inline-block font-display text-[14px] tracking-[2px] uppercase text-white border border-white px-10 py-4 hover:bg-white hover:text-charcoal transition-all duration-300 opacity-0">
            {t('hero.ctaJoin') as string}
          </Link>
        </div>
      </div>
    </section>
  );
}
