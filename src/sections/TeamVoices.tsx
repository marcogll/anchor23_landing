import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    image: '/images/team-1.jpg',
    quote:
      'I joined ANCHOR:23 in 2022 as a Junior Nail Artist. Within 18 months, I was promoted to Senior Technician, and now I lead our creative direction for fashion week collaborations. The growth here is real, and the support from the team is unmatched.',
    name: 'Alex P',
    role: 'Creative Director',
  },
  {
    image: '/images/team-2.jpg',
    quote:
      "What drew me to ANCHOR:23 was the commitment to artistry. This isn't a conveyor-belt salon—every client receives a bespoke experience, and we're encouraged to push creative boundaries. I've never been more inspired in my career.",
    name: 'Daisy D',
    role: 'Senior Nail Artist',
  },
  {
    image: '/images/team-3.jpg',
    quote:
      'I started as a part-time receptionist while studying. The training programs here are incredible—I transitioned into a full-time Nail Artist role within six months. ANCHOR:23 truly invests in your potential, no matter where you start.',
    name: 'Yasmin W',
    role: 'Salon Manager',
  },
];

export default function TeamVoices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { letterSpacing: '-5px', opacity: 0 },
        {
          letterSpacing: '1.5px',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2 + index * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface py-[80px] md:py-[120px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <h2
          ref={headingRef}
          className="font-display text-[28px] md:text-[40px] uppercase tracking-[1.5px] text-black text-center mb-12 md:mb-16 opacity-0"
          style={{ whiteSpace: 'nowrap' }}
        >
          Hear From Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="opacity-0"
            >
              <div className="aspect-square overflow-hidden mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-body text-[16px] md:text-[18px] italic text-black/70 leading-[1.6]">
                "{testimonial.quote}"
              </p>
              <p className="font-display text-[14px] uppercase tracking-[1.5px] text-black mt-4">
                – {testimonial.name},{' '}
                <span className="text-black/50">{testimonial.role}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
