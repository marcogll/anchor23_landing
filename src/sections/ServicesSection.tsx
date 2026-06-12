import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const items = (t('catalog.items') as unknown) as { title: string; desc: string; price: string; duration: string }[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { letterSpacing: '-5px', opacity: 0 }, { letterSpacing: '2px', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      const els = sectionRef.current?.querySelectorAll('.service-item');
      if (els) gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bone py-[80px] md:py-[120px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <h2 ref={headingRef} className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-charcoal text-center mb-12 md:mb-16 opacity-0" style={{ whiteSpace: 'nowrap' }}>
          {t('catalog.title') as string}
        </h2>
        <div>
          {items.map((service, index) => (
            <div key={index} className={`service-item border-b border-charcoal/10 opacity-0 ${index === 0 ? 'border-t' : ''}`}>
              <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} className="w-full flex items-center justify-between py-6 md:py-8 group cursor-pointer text-left">
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-display text-[18px] md:text-[24px] uppercase tracking-[1px] text-charcoal group-hover:text-earth transition-colors duration-300">{service.title}</span>
                  <span className="hidden md:inline-block font-display text-[12px] uppercase tracking-[1px] text-charcoal/40">{service.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-[14px] uppercase tracking-[1px] text-earth">{service.price}</span>
                  <span className={`text-charcoal text-[24px] transition-transform duration-300 ${expandedIndex === index ? 'rotate-45' : ''}`}>+</span>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ease-in-out ${expandedIndex === index ? 'max-h-[400px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                <p className="font-body text-[16px] md:text-[18px] text-charcoal/60 leading-[1.6] mb-3">{service.desc}</p>
                <div className="flex gap-6 md:hidden">
                  <span className="font-display text-[12px] uppercase tracking-[1.5px] text-charcoal/50">{service.duration}</span>
                </div>
                <a href="/join-us" className="inline-block mt-4 font-display text-[12px] uppercase tracking-[2px] text-earth border-b border-earth pb-0.5 hover:text-charcoal hover:border-charcoal transition-colors duration-300">
                  {t('catalog.book') as string}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
