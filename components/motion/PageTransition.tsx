"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion/tokens";

/**
 * Route entrance. Mounted from app/template.tsx, which React remounts on every
 * navigation — that remount is the trigger, so no route key or router
 * subscription is needed.
 *
 * Entrance only, no exit animation: App Router renders the next route as soon
 * as its data resolves, and holding an exit would stall navigation behind an
 * animation. A fast confident entrance reads better than a slow crossfade.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? duration.quick : duration.base,
        ease: ease.entrance,
      }}
    >
      {children}
    </motion.div>
  );
}
