import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Role {
  title: string;
  description: string;
  location: string;
  type: string;
}

const roles: Role[] = [
  {
    title: 'Nail Technician',
    description:
      'We are seeking experienced Nail Technicians who are passionate about delivering exceptional nail care services. You will perform manicures, pedicures, gel extensions, and nail art while maintaining the highest standards of hygiene and client comfort. Minimum 2 years experience required.',
    location: 'London',
    type: 'Full-time',
  },
  {
    title: 'Salon Manager',
    description:
      'Lead our flagship salon with excellence. You will oversee daily operations, manage a team of 8-12 artists, drive client satisfaction, and ensure ANCHOR:23 standards are maintained. Strong leadership skills and 4+ years in salon management required.',
    location: 'London',
    type: 'Full-time',
  },
  {
    title: 'Head Office Coordinator',
    description:
      'Support our central operations team in areas including HR, finance, and logistics. This role is perfect for an organized multitasker who thrives in a fast-paced luxury environment. Previous experience in beauty or hospitality preferred.',
    location: 'London',
    type: 'Full-time',
  },
  {
    title: 'Brand Marketing Lead',
    description:
      'Drive our brand presence across digital and physical channels. You will manage campaigns, partnerships, and content strategy. Experience in luxury brand marketing and a deep understanding of the beauty landscape essential.',
    location: 'London',
    type: 'Full-time',
  },
  {
    title: 'Training & Development Manager',
    description:
      'Design and deliver world-class training programs for our growing team. You will create curricula for technical skills, customer service, and leadership development. Previous experience in L&D within the beauty industry required.',
    location: 'London',
    type: 'Full-time',
  },
  {
    title: 'Client Experience Associate',
    description:
      'Be the first point of contact for our discerning clientele. You will manage bookings, greet guests, and ensure every visit exceeds expectations. A warm personality and impeccable presentation are essential.',
    location: 'London',
    type: 'Full-time / Part-time',
  },
];

export default function OpenRoles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { letterSpacing: '-5px', opacity: 0 },
        {
          letterSpacing: '2px',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="roles"
      ref={sectionRef}
      className="bg-inverse py-[80px] md:py-[120px]"
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        <h2
          ref={headingRef}
          className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-white mb-12 md:mb-16 opacity-0"
          style={{ whiteSpace: 'nowrap' }}
        >
          Current Openings
        </h2>

        <div>
          {roles.map((role, index) => (
            <div
              key={index}
              className="border-b border-white/20"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex items-center justify-between py-6 md:py-8 group cursor-pointer text-left"
              >
                <span className="font-display text-[18px] md:text-[24px] uppercase tracking-[1px] text-white group-hover:text-gold transition-colors duration-300">
                  {role.title}
                </span>
                <span
                  className={`text-white text-[24px] transition-transform duration-300 ${
                    expandedIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  expandedIndex === index
                    ? 'max-h-[400px] opacity-100 pb-8'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="font-body text-[16px] md:text-[18px] text-white/70 leading-[1.6] mb-4">
                  {role.description}
                </p>
                <div className="flex gap-6">
                  <span className="font-display text-[12px] uppercase tracking-[1.5px] text-white/50">
                    {role.location}
                  </span>
                  <span className="font-display text-[12px] uppercase tracking-[1.5px] text-white/50">
                    {role.type}
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-block mt-4 font-display text-[12px] uppercase tracking-[2px] text-gold border-b border-gold pb-0.5 hover:text-white hover:border-white transition-colors duration-300"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
