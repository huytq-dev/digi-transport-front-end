import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Users, Shield, CreditCard } from 'lucide-react';

function LandingUSP() {
  const { t } = useTranslation();

  const uspItems = [
    {
      icon: Sparkles,
      key: 'smartMatching',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Users,
      key: 'flexible',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Shield,
      key: 'transparent',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: CreditCard,
      key: 'payment',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white" aria-label="Why choose Digi Transport">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark-blue)]">
            {t('usp.title')}
          </h2>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {uspItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.key}
                className={cn(
                  'bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                  'border-2 border-gray-100'
                )}
              >
                <CardContent className="p-6">
                  <div className={cn('w-16 h-16 rounded-full flex items-center justify-center mb-4', item.bgColor)}>
                    <Icon className={cn('h-8 w-8', item.iconColor)} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--color-dark-blue)]">
                    {t(`usp.items.${item.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`usp.items.${item.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingUSP;

