import { useTranslation } from 'react-i18next';
import { Search, Car, CreditCard, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AnimatedText } from '@/components/animated-text';
import { SmoothWrapper } from '@/components/smooth-wrapper';

function LandingHowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      key: 'step1',
      number: '01',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
    {
      icon: Car,
      key: 'step2',
      number: '02',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
    {
      icon: CreditCard,
      key: 'step3',
      number: '03',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
    {
      icon: MapPin,
      key: 'step4',
      number: '04',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="booking-guide" className="relative py-20 md:py-32 overflow-hidden bg-[var(--color-cream)]/30" aria-label="How it works">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-light-blue)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[var(--color-dark-blue)] tracking-tight">
            <SmoothWrapper className="inline-block">
              <AnimatedText>{t('howItWorks.title')}</AnimatedText>
            </SmoothWrapper>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <AnimatedText>{t('howItWorks.subtitle')}</AnimatedText>
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-[var(--color-light-blue)]/40 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                className="relative flex flex-col items-center text-center group"
                variants={itemVariants}
              >
                {/* Icon Circle (Glass Style) */}
                <div className="relative mb-6">
                  {/* Background Glow */}
                  <div
                    className={cn(
                      'absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl',
                      step.bg
                    )}
                  />

                  <div className="w-24 h-24 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                    {/* Colored Circle inside */}
                    <div className={cn('w-16 h-16 rounded-full flex items-center justify-center transition-colors', step.bg)}>
                      <Icon className={cn('h-8 w-8', step.color)} strokeWidth={2} />
                  </div>
                  
                    {/* Step Number Badge */}
                    <Badge
                      variant="default"
                      className={cn(
                        "absolute -top-2 -right-2 w-8 h-8 rounded-full",
                        "bg-[var(--color-dark-blue)] text-white border-2 border-white shadow-md",
                        "flex items-center justify-center text-xs font-bold p-0"
                      )}
                    >
                    {step.number}
                    </Badge>
                  </div>
                  </div>
                  
                  {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-[var(--color-dark-blue)] group-hover:text-[var(--color-dark-blue)]/80 transition-colors">
                  <SmoothWrapper className="inline-block">
                    <AnimatedText>{t(`howItWorks.steps.${step.key}.title`)}</AnimatedText>
                  </SmoothWrapper>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed px-4">
                    <AnimatedText>{t(`howItWorks.steps.${step.key}.description`)}</AnimatedText>
                  </p>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-6 text-[var(--color-light-blue)]/50">
                    <ArrowRight className="h-6 w-6 rotate-90" />
                </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default LandingHowItWorks;

