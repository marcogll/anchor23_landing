import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function TestimoniosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();
  const items = (t('testimonios.items') as unknown) as Array<{ quote: string; name: string; stars: number }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { letterSpacing: '-5px', opacity: 0 }, { letterSpacing: '1.5px', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 + index * 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-[80px] md:py-[120px]">
      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        <h2 ref={headingRef} className="font-display text-[28px] md:text-[40px] uppercase tracking-[1.5px] text-charcoal text-center mb-12 md:mb-16 opacity-0" style={{ whiteSpace: 'nowrap' }}>
          {t('testimonios.title') as string}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((testimonial, index) => (
            <div key={index} ref={(el) => { cardsRef.current[index] = el; }} className="bg-bone p-8 md:p-10 text-center opacity-0">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} size={18} className="text-earth fill-earth" />
                ))}
              </div>
              <p className="font-body text-[18px] md:text-[20px] italic text-charcoal/70 leading-[1.6] mb-6">"{testimonial.quote}"</p>
              <p className="font-display text-[14px] uppercase tracking-[1.5px] text-charcoal">— {testimonial.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/membresias" className="inline-block font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal px-8 py-3 hover:bg-earth transition-colors duration-300">
            {t('testimonios.cta') as string}
          </a>
        </div>
      </div>
    </section>
  );
}
