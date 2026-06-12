import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
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

  return (
    <section ref={sectionRef} className="bg-surface py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2
              ref={headingRef}
              className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-black leading-[1.2] opacity-0"
              style={{ whiteSpace: 'nowrap' }}
            >
              We'd love to meet you
            </h2>
            <p
              ref={bodyRef}
              className="font-body text-[18px] md:text-[20px] text-black/60 leading-[1.6] mt-8 opacity-0"
            >
              At ANCHOR:23, we believe that beauty is not just a service—it's an
              art form, a science, and a way of life. We're building a team of
              passionate individuals who share our vision of redefining the nail
              care industry. If you're looking for a career that celebrates
              creativity, precision, and excellence, you've found your home. We
              invest in our people because they are the foundation of everything
              we create.
            </p>
          </div>

          <div ref={imageRef} className="opacity-0">
            <img
              src="/images/why-illustration.jpg"
              alt="ANCHOR:23 Culture"
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
