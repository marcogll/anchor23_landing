import { useLenis } from '../hooks/useLenis';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function Legal() {
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
            <p className="font-body text-[12px] uppercase tracking-[2px] text-charcoal/40 mb-4">{t('legal.legalInfo') as string}</p>
            <h1 className="font-display text-[36px] md:text-[56px] uppercase tracking-[4px] text-charcoal leading-[1.1] mb-6">
              {t('legal.termsTitle') as string}
            </h1>
            <p className="font-body text-[16px] text-charcoal/60 leading-[1.6] max-w-[700px] mx-auto">
              {t('legal.termsIntro') as string}
            </p>
          </div>
        </section>

        <section className="bg-bone py-[60px] md:py-[80px]">
          <div className="max-w-[900px] mx-auto px-6 md:px-8">
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  1. {t('legal.t1Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.t1Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  2. {t('legal.t2Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.t2Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  3. {t('legal.t3Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.t3Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  4. {t('legal.t4Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.t4Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  5. {t('legal.t5Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.t5Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  6. {t('legal.t6Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.t6Text') as string}
                </p>
              </div>

              <div>
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  7. {t('legal.t7Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8]">
                  {t('legal.t7Text') as string}
                </p>
              </div>

              {/* Collaboration Section */}
              <div className="border-t border-charcoal/10 pt-10">
                <h2 className="font-display text-[20px] uppercase tracking-[2px] text-charcoal mb-4">
                  8. {t('legal.t8Title') as string}
                </h2>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8] mb-4">
                  {t('legal.t8Text') as string}
                </p>
                <p className="font-body text-[16px] text-charcoal/60 leading-[1.8] mb-4">
                  {t('legal.t8Text2') as string}
                </p>
                <div className="bg-cream p-6 mt-4">
                  <p className="font-body text-[14px] text-charcoal/80 leading-[1.6]">
                    {t('legal.t8Note') as string}
                  </p>
                  <a href="mailto:collabs@anchor23.mx" className="inline-block mt-3 font-display text-[13px] uppercase tracking-[2px] text-earth border-b border-earth pb-0.5 hover:text-charcoal hover:border-charcoal transition-colors duration-300">
                    collabs@anchor23.mx
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-cream p-6 md:p-8 text-center">
              <p className="font-body text-[14px] text-charcoal/60 mb-4">{t('legal.termsContact') as string}</p>
              <p className="font-body text-[14px] text-charcoal/60">
                <a href="mailto:legal@anchor23.mx" className="underline hover:text-charcoal transition-colors duration-300">legal@anchor23.mx</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
