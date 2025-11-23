import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { cn } from "@/lib/utils";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative min-h-screen",
        "bg-[var(--color-cream)]",
        "transition-colors duration-300"
      )}
    >
      {/* Auth Header */}
      <AuthHeader />

      {/* Background Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[var(--color-dark-blue)]/20 rounded-full mix-blend-multiply filter blur-[80px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-[var(--color-light-blue)]/25 rounded-full mix-blend-multiply filter blur-[80px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[-30%] left-[30%] w-[450px] h-[450px] bg-[var(--color-dark-blue)]/15 rounded-full mix-blend-multiply filter blur-[90px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Content Container */}
      <div className="relative z-10 flex justify-center px-4 py-12 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
