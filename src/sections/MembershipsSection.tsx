import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Award, Crown, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const icons = [
  <Star size={28} className="text-earth" />,
  <Award size={28} className="text-earth" />,
  <Crown size={28} className="text-earth" />,
];

export default function MembershipsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const title = t('members.title') as string;
  const subtitle = t('members.subtitle') as string;
  const popular = t('members.popular') as string;
  const subscribe = t('members.subscribe') as string;
  const request = t('members.request') as string;
  const tiers = (t('members.tiers') as unknown) as { name: string; price: string; period: string; desc: string; features: string[] }[];

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
    <section ref={sectionRef} className="bg-bone py-[80px] md:py-[120px]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <h2 ref={headingRef} className="font-display text-[28px] md:text-[40px] uppercase tracking-[1.5px] text-charcoal text-center mb-4 opacity-0" style={{ whiteSpace: 'nowrap' }}>{title}</h2>
        <p className="font-body text-[18px] text-charcoal/60 text-center mb-12 md:mb-16 max-w-[600px] mx-auto">{subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, index) => {
            const highlighted = index === 2;
            return (
              <div key={index} ref={(el) => { cardsRef.current[index] = el; }} className={`relative opacity-0 ${highlighted ? 'bg-charcoal text-cream md:scale-105' : 'bg-cream text-charcoal'} p-8 md:p-10 flex flex-col`}>
                {highlighted && <div className="absolute top-0 left-0 right-0 bg-earth text-cream font-display text-[11px] uppercase tracking-[2px] text-center py-2">{popular}</div>}
                <div className={`${highlighted ? 'mt-6' : ''}`}>
                  <div className="flex justify-center mb-4">{icons[index]}</div>
                  <h3 className={`font-display text-[20px] uppercase tracking-[1.5px] mb-2 text-center ${highlighted ? 'text-cream' : 'text-charcoal'}`}>{tier.name}</h3>
                  <p className={`font-body text-[14px] leading-[1.5] mb-6 text-center ${highlighted ? 'text-cream/60' : 'text-charcoal/60'}`}>{tier.desc}</p>
                  <div className="text-center mb-8">
                    <span className={`font-display text-[32px] md:text-[36px] ${highlighted ? 'text-earth' : 'text-charcoal'}`}>{tier.price}</span>
                    <span className={`font-body text-[14px] ${highlighted ? 'text-cream/60' : 'text-charcoal/60'}`}>{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <Check size={16} className="mt-1 flex-shrink-0 text-earth" />
                        <span className={`font-body text-[14px] leading-[1.5] ${highlighted ? 'text-cream/80' : 'text-charcoal/70'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#solicitud" className={`block text-center font-display text-[12px] uppercase tracking-[2px] py-3 border transition-colors duration-300 ${highlighted ? 'border-earth text-earth hover:bg-earth hover:text-cream' : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-cream'}`}>
                    {index === 2 ? request : subscribe}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
