import { Link } from "react-router-dom";
import { Caravan } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ANIMATION_DURATION = 0.2;

export function AuthHeader() {
  const { t } = useTranslation();

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50",
        "border-b border-white/50",
        "overflow-hidden"
      )}
      initial={false}
      animate={{
        height: "5rem", // h-20
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
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

      {/* Glass Overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full border-b border-white/50"
        initial={false}
        animate={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Content */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: ANIMATION_DURATION }}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Caravan className="h-8 w-8 text-[var(--color-dark-blue)]" />
              </motion.div>
              <motion.span
                className="text-2xl font-extrabold text-[var(--color-dark-blue)]"
                initial={false}
                animate={{
                  fontSize: "1.5rem",
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedText>DigiTransport</AnimatedText>
              </motion.span>
            </motion.div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button
              variant="ghost"
              className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-transparent hidden sm:flex"
            >
              <AnimatedText>
                {t("common.help") || "Trợ giúp"}
              </AnimatedText>
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

