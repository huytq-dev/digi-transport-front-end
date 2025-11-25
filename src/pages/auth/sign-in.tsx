import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SignInPage() {

  return (
    <AuthLayout>
      {/* Glass Card */}
      <motion.div
        className={cn(
          "w-full max-w-md",
          "bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl",
          "rounded-3xl p-8 sm:p-12",
          "transition-all duration-300"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 0.6,
          bounce: 0.2,
        }}
      >
        {/* Form - Header đã được di chuyển vào trong SignInForm */}
        <SignInForm />
      </motion.div>
    </AuthLayout>
  );
}

