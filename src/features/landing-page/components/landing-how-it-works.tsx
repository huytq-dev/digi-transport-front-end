import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Search, Car, CreditCard, MapPin } from 'lucide-react';

function LandingHowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      key: 'step1',
      number: '1',
    },
    {
      icon: Car,
      key: 'step2',
      number: '2',
    },
    {
      icon: CreditCard,
      key: 'step3',
      number: '3',
    },
    {
      icon: MapPin,
      key: 'step4',
      number: '4',
    },
  ];

  return (
    <section id="booking-guide" className="py-16 md:py-24 bg-[var(--color-cream)]" aria-label="How it works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark-blue)]">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative">
                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-[var(--color-light-blue)] transform translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10 text-center">
                  {/* Icon Circle */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-light-blue)] to-[var(--color-dark-blue)] flex items-center justify-center shadow-lg">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-dark-blue)] text-white flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-[var(--color-dark-blue)]">
                    {t(`howItWorks.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(`howItWorks.steps.${step.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingHowItWorks;

