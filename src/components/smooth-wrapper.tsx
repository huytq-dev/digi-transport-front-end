import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SmoothWrapperProps {
  children: React.ReactNode;
  className?: string;
  layoutId?: string;
}

export const SmoothWrapper = ({ children, className, layoutId }: SmoothWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      // QUAN TRỌNG: Chỉ dùng layout, KHÔNG dùng layoutRoot
      layout={!shouldReduceMotion}
      
      layoutId={layoutId}
      
      transition={
        shouldReduceMotion
          ? { layout: { duration: 0 } }
          : {
              // Dùng easeInOut sẽ mượt hơn spring cho việc resize container chứa text
              layout: { duration: 0.3, ease: "easeInOut" },
              // Hoặc nếu thích nảy: type: "spring", stiffness: 300, damping: 30
            }
      }
      
      className={cn(
        // QUAN TRỌNG: 
        // 1. inline-flex: Để width ôm sát nội dung text (nội dung dài -> box dài)
        // 2. relative: Để định vị chuẩn
        // 3. overflow-hidden: Để che phần text cũ đang trượt ra
        "relative inline-flex items-center justify-start overflow-hidden",
        !shouldReduceMotion && "will-change-[width,height]", 
        className
      )}
    >
      {children}
    </motion.div>
  );
};