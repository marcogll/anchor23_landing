import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-cream py-[60px] md:py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div>
            <h3 className="font-display text-[18px] tracking-[3px] uppercase text-charcoal mb-4">ANCHOR:23</h3>
            <p className="font-body text-[14px] text-charcoal/60 leading-[1.6]">{t('footer.brand') as string}</p>
          </div>
          <div>
            <h4 className="font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-4">{t('footer.links') as string}</h4>
            <ul className="space-y-2">
              {[{ label: t('nav.home') as string, to: '/' }, { label: t('nav.about') as string, to: '/historia' }, { label: t('nav.services') as string, to: '/servicios' }, { label: t('nav.memberships') as string, to: '/membresias' }, { label: t('nav.work') as string, to: '/join' }, { label: t('nav.spaces') as string, to: '/espacios' }, { label: t('nav.contact') as string, to: '/contacto' }].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-[14px] text-charcoal/60 hover:text-charcoal transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-4">{t('footer.legal') as string}</h4>
            <ul className="space-y-2">
              {[
                { label: t('footer.terms') as string, to: '/legal' },
                { label: t('footer.privacy') as string, to: '/privacy-policy' },
                { label: t('footer.cancellation') as string, to: '/cancellation' },
                { label: t('footer.franchises') as string, to: '/franchises' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-[14px] text-charcoal/60 hover:text-charcoal transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-[12px] uppercase tracking-[2px] text-charcoal mb-4">{t('footer.newsletter') as string}</h4>
            <p className="font-body text-[14px] text-charcoal/60 mb-4">{t('footer.newsletterText') as string}</p>
            <div className="flex">
              <input type="email" placeholder={t('footer.emailPlaceholder') as string} className="flex-1 bg-transparent border border-charcoal/20 px-4 py-2 font-body text-[14px] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal/50" />
              <button className="bg-charcoal text-cream px-4 py-2 font-display text-[11px] uppercase tracking-[1px] hover:bg-earth transition-colors duration-300">{t('footer.subscribe') as string}</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-[11px] uppercase tracking-[1px] text-charcoal/50">{t('footer.copyright') as string}</p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/anchor23.mx" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal transition-colors duration-300" aria-label="Instagram"><i className="fa-brands fa-instagram text-[18px]"></i></a>
            <a href="https://www.facebook.com/anchor23.mx" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal transition-colors duration-300" aria-label="Facebook"><i className="fa-brands fa-facebook-f text-[18px]"></i></a>
            <a href="https://www.youtube.com/anchor23.mx" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal transition-colors duration-300" aria-label="YouTube"><i className="fa-brands fa-youtube text-[18px]"></i></a>
            <a href="https://www.pinterest.com/anchor23.mx" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-charcoal transition-colors duration-300" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p text-[18px]"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
