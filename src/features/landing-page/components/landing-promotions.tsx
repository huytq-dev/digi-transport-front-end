import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Percent } from 'lucide-react';

function LandingPromotions() {
  const { t } = useTranslation();

  // Promotions data from translation
  const promotions = [
    {
      id: '1',
      key: 'firstTrip',
    },
    {
      id: '2',
      key: 'weekend',
    },
    {
      id: '3',
      key: 'private',
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Show toast notification - in production, use a proper toast library
    alert(`${t('promotions.copied')} ${code}`);
  };

  return (
    <section id="promotions" className="py-16 md:py-24 bg-[var(--color-cream)]" aria-label="Promotions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Gift className="h-8 w-8 text-[var(--color-dark-blue)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark-blue)]">
              {t('header.promotions')}
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('promotions.subtitle')}
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {promotions.map((promo) => {
            const promoData = t(`promotions.items.${promo.key}`, { returnObjects: true }) as {
              title: string;
              description: string;
              discount: string;
              code: string;
            };
            
            return (
              <Card
                key={promo.id}
                className={cn(
                  'bg-gradient-to-br from-[var(--color-light-blue)] to-[var(--color-dark-blue)] text-white',
                  'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                  'border-2 border-transparent'
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{promoData.title}</h3>
                      <p className="text-white/90 text-sm mb-4">{promoData.description}</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-3">
                      <Percent className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div>
                      <p className="text-sm text-white/80 mb-1">{t('promotions.promoCode')}</p>
                      <p className="text-2xl font-bold">{promoData.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80 mb-1">{t('promotions.discount')}</p>
                      <p className="text-2xl font-bold">{promoData.discount}</p>
                    </div>
                  </div>
                  <Button
                    className={cn(
                      "w-full mt-4",
                      "bg-white text-[var(--color-dark-blue)] hover:bg-gray-100"
                    )}
                    onClick={() => handleCopyCode(promoData.code)}
                  >
                    {t('promotions.copyCode')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingPromotions;
