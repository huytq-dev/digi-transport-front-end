import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function LandingHero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGetStarted = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleLearnMore = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <section
      className={cn(
        "text-white min-h-[calc(100vh-4rem)] flex items-center",
        "bg-gradient-to-r from-[var(--color-light-blue)] to-[var(--color-dark-blue)]"
      )}
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className={cn(
                "px-8 text-lg",
                "bg-[var(--color-cream)] text-[var(--color-dark-blue)] hover:bg-[rgba(239,236,227,0.9)]"
              )}
              aria-label={t('hero.getStarted')}
            >
              {t('hero.getStarted')}
            </Button>
            <Button
              onClick={handleLearnMore}
              size="lg"
              variant="outline"
              className={cn(
                "px-8 text-lg border-2 border-white text-white",
                "hover:bg-white hover:text-[var(--color-dark-blue)]"
              )}
              aria-label={t('hero.learnMore')}
            >
              {t('hero.learnMore')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;

