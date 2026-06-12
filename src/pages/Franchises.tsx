import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useLenis } from '../hooks/useLenis';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Franchises() {
  useLenis();
  const { t } = useLanguage();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { letterSpacing: '-5px', opacity: 0 }, { letterSpacing: '4px', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section className="bg-charcoal min-h-[80vh] flex items-center justify-center">
          <div className="text-center px-6 max-w-[700px] mx-auto">
            <h1 ref={headingRef} className="font-display text-cream text-[36px] md:text-[64px] uppercase tracking-[4px] md:tracking-[6px] leading-[1.1] opacity-0">{t('franchises.title') as string}</h1>
            <div ref={contentRef} className="opacity-0">
              <div className="w-12 h-[1px] bg-earth mx-auto my-8 md:my-12"></div>
              <p className="font-body text-cream/50 text-[18px] md:text-[20px] leading-[1.8] mb-4">{t('franchises.construction') as string}</p>
              <p className="font-body text-cream/30 text-[14px] md:text-[16px] leading-[1.6] mb-10">{t('franchises.constructionDetail') as string}</p>
              <a href="mailto:franquicias@anchor23.mx" className="inline-block font-display text-[12px] tracking-[2px] uppercase text-cream border border-cream/30 px-10 py-4 hover:bg-cream hover:text-charcoal transition-all duration-300">{t('franchises.contactCta') as string}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
