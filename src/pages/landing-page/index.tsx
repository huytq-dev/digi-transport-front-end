import { cn } from '@/lib/utils';

// Landing Page Components
import LandingHeader from '@/features/landing-page/components/landing-header';
import LandingHero from '@/features/landing-page/components/landing-hero';
import LandingUSP from '@/features/landing-page/components/landing-usp';
import LandingHowItWorks from '@/features/landing-page/components/landing-how-it-works';
import LandingPopularRoutes from '@/features/landing-page/components/landing-popular-routes';
import LandingDriverRecruitment from '@/features/landing-page/components/landing-driver-recruitment';
import LandingMobileApp from '@/features/landing-page/components/landing-mobile-app';
import LandingPricing from '@/features/landing-page/components/landing-pricing';
import LandingTestimonials from '@/features/landing-page/components/landing-testimonials';
import LandingContact from '@/features/landing-page/components/landing-contact';
import LandingFooter from '@/features/landing-page/components/landing-footer';

function LandingPage() {
  return (
    <div className={cn("min-h-screen flex flex-col bg-[var(--color-cream)]")}>
      <LandingHeader />
      <main className="flex-grow w-full" role="main">
        <LandingHero />
        <LandingUSP />
        <LandingHowItWorks />
        <LandingPopularRoutes />
        <LandingDriverRecruitment />
        <LandingMobileApp />
        <LandingPricing />
        <LandingTestimonials />
        <LandingContact />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
