import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {

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
        {/* Form - Header đã được di chuyển vào trong ForgotPasswordForm */}
        <ForgotPasswordForm />
      </motion.div>
    </AuthLayout>
  );
}

