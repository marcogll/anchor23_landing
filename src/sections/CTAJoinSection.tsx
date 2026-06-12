import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function CTAJoinSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-charcoal py-[100px] md:py-[160px]">
      <div ref={contentRef} className="max-w-[800px] mx-auto px-6 md:px-8 text-center opacity-0">
        <h2 className="font-display text-[32px] md:text-[48px] uppercase tracking-[2px] text-cream leading-[1.2] mb-6">{t('ctaJoin.title') as string}</h2>
        <p className="font-body text-[18px] md:text-[22px] text-cream/60 leading-[1.8] mb-10">{t('ctaJoin.text') as string}</p>
        <Link to="/invitar" className="inline-block font-display text-[14px] tracking-[2px] uppercase text-charcoal bg-cream px-12 py-5 hover:bg-earth hover:text-cream transition-colors duration-300">
          {t('ctaJoin.cta') as string}
        </Link>
      </div>
    </section>
  );
}
