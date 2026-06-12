import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function ServiciosPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();
  const items = (t('services.items') as unknown) as Array<{ title: string; description: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { letterSpacing: '-5px', opacity: 0 }, { letterSpacing: '2px', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 + index * 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const images = ['/images/insta-1.jpg', '/images/insta-2.jpg', '/images/insta-3.jpg'];

  return (
    <section ref={sectionRef} className="bg-bone py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 ref={headingRef} className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-charcoal text-center mb-12 md:mb-16 opacity-0" style={{ whiteSpace: 'nowrap' }}>
          {t('services.title') as string}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {items.map((service, index) => (
            <div key={index} ref={(el) => { cardsRef.current[index] = el; }} className="bg-cream opacity-0 group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={images[index]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-[18px] uppercase tracking-[1.5px] text-charcoal mb-3">{service.title}</h3>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.6]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/servicios" className="inline-block font-display text-[14px] tracking-[2px] uppercase text-charcoal border border-charcoal px-8 py-3 hover:bg-charcoal hover:text-cream transition-all duration-300">
            {t('services.cta') as string}
          </Link>
        </div>
      </div>
    </section>
  );
}
