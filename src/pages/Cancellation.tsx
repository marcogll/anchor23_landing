import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function Cancellation() {
  useLenis();
  const { t } = useLanguage();

  return (
    <div className="relative">
      <Navigation />
      <main className="pt-[80px]">
        <section className="bg-cream py-[40px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-8">
            <Link to="/" className="inline-block font-body text-[14px] text-charcoal/50 hover:text-charcoal transition-colors duration-300 mb-8">
              ← {t('legal.backHome') as string}
            </Link>
          </div>
        </section>
        <section className="bg-cream py-[40px] md:py-[60px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-8 text-center">
            <p className="font-body text-[12px] uppercase tracking-[2px] text-charcoal/40 mb-4">{t('legal.importantInfo') as string}</p>
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1] mb-6">
              {t('legal.cancellationTitle') as string}
            </h1>
            <p className="font-body text-[16px] text-charcoal/60 leading-[1.6] max-w-[700px] mx-auto">
              {t('legal.cancellationIntro') as string}
            </p>
          </div>
        </section>

        <section className="bg-bone py-[60px] md:py-[80px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-8">
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  {t('legal.c1Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.c1Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  {t('legal.c2Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.c2Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  {t('legal.c3Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.c3Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  {t('legal.c4Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.c4Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  {t('legal.c5Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.c5Text') as string}
                </p>
              </div>
            </div>

            <div className="mt-12 bg-cream p-6 md:p-8 text-center">
              <p className="font-body text-[14px] text-charcoal/60 mb-4">{t('legal.cancellationContact') as string}</p>
              <p className="font-body text-[14px] text-charcoal/60">
                <a href="mailto:hola@anchor23.mx" className="underline hover:text-charcoal transition-colors duration-300">hola@anchor23.mx</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
