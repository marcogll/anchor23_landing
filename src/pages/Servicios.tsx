import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import ServicesSection from '../sections/ServicesSection';
import Footer from '../sections/Footer';
import { useLanguage } from '../hooks/useLanguage';
import { SITE } from '../lib/site';

export default function Servicios() {
  useLenis();
  const { t } = useLanguage();
  const values = (t('servicesPage.values') as unknown) as string[];

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section className="bg-cream py-[80px] md:py-[120px] text-center">
          <div className="max-w-[800px] mx-auto px-6 md:px-8">
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1]">{t('servicesPage.title') as string}</h1>
            <h2 className="font-display text-[18px] md:text-[24px] uppercase tracking-[3px] text-charcoal/60 mt-4">{t('servicesPage.subtitle') as string}</h2>
            <p className="font-body text-[18px] md:text-[20px] text-charcoal/60 leading-[1.6] mt-8">{t('servicesPage.philosophy') as string}</p>
          </div>
        </section>
        <ServicesSection />
        <section className="bg-charcoal py-[60px] md:py-[80px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
            <h3 className="font-display text-[20px] md:text-[28px] uppercase tracking-[2px] text-cream mb-8">{t('servicesPage.valuesTitle') as string}</h3>
            <ul className="space-y-3">
              {values.map((item, index) => (
                <li key={index} className="font-body text-[16px] md:text-[18px] text-cream/60">{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="bg-cream py-[80px] md:py-[120px] text-center">
          <div className="max-w-[700px] mx-auto px-6 md:px-8">
            <h3 className="font-display text-[24px] md:text-[32px] uppercase tracking-[2px] text-charcoal mb-6">{t('servicesPage.ctaTitle') as string}</h3>
            <p className="font-body text-[18px] text-charcoal/60 leading-[1.6] mb-8">{t('servicesPage.ctaText') as string}</p>
            <a href={SITE.bookingUrl} className="inline-block font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal px-10 py-4 hover:bg-earth transition-colors duration-300">{t('servicesPage.ctaButton') as string}</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
