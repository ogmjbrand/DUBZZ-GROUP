import type { ReactNode } from "react";

/**
 * A stated development status.
 *
 * The corporate profile describes Dubbz Wines Resort as a vision with future
 * concepts, and puts the launch of Dubbz Wear inside the 2026 foundation
 * year. Both sections of this site are built out as if they were already
 * trading, which reads as confidence right up until a visitor tries to
 * arrive somewhere.
 *
 * Saying "in development" plainly costs nothing — a published roadmap is a
 * more credible signal than a silent one — and it is the difference between
 * an ambitious brand and an inaccurate one.
 */
export default function StatusNote({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={`flex flex-col gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-5 py-4 sm:flex-row sm:items-baseline sm:gap-5 ${className}`}
    >
      <span className="overline-label shrink-0 text-[10px] text-gold">{label}</span>
      <p className="text-sm leading-relaxed text-white/70">{children}</p>
    </aside>
  );
}
