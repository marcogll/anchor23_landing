import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function PrivacyPolicy() {
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
            <p className="font-body text-[12px] uppercase tracking-[2px] text-charcoal/40 mb-4">{t('legal.dataProtection') as string}</p>
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1] mb-6">
              {t('legal.privacyTitle') as string}
            </h1>
            <p className="font-body text-[14px] text-charcoal/40">{t('legal.updated') as string} mayo 2025</p>
          </div>
        </section>

        <section className="bg-bone py-[60px] md:py-[80px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-8">
            <p className="font-body text-[16px] text-charcoal/60 leading-[1.8] mb-10">
              {t('legal.privacyIntro') as string}
            </p>

            <div className="bg-cream p-6 md:p-8 mb-10">
              <h3 className="font-display text-[16px] uppercase tracking-[2px] text-charcoal mb-3">{t('legal.controller') as string}</h3>
              <p className="font-body text-[14px] text-charcoal/60 leading-[1.6]">
                {t('legal.controllerName') as string}<br />
                {t('legal.controllerAddress') as string}<br />
                {t('legal.controllerEmail') as string}<br />
                {t('legal.controllerPhone') as string}
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  1. {t('legal.p1Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.p1Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  2. {t('legal.p2Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.p2Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  3. {t('legal.p3Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.p3Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  4. {t('legal.p4Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.p4Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  5. {t('legal.p5Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.p5Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  6. {t('legal.p6Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.p6Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  7. {t('legal.p7Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.p7Text') as string}
                </p>
              </div>
            </div>

            <div className="mt-12 bg-cream p-6 md:p-8 text-center">
              <p className="font-body text-[14px] text-charcoal/60 mb-4">{t('legal.arcoText') as string}</p>
              <p className="font-body text-[14px] text-charcoal/60">
                <a href="mailto:privacidad@anchor23.mx" className="underline hover:text-charcoal transition-colors duration-300">privacidad@anchor23.mx</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
