"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion/tokens";

interface FadeRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms — kept in ms for API compatibility with earlier usage. */
  delay?: number;
  /** Travel distance in px. Larger for hero-scale blocks, smaller for dense grids. */
  distance?: number;
  /** Reveal from the side instead of from below. */
  direction?: "up" | "left" | "right";
  /** Adds a defocus pass to the entrance — reserve for feature moments. */
  blur?: boolean;
}

/**
 * Reveals children with a soft rise once they enter the viewport. Fires once.
 *
 * Runs on Framer Motion rather than IntersectionObserver + CSS classes, which
 * buys interruptibility (a reveal caught mid-flight retargets instead of
 * jumping) and lets reveals compose with the parallax and page-transition
 * primitives on a shared easing vocabulary.
 *
 * The props API is unchanged from the CSS implementation so every existing
 * caller upgrades without edits; `distance`, `direction` and `blur` are additive.
 */
export default function FadeReveal({
  children,
  className = "",
  delay = 0,
  distance = 28,
  direction = "up",
  blur = false,
}: FadeRevealProps) {
  const reduced = useReducedMotion();

  // Honour the OS setting by resolving to a plain fade: the content still
  // announces itself, but nothing travels across the screen.
  const offset = reduced
    ? {}
    : direction === "up"
      ? { y: distance }
      : { x: direction === "left" ? -distance : distance };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        ...(blur && !reduced ? { filter: "blur(12px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        ...(blur && !reduced ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: reduced ? duration.quick : duration.slow,
        delay: delay / 1000,
        ease: ease.luxe,
      }}
    >
      {children}
    </motion.div>
  );
}
