import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const TARGET_DATE = new Date('2026-07-30T00:00:00').getTime();

function calculateTimeLeft() {
  const now = new Date().getTime();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function CountdownSection() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: t('hero.countdownDays') as string },
    { value: timeLeft.hours, label: t('hero.countdownHours') as string },
    { value: timeLeft.minutes, label: t('hero.countdownMinutes') as string },
    { value: timeLeft.seconds, label: t('hero.countdownSeconds') as string },
  ];

  return (
    <section className="bg-charcoal py-[60px] md:py-[80px]">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        <p className="font-display text-cream/40 text-[12px] uppercase tracking-[3px] mb-8">
          {t('hero.countdownLabel') as string}
        </p>
        <div className="flex items-center justify-center gap-6 md:gap-12">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <span className="font-display text-cream text-[48px] md:text-[72px] leading-none block">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-body text-cream/40 text-[11px] uppercase tracking-[2px] mt-3 block">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
