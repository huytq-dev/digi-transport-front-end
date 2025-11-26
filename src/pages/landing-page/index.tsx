import { lazy, Suspense } from 'react';
import { cn } from '@/lib/utils';

// Lazy load all landing page components for better code splitting
const LandingHeader = lazy(() => import('@/features/landing-page/components/landing-header'));
const LandingHero = lazy(() => import('@/features/landing-page/components/landing-hero'));
const LandingUSP = lazy(() => import('@/features/landing-page/components/landing-usp'));
const LandingHowItWorks = lazy(() => import('@/features/landing-page/components/landing-how-it-works'));
const LandingPricing = lazy(() => import('@/features/landing-page/components/landing-pricing'));
const LandingTestimonials = lazy(() => import('@/features/landing-page/components/landing-testimonials'));
const LandingContact = lazy(() => import('@/features/landing-page/components/landing-contact'));
const LandingFooter = lazy(() => import('@/features/landing-page/components/landing-footer'));

// Simple loading fallback for components
const ComponentLoader = () => (
  <div className="flex items-center justify-center min-h-[200px] w-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-dark-blue)]"></div>
  </div>
);

function LandingPage() {
  return (
    <div className={cn("min-h-screen flex flex-col bg-[var(--color-cream)]")}>
      <Suspense fallback={<ComponentLoader />}>
        <LandingHeader />
      </Suspense>
      <main className="flex-grow w-full" role="main">
        <Suspense fallback={<ComponentLoader />}>
          <LandingHero />
        </Suspense>
        <Suspense fallback={<ComponentLoader />}>
          <LandingUSP />
        </Suspense>
        <Suspense fallback={<ComponentLoader />}>
          <LandingHowItWorks />
        </Suspense>
        {/* <LandingPromotions /> */}
        <Suspense fallback={<ComponentLoader />}>
          <LandingPricing />
        </Suspense>
        <Suspense fallback={<ComponentLoader />}>
          <LandingTestimonials />
        </Suspense>
        <Suspense fallback={<ComponentLoader />}>
          <LandingContact />
        </Suspense>
      </main>
      <Suspense fallback={<ComponentLoader />}>
        <LandingFooter />
      </Suspense>
    </div>
  );
}

export default LandingPage;
