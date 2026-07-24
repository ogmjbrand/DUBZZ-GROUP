import type { ReactNode } from "react";

/**
 * Gradient composition standing in for photography — carries the division tint,
 * a film-grain pass, and an optional slow zoom on group hover.
 */
export default function Visual({
  background,
  className = "",
  children,
  zoomOnHover,
}: {
  background: string;
  className?: string;
  children?: ReactNode;
  zoomOnHover?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        style={{ background }}
        className={[
          "absolute inset-0",
          zoomOnHover
            ? "transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            : "",
        ].join(" ")}
      />
      <div aria-hidden className="grain absolute inset-0" />
      {children ? <div className="relative h-full">{children}</div> : null}
    </div>
  );
}
