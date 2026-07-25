"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling, mounted once at the root.
 *
 * Renders nothing — it only takes over the scroll behaviour of the document.
 * `scroll-behavior: smooth` in globals.css is disabled while this is active
 * because the two fight over anchor navigation; Lenis handles hash links via
 * its own `scrollTo`.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Hijacking scroll is exactly what vestibular-sensitive users disable, so
    // bail out entirely rather than shipping a faster-but-still-smooth variant.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Matches --ease-luxe: a long tail-off so momentum bleeds away instead
      // of stopping dead.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    document.documentElement.classList.add("lenis-active");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors must go through Lenis or they jump while it animates.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("lenis-active");
      lenis.destroy();
    };
  }, []);

  return null;
}
