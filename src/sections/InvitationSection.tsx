import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const icons = [
  <Gift size={28} className="text-earth" />,
  <Users size={28} className="text-earth" />,
  <Sparkles size={28} className="text-earth" />,
];

export default function InvitationSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const title = t('invitation.title') as string;
  const items = [
    { title: t('invitation.gift') as string, desc: t('invitation.giftDesc') as string, cta: t('invitation.giftCta') as string, href: '#' },
    { title: t('invitation.events') as string, desc: t('invitation.eventsDesc') as string, cta: t('invitation.eventsCta') as string, href: '#' },
    { title: t('invitation.waitlist') as string, desc: t('invitation.waitlistDesc') as string, cta: t('invitation.waitlistCta') as string, href: '/invitar' },
  ];

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
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <h2 ref={headingRef} className="font-display text-[28px] md:text-[40px] uppercase tracking-[1.5px] text-charcoal text-center mb-12 md:mb-16 opacity-0" style={{ whiteSpace: 'nowrap' }}>{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {items.map((item, index) => (
            <div key={index} ref={(el) => { cardsRef.current[index] = el; }} className="bg-bone p-8 md:p-10 text-center opacity-0 group">
              <div className="flex justify-center mb-6">{icons[index]}</div>
              <h3 className="font-display text-[18px] uppercase tracking-[1.5px] text-charcoal mb-4">{item.title}</h3>
              <p className="font-body text-[16px] text-charcoal/60 leading-[1.6] mb-6">{item.desc}</p>
              <a href={item.href} className="inline-block font-display text-[12px] uppercase tracking-[2px] text-charcoal border-b border-charcoal pb-0.5 hover:text-earth hover:border-earth transition-colors duration-300">{item.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
