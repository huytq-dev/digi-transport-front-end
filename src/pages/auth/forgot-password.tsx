import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  return (
    <AuthLayout>
      {/* Glass Card */}
      <motion.div
        className={cn(
          "w-full max-w-md",
          "bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg",
          "rounded-2xl p-8 sm:p-10",
          "hover:shadow-xl transition-all duration-300"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          bounce: 0.2,
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] mb-2">
            <AnimatedText>
              {t("auth.forgotPassword.title") || "Quên mật khẩu"}
            </AnimatedText>
          </h1>
          <p className="text-gray-600 text-sm">
            <AnimatedText>
              {t("auth.forgotPassword.subtitle") ||
                "Đặt lại mật khẩu của bạn"}
            </AnimatedText>
          </p>
        </div>

        {/* Form */}
        <ForgotPasswordForm />
      </motion.div>
    </AuthLayout>
  );
}

