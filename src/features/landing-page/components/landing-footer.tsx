import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

function LandingFooter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);

  const handleScrollToTop = useCallback(() => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [isHomePage, navigate]);

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  }, [email]);

  const SOCIAL_LINKS: SocialLink[] = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: 'Zalo',
      href: '#',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: '#',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
  ] as const;

  const QUICK_LINKS = [
    { key: 'header.about', href: '#about' },
    { key: 'header.bookingGuide', href: '#booking-guide' },
    { key: 'header.forPartners', href: '#for-partners' },
    { key: 'header.promotions', href: '#promotions' },
    { key: 'header.contact', href: '#contact' },
  ];

  const LEGAL_LINKS = [
    { key: 'footer.links.privacy', href: '/privacy' },
    { key: 'footer.links.terms', href: '/terms' },
    { key: 'footer.links.regulations', href: '/regulations' },
    { key: 'footer.links.complaints', href: '/complaints' },
  ];

  return (
    <footer className={cn("bg-[var(--color-black)] text-white")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.companyInfo.name')}</h3>
            <p className="text-sm mb-2 text-white/90">{t('footer.companyInfo.taxCode')}</p>
            <p className="text-sm mb-2 text-white/90">{t('footer.companyInfo.address')}</p>
            <p className="text-sm mb-4 text-white/90">{t('footer.companyInfo.hotline')}</p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={cn("transition-colors text-[var(--color-light-blue)] hover:text-white")}
                  aria-label={`Follow us on ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="quick-links-heading">
            <h4 id="quick-links-heading" className="text-white text-sm font-semibold mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-sm" role="list">
              {QUICK_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href.startsWith('#')) {
                        const element = document.querySelector(link.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigate(link.href);
                      }
                    }}
                    className={cn("transition-colors text-[var(--color-light-blue)] hover:text-white")}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav aria-labelledby="legal-heading">
            <h4 id="legal-heading" className="text-white text-sm font-semibold mb-4">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2 text-sm" role="list">
              {LEGAL_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.href);
                    }}
                    className={cn("transition-colors text-[var(--color-light-blue)] hover:text-white")}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="max-w-md">
            <h4 className="text-white text-sm font-semibold mb-2">{t('footer.newsletter.title')}</h4>
            <p className="text-sm text-white/80 mb-4">{t('footer.newsletter.subtitle')}</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-blue)]"
                required
              />
              <Button
                type="submit"
                className={cn(
                  "bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
                )}
              >
                {t('footer.newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white/80">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <Button
            onClick={handleScrollToTop}
            variant="ghost"
            size="sm"
            className="mt-4 sm:mt-0 text-[var(--color-light-blue)] hover:text-white"
            aria-label={t('footer.backToTop')}
          >
            <span>{t('footer.backToTop')}</span>
            <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
