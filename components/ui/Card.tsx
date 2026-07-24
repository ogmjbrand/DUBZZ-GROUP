import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Disable the hover lift for purely informational cards */
  static?: boolean;
}

/**
 * Glass surface card with a gold-gradient border reveal and 4px lift on hover.
 * The 1px gradient border is a padding-hack: outer wrapper carries the gradient,
 * inner surface sits on top.
 */
export default function Card({
  children,
  className = "",
  innerClassName = "",
  static: isStatic,
}: CardProps) {
  return (
    <div
      className={[
        "group/card relative rounded-lg p-px bg-white/8 transition-all duration-500",
        isStatic
          ? ""
          : "hover:-translate-y-1 hover:bg-[linear-gradient(135deg,rgba(212,175,55,0.65)_0%,rgba(212,175,55,0.1)_45%,rgba(212,175,55,0.55)_100%)] hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)]",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "relative h-full overflow-hidden rounded-[7px] bg-surface",
          innerClassName,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
