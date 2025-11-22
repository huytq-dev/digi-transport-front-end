import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function LandingPopularRoutes() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routes = [
    { key: 'hn-hp', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800' },
    { key: 'hcm-vt', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800' },
    { key: 'dn-hue', image: 'https://images.unsplash.com/photo-1555993538-2e3c5d5a5b5a?w=800' },
  ];

  const handleRouteClick = (routeKey: string) => {
    navigate(`/search?route=${routeKey}`);
  };

  return (
    <section className="py-16 md:py-24 bg-white" aria-label="Popular routes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark-blue)]">
            {t('popularRoutes.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('popularRoutes.subtitle')}
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {routes.map((route) => (
            <Card
              key={route.key}
              className={cn(
                'bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer',
                'border-2 border-gray-100'
              )}
              onClick={() => handleRouteClick(route.key)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={t(`popularRoutes.routes.${route.key}.name`)}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {t(`popularRoutes.routes.${route.key}.name`)}
                  </h3>
                  <p className="text-lg font-semibold text-green-300">
                    {t(`popularRoutes.routes.${route.key}.price`)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/routes')}
            size="lg"
            className={cn(
              "px-8",
              "bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
            )}
          >
            {t('popularRoutes.viewAll')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LandingPopularRoutes;

