import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

// Animation rung lắc khi lỗi
export const shakeVariants = {
  idle: { x: 0 },
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

// Icon animation variants
export const iconVariants = {
  initial: { scale: 1, color: "#9CA3AF" }, // gray-400
  focus: { scale: 1.1, color: "var(--color-dark-blue)" },
};

// --- STYLING CLASSES ---
export const LABEL_CLASSES = "text-xs font-bold text-gray-600 uppercase tracking-wider pl-1";

// Style Input Dynamic: Thay đổi dựa trên trạng thái lỗi
export const getInputClasses = (hasError: boolean) =>
  cn(
    "rounded-xl transition-all duration-300 pl-10 h-12",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    // Normal State
    !hasError &&
      "bg-white/50 border-[var(--color-light-blue)]/30 hover:bg-white/80 hover:border-[var(--color-light-blue)]/50 focus:border-[var(--color-dark-blue)] focus:bg-white focus:shadow-md text-[var(--color-dark-blue)]",
    // Error State - Đổi màu nền và viền sang đỏ
    hasError &&
      "bg-red-50 border-red-500 text-red-900 placeholder:text-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-200"
  );

