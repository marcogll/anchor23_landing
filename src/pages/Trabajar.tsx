import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useLenis } from '../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const WEBHOOK_URL = 'https://flows.soul23.cloud/webhook/okouvwz8y68mnuju7bzp3dv8jq9v9lmlo7divex';

const puestos = [
  'Manicurista',
  'Pedicurista',
  'Especialista en Gel / Acrílico',
  'Lash Designer',
  'Estilista / Colorista',
  'Recepción / Atención al Cliente',
  'Beauty Concierge',
  'Otro',
];

export default function Trabajar() {
  useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', puesto: '', experiencia: '', instagram: '', mensaje: '' });
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
    const payload = { form: 'trabajar', ...formData, instagram: formData.instagram.replace(/^@+/, ''), device_type: window.innerWidth < 768 ? 'mobile' : 'desktop', timestamp_utc: new Date().toISOString(), source: 'trabajar_page', page: '/trabajar' };
    try {
      const response = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.ok) setIsSuccess(true); else setError('No pudimos enviar tu solicitud. Intenta de nuevo.');
    } catch { setError('No pudimos enviar tu solicitud. Intenta de nuevo.'); } finally { setIsSubmitting(false); }
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
            <h1 ref={headingRef} className="font-display text-cream text-[36px] md:text-[64px] uppercase tracking-[4px] md:tracking-[6px] leading-[1.1] opacity-0">Trabajar con Nosotros</h1>
            <p ref={subRef} className="font-body text-cream/70 text-[18px] md:text-[22px] mt-6 leading-[1.6] opacity-0">Forma parte del equipo ANCHOR:23. Buscamos profesionales que compartan nuestro estándar de excelencia.</p>
          </div>
        </section>

        <section className="bg-cream py-[80px] md:py-[120px]">
          <div ref={formRef} className="max-w-[600px] mx-auto px-6 md:px-8 opacity-0">
            {!isSuccess ? (
              <>
                <p className="font-body text-[18px] text-charcoal/60 leading-[1.6] mb-10 text-center">Completa el formulario y nuestro equipo revisará tu perfil. Te contactamos si hay una oportunidad alineada con tu experiencia.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">Nombre Completo *</label>
                    <input type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">Teléfono *</label>
                    <input type="tel" required value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="+52 844 123 4567" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">Puesto de Interés *</label>
                    <select required value={formData.puesto} onChange={(e) => setFormData({ ...formData, puesto: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal focus:outline-none focus:border-charcoal/50">
                      <option value="">Selecciona...</option>
                      {puestos.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">Años de Experiencia</label>
                    <input type="text" value={formData.experiencia} onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Ej: 3 años" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">Instagram</label>
                    <input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="@tuusuario" />
                  </div>
                  <div>
                    <label className="block font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-2">Cuéntanos sobre ti</label>
                    <textarea rows={4} value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-body text-[16px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" placeholder="Experiencia, especialidades, por qué quieres unirte..." />
                  </div>
                  {error && <p className="font-body text-[14px] text-red-600">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="w-full font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal py-4 hover:bg-earth transition-colors duration-300 disabled:opacity-50 cursor-pointer">
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-earth mx-auto mb-6" />
                <h3 className="font-display text-[28px] uppercase tracking-[2px] text-charcoal mb-4">Solicitud Recibida</h3>
                <p className="font-body text-[18px] text-charcoal/60 leading-[1.6]">Gracias por tu interés. Nuestro equipo revisará tu perfil y te contactará si hay una oportunidad alineada con tu experiencia.</p>
                <a href="/" className="inline-block mt-10 font-display text-[14px] tracking-[2px] uppercase text-charcoal border border-charcoal px-10 py-4 hover:bg-charcoal hover:text-cream transition-all duration-300">Volver al Inicio</a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
