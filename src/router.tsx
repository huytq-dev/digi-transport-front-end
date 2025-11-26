import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load pages for code splitting
const LandingPage = lazy(() => import("./pages/landing-page/index"));
const SignUpPage = lazy(() => import("./pages/auth/sign-up"));
const SignInPage = lazy(() => import("./pages/auth/sign-in"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/forgot-password"));
const ResetPasswordPage = lazy(() => import("./pages/auth/reset-password"));
const VerifyEmailPage = lazy(() => import("./pages/auth/verify-email"));
const HomePage = lazy(() => import("./pages/home/index"));
const BookingsPage = lazy(() => import("./pages/bookings/index"));
const TripsPage = lazy(() => import("./pages/trips/index"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-dark-blue)]"></div>
  </div>
);

export const Router = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

        {/* Home Routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/bookings" element={<BookingsPage />} />
        <Route path="/home/trips" element={<TripsPage />} />
      </Routes>
    </Suspense>
  );
};
