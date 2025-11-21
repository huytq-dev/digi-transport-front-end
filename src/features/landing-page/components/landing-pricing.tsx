import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingPlan {
  id: string;
  nameKey: string;
  priceKey: string;
  periodKey?: string;
  descriptionKey: string;
  featuresKey: string;
  popular?: boolean;
  ctaKey: string;
}

function LandingPricing() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const PRICING_PLANS: PricingPlan[] = useMemo(() => [
    {
      id: 'passenger',
      nameKey: 'pricing.passenger.name',
      priceKey: 'pricing.passenger.price',
      descriptionKey: 'pricing.passenger.description',
      featuresKey: 'pricing.passenger.features',
      ctaKey: 'pricing.passenger.cta',
    },
    {
      id: 'driver',
      nameKey: 'pricing.driver.name',
      priceKey: 'pricing.driver.price',
      periodKey: 'pricing.driver.period',
      descriptionKey: 'pricing.driver.description',
      featuresKey: 'pricing.driver.features',
      popular: true,
      ctaKey: 'pricing.driver.cta',
    },
    {
      id: 'enterprise',
      nameKey: 'pricing.enterprise.name',
      priceKey: 'pricing.enterprise.price',
      descriptionKey: 'pricing.enterprise.description',
      featuresKey: 'pricing.enterprise.features',
      ctaKey: 'pricing.enterprise.cta',
    },
  ], []);

  const handleGetStarted = useCallback((planId: string) => {
    if (planId === 'enterprise') {
      // Scroll to contact section or navigate to contact page
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/register');
    }
  }, [navigate]);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white" aria-label="Pricing plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark-blue)]">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                'relative transition-all duration-300',
                plan.popular
                  ? 'border-[var(--color-dark-blue)] scale-105 md:-mt-4 border-2'
                  : 'border-gray-200 hover:border-[var(--color-light-blue)] hover:shadow-xl border-2'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <Badge
                  className={cn(
                    'absolute -top-4 left-1/2 transform -translate-x-1/2',
                    'bg-[var(--color-dark-blue)] text-white px-4 py-1'
                  )}
                >
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="text-2xl text-[var(--color-dark-blue)]">{t(plan.nameKey)}</CardTitle>
                <CardDescription>{t(plan.descriptionKey)}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-[var(--color-dark-blue)]">{t(plan.priceKey)}</span>
                  {plan.periodKey && (
                    <span className="text-gray-600 ml-2 text-lg">{t(plan.periodKey)}</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4">
                  {(t(plan.featuresKey, { returnObjects: true }) as string[]).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className={cn(
                          'h-5 w-5 mr-3 flex-shrink-0 mt-0.5',
                          'text-[var(--color-dark-blue)]'
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleGetStarted(plan.id)}
                  className={cn(
                    'w-full',
                    plan.popular
                      ? 'bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]'
                      : 'bg-[var(--color-light-blue)] text-white hover:bg-[rgba(143,171,212,0.9)]'
                  )}
                  aria-label={`${t(plan.ctaKey)} for ${t(plan.nameKey)} plan`}
                >
                  {t(plan.ctaKey)}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            <strong>{t('pricing.note').split(':')[0]}:</strong> {t('pricing.note').split(':').slice(1).join(':').trim()}{' '}
            <a
              href="#contact"
              className={cn(
                'text-[var(--color-dark-blue)] hover:underline',
                'font-medium'
              )}
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('pricing.contactUs')}
            </a>{' '}
            {t('pricing.contactUsDesc')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default LandingPricing;

