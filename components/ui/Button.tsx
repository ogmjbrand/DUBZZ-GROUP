"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-background hover:bg-gold-bright shadow-[0_0_0_0_rgba(212,175,55,0)] hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.5)]",
  secondary:
    "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10",
  ghost: "text-white/70 hover:text-gold",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[10px]",
  md: "px-7 py-3.5 text-[11px]",
  lg: "px-9 py-4.5 text-xs",
};

/** Magnetic-hover button per the brief — nudges toward the cursor, snaps back on leave. */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const classes = [
    "inline-flex items-center justify-center gap-2.5 rounded-lg font-label font-semibold uppercase tracking-[0.24em]",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out will-change-transform",
    "disabled:pointer-events-none disabled:opacity-40",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}
