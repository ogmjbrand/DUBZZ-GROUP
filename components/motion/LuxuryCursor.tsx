"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { spring } from "@/lib/motion/tokens";

/**
 * Cursor companion — a lagging gold ring that widens over interactive targets.
 *
 * The native cursor is deliberately left visible. Replacing it entirely is the
 * usual "luxury cursor" move and it costs real usability: the OS cursor carries
 * state this can't (text I-beam, resize, disabled), and any dropped frame makes
 * the pointer feel broken rather than stylish. This trails it instead.
 */
export default function LuxuryCursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.magnetic);
  const sy = useSpring(y, spring.magnetic);

  useEffect(() => {
    // Fine pointer only: on touch there is no cursor to accompany, and
    // reduced-motion users get nothing that trails. Bailing before the
    // listeners attach leaves `visible` false, so the ring stays at opacity 0
    // and inert -- no enabled flag needed, and no setState during the effect.
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      setActive(
        !!el?.closest?.('a, button, [role="button"], input, select, textarea, summary')
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full border border-gold/60"
        animate={{
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          opacity: visible ? (active ? 0.9 : 0.45) : 0,
          margin: active ? -22 : -13,
        }}
        transition={spring.responsive}
      />
    </motion.div>
  );
}
