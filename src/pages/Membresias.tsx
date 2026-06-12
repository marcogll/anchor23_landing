import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import MembershipsSection from '../sections/MembershipsSection';
import Footer from '../sections/Footer';
import { useLanguage } from '../hooks/useLanguage';

const WEBHOOK_URL = 'https://flows.soul23.cloud/webhook/27xv9ojycsfzp7tepia4ewavq2c0uep427bkecb';

export default function Membresias() {
  useLenis();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({ tier: 'Gold', nombre: '', email: '', telefono: '', descripcion: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const payload = { form: 'membership_request', ...formData, device_type: window.innerWidth < 768 ? 'mobile' : 'desktop', timestamp_utc: new Date().toISOString(), source: 'membresias_page', page: '/membresias' };
    try {
      const response = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.ok) setIsSuccess(true); else setError(t('memberships.error') as string);
    } catch (err) { setError(t('memberships.error') as string); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section className="bg-cream py-[80px] md:py-[120px] text-center">
          <div className="max-w-[800px] mx-auto px-6 md:px-8">
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1]">{t('memberships.title') as string}</h1>
            <h2 className="font-display text-[18px] md:text-[24px] uppercase tracking-[3px] text-charcoal/60 mt-4">Anchor:23</h2>
          </div>
        </section>
        <section className="bg-bone py-[60px] md:py-[80px]">
          <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
            <h3 className="font-display text-[20px] md:text-[24px] uppercase tracking-[1.5px] text-charcoal mb-4">{t('memberships.title') as string}</h3>
            <p className="font-body text-[18px] text-charcoal/60 leading-[1.6]">{t('memberships.note') as string}</p>
          </div>
        </section>
        <MembershipsSection />
        <section id="solicitud" className="bg-cream py-[80px] md:py-[120px]">
          <div className="max-w-[600px] mx-auto px-6 md:px-8">
            <h3 className="font-display text-[24px] md:text-[32px] uppercase tracking-[2px] text-charcoal text-center mb-8">{t('memberships.request') as string}</h3>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('memberships.title') as string}</label>
                  <select value={formData.tier} onChange={(e) => setFormData({ ...formData, tier: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal focus:outline-none focus:border-charcoal/50">
                    <option>Gold</option>
                    <option>Black</option>
                    <option>VIP</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.name') as string} *</label>
                  <input type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.email') as string} *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.phone') as string} *</label>
                  <input type="tel" required value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="+52 ..." />
                </div>
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">{t('joinUs.description') as string}</label>
                  <textarea rows={4} value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder={t('joinUs.descriptionPlaceholder') as string} />
                </div>
                {error && <p className="font-body text-[14px] text-red-600">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal py-4 hover:bg-earth transition-colors duration-300 disabled:opacity-50 cursor-pointer">{isSubmitting ? t('memberships.submitting') : t('joinUs.submit') as string}</button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-earth mx-auto mb-6" />
                <h3 className="font-display text-[28px] uppercase tracking-[2px] text-charcoal mb-4">{t('memberships.success') as string}</h3>
                <p className="font-body text-[18px] text-charcoal/60 leading-[1.6]">{t('memberships.successText') as string}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
