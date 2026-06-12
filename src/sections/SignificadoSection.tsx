import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function SignificadoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { letterSpacing: '-5px', opacity: 0 }, { letterSpacing: '2px', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 + index * 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bone py-[100px] md:py-[160px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 ref={headingRef} className="font-display text-[32px] md:text-[48px] uppercase tracking-[2px] text-charcoal text-center mb-16 md:mb-24 opacity-0">
          {t('significado.title') as string}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div ref={(el) => { cardsRef.current[0] = el; }} className="bg-cream p-10 md:p-16 opacity-0">
            <h3 className="font-display text-[40px] md:text-[56px] uppercase tracking-[4px] text-charcoal mb-6">{t('significado.anchor') as string}</h3>
            <p className="font-body text-[18px] md:text-[20px] text-charcoal/60 leading-[1.8]">{t('significado.anchorText') as string}</p>
          </div>
          <div ref={(el) => { cardsRef.current[1] = el; }} className="bg-cream p-10 md:p-16 opacity-0">
            <h3 className="font-display text-[40px] md:text-[56px] uppercase tracking-[4px] text-charcoal mb-6">{t('significado.twentyThree') as string}</h3>
            <p className="font-body text-[18px] md:text-[20px] text-charcoal/60 leading-[1.8]">{t('significado.twentyThreeText') as string}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
