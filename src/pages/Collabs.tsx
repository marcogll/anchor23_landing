import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useLenis } from '../hooks/useLenis';
import { useLanguage } from '../hooks/useLanguage';
import { SITE } from '../lib/site';

gsap.registerPlugin(ScrollTrigger);

const WEBHOOK_URL = SITE.webhooks.collabs;

export default function Collabs() {
  useLenis();
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    instagram: '',
    tipo: '',
    seguidores: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo(formRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: formRef.current, start: 'top 80%' } });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const payload = {
      form: 'collabs',
      ...formData,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      timestamp_utc: new Date().toISOString(),
      source: 'collabs_page',
      page: '/collabs',
    };
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(t('collabs.error') as string);
      }
    } catch (err) {
      setError(t('collabs.error') as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section ref={heroRef} className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-charcoal">
          <div className="absolute inset-0">
            <img src="/images/hero.jpg" alt="ANCHOR:23" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-[900px]">
            <h1 ref={headingRef} className="font-display text-cream text-[36px] md:text-[64px] uppercase tracking-[4px] md:tracking-[6px] leading-[1.1] opacity-0">
              {t('collabs.title') as string}
            </h1>
            <p ref={subRef} className="font-body text-cream/70 text-[18px] md:text-[22px] mt-6 leading-[1.6] opacity-0">
              {t('collabs.subtitle') as string}
            </p>
          </div>
        </section>

        <section className="bg-bone py-[60px] md:py-[80px]">
          <div className="max-w-[800px] mx-auto px-6 md:px-8">
            <div className="bg-cream p-8 mb-12">
              <h3 className="font-display text-[18px] uppercase tracking-[2px] text-charcoal mb-4">{t('collabs.nrdcTitle') as string}</h3>
              <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">{t('collabs.nrdcText') as string}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cream p-6 text-center">
                <h4 className="font-display text-[14px] uppercase tracking-[2px] text-charcoal mb-3">{t('collabs.step1Title') as string}</h4>
                <p className="font-body text-[14px] text-charcoal/60 leading-[1.6]">{t('collabs.step1Text') as string}</p>
              </div>
              <div className="bg-cream p-6 text-center">
                <h4 className="font-display text-[14px] uppercase tracking-[2px] text-charcoal mb-3">{t('collabs.step2Title') as string}</h4>
                <p className="font-body text-[14px] text-charcoal/60 leading-[1.6]">{t('collabs.step2Text') as string}</p>
              </div>
              <div className="bg-cream p-6 text-center">
                <h4 className="font-display text-[14px] uppercase tracking-[2px] text-charcoal mb-3">{t('collabs.step3Title') as string}</h4>
                <p className="font-body text-[14px] text-charcoal/60 leading-[1.6]">{t('collabs.step3Text') as string}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream py-[80px] md:py-[120px]">
          <div ref={formRef} className="max-w-[600px] mx-auto px-6 md:px-8 opacity-0">
            {!isSuccess ? (
              <>
                <h3 className="font-display text-[24px] md:text-[32px] uppercase tracking-[2px] text-charcoal text-center mb-8">
                  {t('collabs.formTitle') as string}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('collabs.name') as string} *</label>
                    <input type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('collabs.email') as string} *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('collabs.instagram') as string} *</label>
                    <input type="text" required value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="@tuusuario" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('collabs.type') as string} *</label>
                    <select required value={formData.tipo} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal focus:outline-none focus:border-charcoal/50">
                      <option value="">{t('collabs.typePlaceholder') as string}</option>
                      <option value="influencer">Influencer / Content Creator</option>
                      <option value="marca">Marca / Brand</option>
                      <option value="salon">Salón / Salon</option>
                      <option value="otro">Otro / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('collabs.followers') as string}</label>
                    <input type="text" value={formData.seguidores} onChange={(e) => setFormData({ ...formData, seguidores: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="10K, 50K, 100K+" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('collabs.message') as string} *</label>
                    <textarea rows={5} required value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder={t('collabs.messagePlaceholder') as string} />
                  </div>
                  {error && <p className="font-body text-[14px] text-red-600">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="w-full font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal py-4 hover:bg-earth transition-colors duration-300 disabled:opacity-50 cursor-pointer">
                    {isSubmitting ? t('collabs.submitting') : t('collabs.submit') as string}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-earth mx-auto mb-6" />
                <h3 className="font-display text-[28px] uppercase tracking-[2px] text-charcoal mb-4">{t('collabs.success') as string}</h3>
                <p className="font-body text-[18px] text-charcoal/60 leading-[1.6]">{t('collabs.successText') as string}</p>
                <a href="/" className="inline-block mt-10 font-display text-[14px] tracking-[2px] uppercase text-charcoal border border-charcoal px-10 py-4 hover:bg-charcoal hover:text-cream transition-all duration-300">{t('collabs.backHome') as string}</a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
