import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, CheckCircle } from 'lucide-react';
import { SITE } from '../lib/site';

interface JoinWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Invitaciones → sistema Anchor:23 vía webhook n8n (ver src/lib/site.ts)
const WEBHOOK_URL = SITE.webhooks.joinUs;

export default function JoinWaitlistModal({ isOpen, onClose }: JoinWaitlistModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    descripcion: '',
    instagram: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.3,
      ease: 'power3.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        onClose();
        setIsSuccess(false);
        setError('');
        setFormData({ nombre: '', email: '', telefono: '', descripcion: '', instagram: '' });
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const payload = {
      form: 'waitlist',
      ...formData,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      timestamp_utc: new Date().toISOString(),
      source: 'landing_page',
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
        setError('No pudimos enviar tu solicitud. Intenta de nuevo.');
      }
    } catch (err) {
      setError('No pudimos enviar tu solicitud. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 opacity-0"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-surface w-full max-w-[500px] max-h-[90vh] overflow-y-auto relative opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors duration-300"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          {!isSuccess ? (
            <>
              <h3 className="font-display text-[24px] md:text-[28px] uppercase tracking-[2px] text-black mb-2">
                Unirme a la Lista
              </h3>
              <p className="font-body text-[16px] text-black/60 mb-8">
                Sé de las primeras en vivir la experiencia ANCHOR:23.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-black mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-[16px] text-black placeholder:text-black/40 focus:outline-none focus:border-black/50"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-black mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-[16px] text-black placeholder:text-black/40 focus:outline-none focus:border-black/50"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-black mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-[16px] text-black placeholder:text-black/40 focus:outline-none focus:border-black/50"
                    placeholder="+52 844 123 4567"
                  />
                </div>

                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-black mb-2">
                    ¿Por qué te gustaría vivir la experiencia ANCHOR:23?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-[16px] text-black placeholder:text-black/40 focus:outline-none focus:border-black/50"
                    placeholder="Cuéntanos un poco sobre ti..."
                  />
                </div>

                <div>
                  <label className="block font-display text-[12px] uppercase tracking-[2px] text-black mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full bg-transparent border border-black/20 px-4 py-3 font-body text-[16px] text-black placeholder:text-black/40 focus:outline-none focus:border-black/50"
                    placeholder="@tuusuario"
                  />
                </div>

                {error && (
                  <p className="font-body text-[14px] text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-display text-[14px] tracking-[2px] uppercase text-white bg-black py-4 hover:bg-accent transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-gold mx-auto mb-6" />
              <h3 className="font-display text-[24px] uppercase tracking-[2px] text-black mb-4">
                Solicitud Recibida
              </h3>
              <p className="font-body text-[16px] text-black/60 leading-[1.6]">
                Gracias por tu interés. Nuestro equipo revisará tu solicitud y te contactará
                pronto para completar el proceso.
              </p>
              <button
                onClick={handleClose}
                className="inline-block mt-8 font-display text-[14px] tracking-[2px] uppercase text-black border border-black px-8 py-3 hover:bg-black hover:text-white transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
