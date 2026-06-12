import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { letterSpacing: '-5px', opacity: 0 }, { letterSpacing: '2px', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-[100px] md:py-[160px]">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 ref={headingRef} className="font-display text-[32px] md:text-[48px] uppercase tracking-[2px] text-charcoal leading-[1.2] mb-10 opacity-0">
          {t('about.title') as string}
        </h2>
        <div ref={textRef} className="opacity-0">
          <p className="font-display text-[20px] md:text-[24px] uppercase tracking-[1.5px] text-charcoal/80 mb-8">{t('about.subtitle') as string}</p>
          <p className="font-body text-[18px] md:text-[22px] text-charcoal/60 leading-[1.8]">{t('about.text1') as string}</p>
          <p className="font-body text-[18px] md:text-[22px] text-charcoal/60 leading-[1.8] mt-6">{t('about.text2') as string}</p>
          <div className="mt-12">
            <Link to="/historia" className="inline-block font-display text-[14px] tracking-[2px] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-earth hover:border-earth transition-colors duration-300">
              {t('about.cta') as string}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
