import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const images = ['/images/insta-1.jpg', '/images/insta-2.jpg', '/images/team-1.jpg', '/images/insta-3.jpg', '/images/insta-4.jpg', '/images/team-2.jpg', '/images/hero.jpg', '/images/team-3.jpg'];

export default function InstagramGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.children;
      if (!items) return;
      gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bone py-[60px] md:py-[80px]">
      <div className="text-center mb-10 px-6">
        <h2 className="font-display text-[24px] md:text-[32px] uppercase tracking-[2px] text-charcoal">{t('instagram.title') as string}</h2>
        <a href="https://www.instagram.com/anchor23.mx" target="_blank" rel="noopener noreferrer" className="font-body text-[16px] md:text-[18px] italic text-charcoal/60 mt-2 hover:text-earth transition-colors duration-300 inline-block">{t('instagram.handle') as string}</a>
      </div>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
        {images.map((src, index) => (
          <div key={index} className="aspect-square overflow-hidden opacity-0">
            <img src={src} alt={`ANCHOR:23 ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
