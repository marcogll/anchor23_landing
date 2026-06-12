import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FundamentoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

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
        subheadingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
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
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface py-[80px] md:py-[120px]">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        <h2
          ref={headingRef}
          className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-black leading-[1.2] mb-6 opacity-0"
        >
          Fundamento
        </h2>

        <h3
          ref={subheadingRef}
          className="font-display text-[20px] md:text-[24px] uppercase tracking-[1.5px] text-black/80 mb-8 opacity-0"
        >
          Nada sólido nace del caos
        </h3>

        <p
          ref={bodyRef}
          className="font-body text-[18px] md:text-[20px] text-black/60 leading-[1.6] opacity-0"
        >
          Anchor:23 nace de la unión de dos creativos que creen en el lujo como
          estándar, no como promesa. Aquí, lo excepcional es norma: una
          experiencia exclusiva y coherente, diseñada para quienes entienden que
          el verdadero lujo está en la precisión, no en el exceso.
        </p>
      </div>
    </section>
  );
}
