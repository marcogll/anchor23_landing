import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function BookSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { letterSpacing: '-5px', opacity: 0 }, { letterSpacing: '2px', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="book" ref={sectionRef} className="bg-charcoal py-[80px] md:py-[120px]">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <h2 ref={headingRef} className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-cream mb-8 opacity-0" style={{ whiteSpace: 'nowrap' }}>
          {t('book.title') as string}
        </h2>
        <div ref={contentRef} className="opacity-0">
          <p className="font-body text-[18px] md:text-[20px] text-cream/70 leading-[1.6] max-w-[700px] mx-auto">{t('book.text') as string}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center"><Calendar className="text-earth mb-4" size={28} />
              <h3 className="font-display text-[14px] uppercase tracking-[2px] text-cream mb-2">{t('book.waitlist') as string}</h3>
              <p className="font-body text-[14px] text-cream/50">{t('book.waitlistDesc') as string}</p>
            </div>
            <div className="flex flex-col items-center"><Clock className="text-earth mb-4" size={28} />
              <h3 className="font-display text-[14px] uppercase tracking-[2px] text-cream mb-2">{t('book.hours') as string}</h3>
              <p className="font-body text-[14px] text-cream/50">{t('book.hoursDesc') as string}</p>
            </div>
            <div className="flex flex-col items-center"><MapPin className="text-earth mb-4" size={28} />
              <h3 className="font-display text-[14px] uppercase tracking-[2px] text-cream mb-2">{t('book.location') as string}</h3>
              <p className="font-body text-[14px] text-cream/50">{t('book.locationDesc') as string}</p>
            </div>
          </div>
          <Link to="/invitar" className="inline-block mt-12 font-display text-[14px] tracking-[2px] uppercase text-charcoal bg-cream px-10 py-4 hover:bg-earth hover:text-cream transition-colors duration-300">
            {t('book.cta') as string}
          </Link>
        </div>
      </div>
    </section>
  );
}
