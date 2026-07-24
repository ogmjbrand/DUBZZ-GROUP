"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
}

/** Reveals children with a soft rise once they enter the viewport. Fires once. */
export default function FadeReveal({ children, className = "", delay = 0 }: FadeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced-motion users still get the reveal — globals.css collapses the
    // transition to ~0ms, so observing unconditionally is safe.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
