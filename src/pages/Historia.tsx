import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useLanguage } from '../hooks/useLanguage';

export default function Historia() {
  useLenis();
  const { t } = useLanguage();

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section className="bg-cream py-[80px] md:py-[120px] text-center">
          <div className="max-w-[800px] mx-auto px-6 md:px-8">
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1]">{t('historia.title') as string}</h1>
            <h2 className="font-display text-[18px] md:text-[24px] uppercase tracking-[3px] text-charcoal/60 mt-4">Anchor:23</h2>
          </div>
        </section>
        <section className="bg-bone py-[80px] md:py-[120px]">
          <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
            <h2 className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-charcoal mb-6">{t('historia.fundamento') as string}</h2>
            <h3 className="font-display text-[20px] md:text-[24px] uppercase tracking-[1.5px] text-charcoal/80 mb-8">{t('historia.subtitle') as string}</h3>
            <p className="font-body text-[18px] md:text-[20px] text-charcoal/60 leading-[1.6]">{t('historia.text') as string}</p>
          </div>
        </section>
        <section className="bg-cream py-[80px] md:py-[120px]">
          <div className="max-w-[1000px] mx-auto px-6 md:px-8">
            <h2 className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-charcoal text-center mb-12 md:mb-16">{t('historia.significado') as string}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-bone p-8 md:p-10">
                <h3 className="font-display text-[24px] uppercase tracking-[2px] text-charcoal mb-4">{t('historia.anchor') as string}</h3>
                <p className="font-body text-[16px] md:text-[18px] text-charcoal/60 leading-[1.6]">{t('historia.anchorText') as string}</p>
              </div>
              <div className="bg-bone p-8 md:p-10">
                <h3 className="font-display text-[24px] uppercase tracking-[2px] text-charcoal mb-4">{t('historia.twentyThree') as string}</h3>
                <p className="font-body text-[16px] md:text-[18px] text-charcoal/60 leading-[1.6]">{t('historia.twentyThreeText') as string}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-charcoal py-[80px] md:py-[120px]">
          <div className="max-w-[1000px] mx-auto px-6 md:px-8">
            <h2 className="font-display text-[28px] md:text-[40px] uppercase tracking-[2px] text-cream text-center mb-12 md:mb-16">{t('historia.filosofia') as string}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div className="text-center">
                <h3 className="font-display text-[18px] uppercase tracking-[1.5px] text-cream mb-4">{t('historia.lujo') as string}</h3>
                <p className="font-body text-[16px] text-cream/60 leading-[1.6]">{t('historia.lujoText') as string}</p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-[18px] uppercase tracking-[1.5px] text-cream mb-4">{t('historia.exclusividad') as string}</h3>
                <p className="font-body text-[16px] text-cream/60 leading-[1.6]">{t('historia.exclusividadText') as string}</p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-[18px] uppercase tracking-[1.5px] text-cream mb-4">{t('historia.precision') as string}</h3>
                <p className="font-body text-[16px] text-cream/60 leading-[1.6]">{t('historia.precisionText') as string}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
