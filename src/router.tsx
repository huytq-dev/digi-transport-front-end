import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/index";
import SignUpPage from "./pages/auth/sign-up";
import SignInPage from "./pages/auth/sign-in";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import VerifyEmailPage from "./pages/auth/verify-email";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing-page" element={<LandingPage />} />

      {/* Auth Routes */}
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

    </Routes>
  );
};
