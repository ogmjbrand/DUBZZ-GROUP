"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { spring } from "@/lib/motion/tokens";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Travel in px across the element's full scroll pass. Positive drifts the
   * layer down (it reads as *behind* the page); negative lifts it up (in front).
   */
  distance?: number;
  /** Pair with a background layer to add a slow push-in as it passes. */
  scale?: boolean;
}

/**
 * Scroll-driven parallax layer.
 *
 * The raw scroll value is passed through a spring so the layer carries a little
 * inertia instead of being welded to the scrollbar — without it, parallax reads
 * as mechanical rather than physical, and trackpad jitter shows up as jitter on
 * screen. Transform-only, so it stays on the compositor and off the main thread.
 */
export default function Parallax({
  children,
  className = "",
  distance = 80,
  scale = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, spring.weighted);
  const y = useTransform(smooth, [0, 1], [-distance, distance]);
  const s = useTransform(smooth, [0, 0.5, 1], [1.06, 1.12, 1.06]);

  // Parallax is pure vestibular motion with no informational value, so
  // reduced-motion users get the static layer rather than a damped one.
  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, ...(scale ? { scale: s } : {}), willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
