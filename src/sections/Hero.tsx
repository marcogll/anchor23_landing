import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.0 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="ANCHOR:23 Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6">
        <h1
          ref={headingRef}
          className="font-display text-white text-[40px] md:text-[72px] uppercase tracking-[4px] md:tracking-[6px] leading-[1.1] opacity-0"
        >
          Start a New Chapter.
        </h1>

        <div ref={badgeRef} className="mt-8 opacity-0">
          <span className="inline-block bg-surface text-black font-display text-[14px] tracking-[2px] uppercase px-6 py-2 rounded-full">
            Hiring
          </span>
        </div>

        <a
          ref={ctaRef}
          href="#roles"
          className="inline-block mt-6 font-display text-[14px] tracking-[2px] uppercase text-white border-b border-white pb-1 hover:opacity-70 transition-opacity duration-300 opacity-0"
        >
          View Open Roles
        </a>
      </div>
    </section>
  );
}
