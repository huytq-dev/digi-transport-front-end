import type { Transition } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Get optimized transition for mobile/reduced motion
 * Returns shorter duration and simpler easing for mobile devices
 */
export function useMotionTransition(): Transition {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return {
      duration: 0.15,
      ease: "easeOut",
    };
  }

  return {
    duration: 0.6,
    ease: "easeOut",
  };
}

/**
 * Get optimized spring transition for mobile
 */
export function useSpringTransition() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return {
      type: "tween" as const,
      duration: 0.2,
      ease: "easeOut",
    };
  }

  return {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  };
}

/**
 * Get viewport settings optimized for mobile
 */
export function useViewportSettings() {
  const shouldReduceMotion = useReducedMotion();

  return {
    once: true,
    margin: shouldReduceMotion ? "0px" : "-100px",
    amount: shouldReduceMotion ? 0 : 0.3,
  };
}

