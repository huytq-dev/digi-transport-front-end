import { cn } from '@/lib/utils';

// Landing Page Components
import LandingHeader from '@/features/landing-page/components/landing-header';
import LandingHero from '@/features/landing-page/components/landing-hero';
import LandingFooter from '@/features/landing-page/components/landing-footer';
import LandingTestimonials from '@/features/landing-page/components/landing-testimonials';
import LandingPricing from '@/features/landing-page/components/landing-pricing';

function LandingPage() {
  return (
    <div className={cn("min-h-screen flex flex-col bg-[var(--color-cream)]")}>
      <LandingHeader />
      <main className="flex-grow w-full" role="main">
        <LandingHero />
        <LandingPricing />
        <LandingTestimonials />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;

