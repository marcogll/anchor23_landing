import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useLanguage } from '../hooks/useLanguage';

export default function Franchises() {
  useLenis();
  const { t } = useLanguage();
  const requirements = (t('franchises.requirements') as unknown) as string[];

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section className="bg-cream py-[80px] md:py-[120px] text-center">
          <div className="max-w-[800px] mx-auto px-6 md:px-8">
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1]">{t('franchises.title') as string}</h1>
            <h2 className="font-display text-[18px] md:text-[24px] uppercase tracking-[3px] text-charcoal/60 mt-4">Anchor:23</h2>
          </div>
        </section>
        <section className="bg-bone py-[80px] md:py-[120px]">
          <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
            <p className="font-body text-[18px] md:text-[20px] text-charcoal/60 leading-[1.6]">{t('franchises.intro') as string}</p>
          </div>
        </section>
        <section className="bg-cream py-[80px] md:py-[120px]">
          <div className="max-w-[1000px] mx-auto px-6 md:px-8">
            <h3 className="font-display text-[24px] md:text-[32px] uppercase tracking-[2px] text-charcoal text-center mb-12">{t('franchises.whyTitle') as string}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
              <div className="bg-bone p-8 text-center">
                <h4 className="font-display text-[18px] uppercase tracking-[1.5px] text-charcoal mb-4">{t('franchises.trademark') as string}</h4>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.6]">{t('franchises.trademarkText') as string}</p>
              </div>
              <div className="bg-bone p-8 text-center">
                <h4 className="font-display text-[18px] uppercase tracking-[1.5px] text-charcoal mb-4">{t('franchises.support') as string}</h4>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.6]">{t('franchises.supportText') as string}</p>
              </div>
              <div className="bg-bone p-8 text-center">
                <h4 className="font-display text-[18px] uppercase tracking-[1.5px] text-charcoal mb-4">{t('franchises.model') as string}</h4>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.6]">{t('franchises.modelText') as string}</p>
              </div>
            </div>
            <h3 className="font-display text-[24px] md:text-[32px] uppercase tracking-[2px] text-charcoal text-center mb-8">{t('franchises.requirementsTitle') as string}</h3>
            <ul className="max-w-[600px] mx-auto space-y-4 mb-12">
              {requirements.map((req, index) => (
                <li key={index} className="font-body text-[16px] text-charcoal/80 flex items-start gap-3">
                  <span className="text-earth mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <a href="mailto:franquicias@anchor23.mx" className="inline-block font-display text-[14px] tracking-[2px] uppercase text-cream bg-charcoal px-10 py-4 hover:bg-earth transition-colors duration-300">{t('franchises.cta') as string}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
