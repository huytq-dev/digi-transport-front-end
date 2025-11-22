import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Clock } from 'lucide-react';

function LandingDriverRecruitment() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: TrendingUp,
      key: 'revenue',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Calendar,
      key: 'management',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Clock,
      key: 'flexible',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section id="for-partners" className="py-16 md:py-24 bg-gradient-to-br from-[var(--color-cream)] to-white" aria-label="Driver recruitment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark-blue)]">
            {t('driverRecruitment.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('driverRecruitment.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.key}
                className={cn(
                  'bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                  'border-2 border-gray-100'
                )}
              >
                <CardContent className="p-6 text-center">
                  <div className={cn('w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4', benefit.bgColor)}>
                    <Icon className={cn('h-8 w-8', benefit.iconColor)} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--color-dark-blue)]">
                    {t(`driverRecruitment.benefits.${benefit.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`driverRecruitment.benefits.${benefit.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/register?type=driver')}
            size="lg"
            className={cn(
              "px-8",
              "bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
            )}
          >
            {t('driverRecruitment.cta')}
          </Button>
          <Button
            onClick={() => navigate('/driver-app')}
            size="lg"
            variant="outline"
            className={cn(
              "px-8 border-2 border-[var(--color-dark-blue)] text-[var(--color-dark-blue)]",
              "hover:bg-[var(--color-dark-blue)] hover:text-white"
            )}
          >
            {t('driverRecruitment.downloadApp')}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LandingDriverRecruitment;

