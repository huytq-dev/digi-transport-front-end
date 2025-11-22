import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Smartphone, QrCode } from 'lucide-react';

function LandingMobileApp() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[var(--color-dark-blue)] to-[var(--color-light-blue)]" aria-label="Mobile app">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('mobileApp.title')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('mobileApp.subtitle')}
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className={cn(
                  "bg-white text-[var(--color-dark-blue)] hover:bg-gray-100",
                  "flex items-center justify-center gap-2"
                )}
                onClick={() => window.open('https://play.google.com/store', '_blank')}
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                {t('mobileApp.googlePlay')}
              </Button>
              <Button
                size="lg"
                className={cn(
                  "bg-white text-[var(--color-dark-blue)] hover:bg-gray-100",
                  "flex items-center justify-center gap-2"
                )}
                onClick={() => window.open('https://apps.apple.com', '_blank')}
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05,20.28L14.18,17.41C13.32,18.35 12.2,19 11,19A6,6 0 0,1 5,13C5,11.8 5.65,10.68 6.59,9.82L3.72,6.95C2.25,8.27 1.39,10.16 1.39,12.25C1.39,16.04 4.36,19.11 8.15,19.11C10.24,19.11 12.13,18.25 13.45,16.78M19.96,6.7C19.96,2.91 16.89,-0.06 13.1,-0.06C11,-0.06 9.11,0.8 7.78,2.27L10.65,5.14C11.51,4.2 12.63,3.55 13.83,3.55A6,6 0 0,1 19.83,9.55C19.83,10.75 19.18,11.87 18.24,12.73L21.11,15.6C22.59,14.27 23.45,12.38 23.45,10.29C23.45,8.2 22.59,6.31 21.11,5L19.96,6.7Z" />
                </svg>
                {t('mobileApp.appStore')}
              </Button>
            </div>

            {/* QR Code */}
            <div className="flex items-center gap-4">
              <div className="bg-white p-4 rounded-lg">
                <QrCode className="h-24 w-24 text-[var(--color-dark-blue)]" />
              </div>
              <p className="text-white/90 text-sm">
                {t('mobileApp.scanQR')}
              </p>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="hidden lg:block relative">
            <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Phone Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-light-blue)] to-[var(--color-dark-blue)] p-6 flex flex-col items-center justify-center">
                  <Smartphone className="h-32 w-32 text-white/50 mb-4" />
                  <h3 className="text-white text-xl font-bold mb-2">{t('mobileApp.mockupTitle')}</h3>
                  <p className="text-white/80 text-center text-sm">{t('mobileApp.mockupSubtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingMobileApp;

