import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { SITE } from '../lib/site';

const WEBHOOK_URL = SITE.webhooks.contact;

export default function Contacto() {
  useLenis();
  const { t } = useLanguage();
  const reasons = (t('contacto.reasons') as unknown) as string[];

  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', razon: '', mensaje: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const payload = { form: 'contacto', ...formData, device_type: window.innerWidth < 768 ? 'mobile' : 'desktop', timestamp_utc: new Date().toISOString(), source: 'contacto_page', page: '/contacto' };
    try {
      const response = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.ok) setIsSuccess(true); else setError(t('contacto.error') as string);
    } catch (err) { setError(t('contacto.error') as string); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section className="bg-cream py-[80px] md:py-[120px] text-center">
          <div className="max-w-[800px] mx-auto px-6 md:px-8">
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1]">{t('contacto.title') as string}</h1>
            <h2 className="font-display text-[18px] md:text-[24px] uppercase tracking-[3px] text-charcoal/60 mt-4">Anchor:23</h2>
          </div>
        </section>
        <section id="informacion" className="bg-bone py-[80px] md:py-[120px]">
          <div className="max-w-[1000px] mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-charcoal mb-4">{t('contacto.infoTitle') as string}</h2>
              <h3 className="font-display text-[20px] md:text-[24px] uppercase tracking-[1.5px] text-charcoal/80 mb-4">{t('contacto.infoSubtitle') as string}</h3>
              <p className="font-body text-[18px] text-charcoal/60 leading-[1.6]">{t('contacto.infoText') as string}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-cream p-6 text-center">
                <MapPin className="mx-auto mb-4 text-earth" size={24} />
                <h4 className="font-display text-[14px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.location') as string}</h4>
                <p className="font-body text-[14px] text-charcoal/60">{t('contacto.locationValue') as string}</p>
              </div>
              <div className="bg-cream p-6 text-center">
                <Phone className="mx-auto mb-4 text-earth" size={24} />
                <h4 className="font-display text-[14px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.phone') as string}</h4>
                <p className="font-body text-[14px] text-charcoal/60">{t('contacto.phoneValue') as string}</p>
              </div>
              <div className="bg-cream p-6 text-center">
                <Mail className="mx-auto mb-4 text-earth" size={24} />
                <h4 className="font-display text-[14px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.email') as string}</h4>
                <p className="font-body text-[14px] text-charcoal/60">{t('contacto.emailValue') as string}</p>
              </div>
              <div className="bg-cream p-6 text-center">
                <Clock className="mx-auto mb-4 text-earth" size={24} />
                <h4 className="font-display text-[14px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.hours') as string}</h4>
                <p className="font-body text-[14px] text-charcoal/60">{t('contacto.hoursValue') as string}</p>
              </div>
            </div>
            <div className="text-center mt-10">
              <a href={SITE.bookingUrl} className="inline-block font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal px-10 py-4 hover:bg-earth transition-colors duration-300">{t('contacto.bookCta') as string}</a>
            </div>
          </div>
        </section>
        <section id="mensaje" className="bg-cream py-[80px] md:py-[120px]">
          <div className="max-w-[600px] mx-auto px-6 md:px-8">
            <h3 className="font-display text-[24px] md:text-[32px] uppercase tracking-[2px] text-charcoal text-center mb-8">{t('contacto.formTitle') as string}</h3>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.name') as string} *</label>
                  <input type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.emailLabel') as string} *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.phoneLabel') as string}</label>
                  <input type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="+52 ..." />
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.reason') as string} *</label>
                  <select required value={formData.razon} onChange={(e) => setFormData({ ...formData, razon: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal focus:outline-none focus:border-charcoal/50">
                    <option value="">{t('contacto.reasonPlaceholder') as string}</option>
                    {reasons.map((reason, index) => (
                      <option key={index} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('contacto.message') as string} *</label>
                  <textarea rows={6} required value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Escribe tu mensaje..." />
                </div>
                {error && <p className="font-body text-[14px] text-red-600">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal py-4 hover:bg-earth transition-colors duration-300 disabled:opacity-50 cursor-pointer">{isSubmitting ? t('contacto.submitting') : t('contacto.send') as string}</button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-earth mx-auto mb-6" />
                <h3 className="font-display text-[28px] uppercase tracking-[2px] text-charcoal mb-4">{t('contacto.success') as string}</h3>
                <p className="font-body text-[18px] text-charcoal/60 leading-[1.6]">{t('contacto.successText') as string}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
