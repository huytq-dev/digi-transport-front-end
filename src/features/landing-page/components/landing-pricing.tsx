import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AnimatedText } from '@/components/animated-text';

interface PricingPlan {
  id: string;
  nameKey: string;
  priceKey: string;
  periodKey?: string;
  descriptionKey: string;
  featuresKey: string;
  popular?: boolean;
  ctaKey: string;
  icon: any;
}

function LandingPricing() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const PRICING_PLANS: PricingPlan[] = useMemo(
    () => [
      {
        id: 'passenger',
        nameKey: 'pricing.passenger.name',
        priceKey: 'pricing.passenger.price',
        descriptionKey: 'pricing.passenger.description',
        featuresKey: 'pricing.passenger.features',
        ctaKey: 'pricing.passenger.cta',
        icon: Sparkles,
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
        icon: Zap,
      },
      {
        id: 'enterprise',
        nameKey: 'pricing.enterprise.name',
        priceKey: 'pricing.enterprise.price',
        descriptionKey: 'pricing.enterprise.description',
        featuresKey: 'pricing.enterprise.features',
        ctaKey: 'pricing.enterprise.cta',
        icon: Building2,
      },
    ],
    []
  );

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
    <section id="pricing" className="relative py-20 md:py-32 overflow-hidden" aria-label="Pricing plans">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-cream)]/30 -z-20" />
      
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{ backgroundColor: 'rgba(143, 171, 212, 0.2)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] -z-10 pointer-events-none"
        style={{ backgroundColor: 'rgba(74, 112, 169, 0.15)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-[var(--color-dark-blue)] tracking-tight">
            <AnimatedText>{t('pricing.title')}</AnimatedText>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <AnimatedText>{t('pricing.subtitle')}</AnimatedText>
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
          {PRICING_PLANS.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn('relative group h-full', plan.popular && 'md:-mt-4 md:mb-4')}
              >
                {/* Card Container */}
                <Card
                  className={cn(
                    'h-full border-0 relative overflow-hidden flex flex-col rounded-[2rem] transition-all duration-300',
                    'bg-white/60 backdrop-blur-xl',
                    plan.popular
                      ? 'shadow-2xl shadow-[var(--color-dark-blue)]/20 ring-2 ring-[var(--color-dark-blue)] ring-offset-2 ring-offset-white'
                      : 'shadow-lg hover:shadow-xl border border-white/50 hover:border-[var(--color-light-blue)]/50'
                  )}
                >
                  {/* Popular Badge Gradient */}
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--color-dark-blue)] via-[var(--color-light-blue)] to-[var(--color-dark-blue)]" />
                  )}

                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 text-xs font-bold",
                          "bg-[var(--color-light-blue)]/20 text-[var(--color-dark-blue)]",
                          "border-[var(--color-light-blue)]/30 shadow-sm"
                        )}
                      >
                        {t('pricing.popular') || 'Phổ biến nhất'}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pt-8 pb-0 px-8">
                    {/* Icon Box */}
                    <div
                      className={cn(
                        'w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm transition-transform duration-300 group-hover:scale-110',
                        plan.popular
                          ? 'bg-[var(--color-dark-blue)] text-white'
                          : 'bg-white text-[var(--color-dark-blue)] border border-gray-100'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--color-dark-blue)]">
                      <AnimatedText>{t(plan.nameKey)}</AnimatedText>
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 min-h-[40px]">
                      <AnimatedText>{t(plan.descriptionKey)}</AnimatedText>
                    </p>
                  </CardHeader>

                  <CardContent className="px-8 py-8 flex-grow">
                    {/* Price Display */}
                    <div className="flex items-baseline mb-8">
                      <span
                        className={cn(
                          'text-4xl font-extrabold tracking-tight',
                          plan.popular ? 'text-[var(--color-dark-blue)]' : 'text-[var(--color-dark-blue)]'
                        )}
                      >
                        <AnimatedText>{t(plan.priceKey)}</AnimatedText>
                      </span>
                      {plan.periodKey && (
                        <span className="text-gray-500 ml-2 font-medium">
                          / <AnimatedText>{t(plan.periodKey)}</AnimatedText>
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gray-200/60 mb-8" />

                    {/* Features List */}
                    <ul className="space-y-4">
                      {(t(plan.featuresKey, { returnObjects: true }) as string[]).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div
                            className={cn(
                              'mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center',
                              plan.popular
                                ? 'bg-[var(--color-light-blue)]/20 text-[var(--color-dark-blue)]'
                                : 'bg-gray-100 text-gray-500'
                            )}
                          >
                            <Check className="h-3 w-3 stroke-[3px]" />
                          </div>
                          <span className="text-gray-600 text-sm font-medium leading-snug">
                            <AnimatedText>{feature}</AnimatedText>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="px-8 pb-8">
                    <Button
                      onClick={() => handleGetStarted(plan.id)}
                      size="lg"
                      className={cn(
                        'w-full h-12 rounded-xl text-base font-bold shadow-lg transition-all hover:scale-[1.02]',
                        plan.popular
                          ? 'bg-[var(--color-dark-blue)] hover:bg-[rgba(74,112,169,0.9)] text-white shadow-[var(--color-dark-blue)]/20'
                          : 'bg-white text-[var(--color-dark-blue)] border border-gray-200 hover:bg-[var(--color-light-blue)]/10 hover:border-[var(--color-light-blue)] hover:text-[var(--color-dark-blue)]'
                      )}
                    >
                      <AnimatedText>{t(plan.ctaKey)}</AnimatedText>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm bg-white/50 inline-block px-6 py-3 rounded-full border border-white/50 backdrop-blur-sm">
            <strong>
              <AnimatedText>{t('pricing.note').split(':')[0]}</AnimatedText>
            </strong>
            : <AnimatedText>{t('pricing.note').split(':').slice(1).join(':').trim()}</AnimatedText>{' '}
            <a
              href="#contact"
              className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 font-semibold hover:underline ml-1"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <AnimatedText>{t('pricing.contactUs')}</AnimatedText>
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingPricing;

