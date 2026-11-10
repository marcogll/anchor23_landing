import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, MapPin } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useLenis } from '../hooks/useLenis';
import { useLanguage } from '../hooks/useLanguage';
import { SITE } from '../lib/site';

gsap.registerPlugin(ScrollTrigger);

// Invitaciones → sistema Anchor:23 vía webhook n8n (ver src/lib/site.ts)
const WEBHOOK_URL = SITE.webhooks.joinUs;

const SALON_COORDS = { lat: 25.4232, lng: -100.9925 };

function getDistanceIndex(km: number): number {
  if (km < 15) return 0;
  if (km < 30) return 1;
  if (km < 60) return 2;
  if (km < 120) return 3;
  if (km < 180) return 4;
  return 5;
}

export default function JoinUs() {
  useLenis();
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const distanceOptions = (t('joinUs.distanceOptions') as string[]) || [];
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', descripcion: '', instagram: '', distancia: '' });
  const [distanceIdx, setDistanceIdx] = useState<number>(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo(formRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: formRef.current, start: 'top 80%' } });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const detectDistance = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const R = 6371;
        const dLat = ((pos.coords.latitude - SALON_COORDS.lat) * Math.PI) / 180;
        const dLng = ((pos.coords.longitude - SALON_COORDS.lng) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos((SALON_COORDS.lat * Math.PI) / 180) * Math.cos((pos.coords.latitude * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const km = R * c;
        const idx = getDistanceIndex(km);
        setDistanceIdx(idx);
        setFormData((prev) => ({ ...prev, distancia: distanceOptions[idx] || '' }));
        setDetecting(false);
      },
      () => setDetecting(false),
      { timeout: 5000 }
    );
  };

  const handleDistanceChange = (idx: number) => {
    setDistanceIdx(idx);
    setFormData((prev) => ({ ...prev, distancia: distanceOptions[idx] || '' }));
  };

  const normalizeInstagram = (val: string) => val.replace(/^@+/, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const payload = { form: 'waitlist', ...formData, instagram: normalizeInstagram(formData.instagram), device_type: window.innerWidth < 768 ? 'mobile' : 'desktop', timestamp_utc: new Date().toISOString(), source: 'join_us_page', page: '/join-us' };
    try {
      const response = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.ok) setIsSuccess(true); else setError(t('joinUs.error') as string);
    } catch (err) { setError(t('joinUs.error') as string); } finally { setIsSubmitting(false); }
  };

  const igDisplay = normalizeInstagram(formData.instagram);

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section ref={heroRef} className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-charcoal">
          <div className="absolute inset-0">
            <img src="/images/hero.jpg" alt="ANCHOR:23" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-[900px]">
            <h1 ref={headingRef} className="font-display text-cream text-[36px] md:text-[64px] uppercase tracking-[4px] md:tracking-[6px] leading-[1.1] opacity-0">{t('joinUs.title') as string}</h1>
            <p ref={subRef} className="font-body text-cream/70 text-[18px] md:text-[22px] mt-6 leading-[1.6] opacity-0">{t('joinUs.subtitle') as string}</p>
          </div>
        </section>
        <section className="bg-cream py-[80px] md:py-[120px]">
          <div ref={formRef} className="max-w-[600px] mx-auto px-6 md:px-8 opacity-0">
            {!isSuccess ? (
              <>
                <p className="font-body text-[18px] text-charcoal/60 leading-[1.6] mb-10 text-center">{t('joinUs.text') as string}</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div><label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.name') as string} *</label><input type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Tu nombre" /></div>
                  <div><label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.email') as string} *</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="tu@email.com" /></div>
                  <div><label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.phone') as string} *</label><input type="tel" required value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="+52 844 123 4567" /></div>

                  {/* Distancia - Slider */}
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.distance') as string}</label>
                    <div className="mt-3">
                      <input
                        type="range"
                        min={0}
                        max={distanceOptions.length - 1}
                        step={1}
                        value={distanceIdx >= 0 ? distanceIdx : 3}
                        onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
                        className="w-full h-[2px] bg-charcoal/20 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-charcoal [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-charcoal [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
                      />
                      <div className="flex justify-between mt-2">
                        {distanceOptions.map((opt: string, i: number) => (
                          <span key={i} className={`font-body text-[11px] md:text-[12px] transition-colors duration-200 cursor-pointer ${i === distanceIdx ? 'text-charcoal font-medium' : 'text-charcoal/40'}`} onClick={() => handleDistanceChange(i)}>{opt}</span>
                        ))}
                      </div>
                    </div>
                    {distanceIdx >= 0 && <p className="font-body text-[14px] text-charcoal mt-3 text-center font-medium">{distanceOptions[distanceIdx]}</p>}
                    <div className="flex items-center gap-2 mt-3">
                      <button type="button" onClick={detectDistance} className="flex items-center gap-2 px-3 py-1.5 border border-charcoal/20 text-charcoal/60 hover:bg-charcoal hover:text-cream transition-colors duration-300 cursor-pointer text-[12px] font-body uppercase tracking-[1px]">
                        <MapPin size={14} /> {detecting ? (t('joinUs.detecting') as string) : 'Auto-detectar'}
                      </button>
                    </div>
                    <p className="font-body text-[12px] text-charcoal/40 mt-2">{t('joinUs.distanceNote') as string}</p>
                  </div>

                  <div><label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.description') as string}</label><textarea rows={4} value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder={t('joinUs.descriptionPlaceholder') as string} /></div>

                  {/* Instagram normalizado */}
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.instagram') as string}</label>
                    <input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder={t('joinUs.instagramPlaceholder') as string} />
                    {igDisplay && (
                      <a href={`https://instagram.com/${igDisplay}`} target="_blank" rel="noopener noreferrer" className="font-body text-[13px] text-earth/70 hover:text-earth transition-colors mt-1 inline-block">
                        instagram.com/{igDisplay}
                      </a>
                    )}
                  </div>

                  {error && <p className="font-body text-[14px] text-red-600">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="w-full font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal py-4 hover:bg-earth transition-colors duration-300 disabled:opacity-50 cursor-pointer">{isSubmitting ? t('joinUs.submitting') : t('joinUs.submit') as string}</button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-earth mx-auto mb-6" />
                <h3 className="font-display text-[28px] uppercase tracking-[2px] text-charcoal mb-4">{t('joinUs.success') as string}</h3>
                <p className="font-body text-[18px] text-charcoal/60 leading-[1.6]">{t('joinUs.successText') as string}</p>
                <a href="/" className="inline-block mt-10 font-display text-[14px] tracking-[2px] uppercase text-charcoal border border-charcoal px-10 py-4 hover:bg-charcoal hover:text-cream transition-all duration-300">{t('joinUs.backHome') as string}</a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
