import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PerkItem {
  title: string;
  content: string;
}

const perks: PerkItem[] = [
  {
    title: 'PROUD MOMENTS',
    content:
      'Voted Best Luxury Nail Salon 2024. Featured in Vogue, Elle, and Harper\'s Bazaar. Our team members have represented ANCHOR:23 at London, Paris, and Milan Fashion Weeks. We don\'t just follow trends—we set them.',
  },
  {
    title: 'ANCHOR:23 PERKS',
    content:
      'Enjoy premium private healthcare, complimentary monthly treatments, product discounts for you and your family, an extra day of paid leave for every year of service, birthday celebrations, and access to exclusive industry events and masterclasses.',
  },
  {
    title: 'A CAREER, NOT A JOB',
    content:
      'Our structured Career Pathways take you from Junior Artist to Senior Technician, Session Lead, and beyond. With clear progression milestones, competitive salaries, annual loyalty bonuses, and leadership development programs—your growth is our commitment.',
  },
  {
    title: "WE'RE ETHICALLY FOCUSED",
    content:
      'We set the standard for ethical practices in beauty. From cruelty-free, vegan product lines to fair labour conditions and sustainable salon operations—every decision we make is rooted in responsibility to our people and our planet.',
  },
];

export default function PerksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      headingRefs.current.forEach((heading) => {
        if (!heading) return;
        gsap.fromTo(
          heading,
          { letterSpacing: '-5px', opacity: 0 },
          {
            letterSpacing: '1.5px',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="bg-base py-[80px] md:py-[120px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        {perks.map((perk, index) => (
          <div key={index} className={`${index > 0 ? 'mt-16 md:mt-20' : ''}`}>
            <button
              onClick={() => toggleExpand(index)}
              className="w-full text-left group cursor-pointer"
            >
              <h3
                ref={(el) => { headingRefs.current[index] = el; }}
                className="font-display text-[20px] md:text-[24px] uppercase tracking-[1.5px] text-black opacity-0 flex items-center justify-between"
                style={{ whiteSpace: 'nowrap' }}
              >
                <span>{perk.title}</span>
                <span
                  className={`text-[24px] transition-transform duration-300 ${
                    expandedIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </h3>
            </button>
            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                expandedIndex === index ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="font-body text-[16px] md:text-[18px] text-black/60 leading-[1.6] pb-4">
                {perk.content}
              </p>
            </div>
            {index < perks.length - 1 && (
              <div className="w-full h-px bg-black/10 mt-8" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
