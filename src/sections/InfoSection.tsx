import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '12+', label: 'Años de Excelencia' },
    { value: '50K+', label: 'Clientas Atendidas' },
    { value: '15', label: 'Reconocimientos' },
  ];

  return (
    <section ref={sectionRef} className="bg-cream py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2
              ref={headingRef}
              className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-charcoal leading-[1.2] opacity-0"
              style={{ whiteSpace: 'nowrap' }}
            >
              Nuestra Historia
            </h2>
            <p
              ref={bodyRef}
              className="font-body text-[18px] md:text-[20px] text-charcoal/60 leading-[1.6] mt-8 opacity-0"
            >
              ANCHOR:23 fue fundado con una convicción simple: el lujo no es promesa,
              es estándar. Desde 2013, hemos redefinido la experiencia estética en
              México, combinando precisión técnica con coherencia visual.
            </p>

            <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-10 opacity-0">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="font-display text-[28px] md:text-[36px] text-earth">
                    {stat.value}
                  </div>
                  <div className="font-body text-[14px] text-charcoal/50 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="opacity-0">
            <img
              src="/images/why-illustration.jpg"
              alt="ANCHOR:23"
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
