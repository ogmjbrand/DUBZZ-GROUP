import Image from "next/image";
import type { ReactNode } from "react";

interface VisualProps {
  /** CSS background — the art-directed backdrop, and the fallback when no image exists. */
  background: string;
  /** Path to real photography under /public. When absent the gradient stands alone. */
  src?: string;
  /** Required whenever `src` is set. Pass "" only for imagery that is purely decorative. */
  alt?: string;
  className?: string;
  children?: ReactNode;
  zoomOnHover?: boolean;
  /** Set on the LCP image (above-the-fold heroes) to opt out of lazy loading. */
  priority?: boolean;
  /** Responsive sizes hint. Defaults to full-viewport width. */
  sizes?: string;
  /** Darkens the image so overlaid type keeps its contrast ratio. */
  scrim?: boolean;
}

/**
 * Image frame with an art-directed gradient backdrop.
 *
 * The gradient is not a placeholder to be removed once photography lands — it
 * stays underneath as the division tint, so a slow or failed image degrades to
 * a composed surface rather than an empty box, and there is no layout shift
 * while it loads. Passing `src` layers real photography on top.
 */
export default function Visual({
  background,
  src,
  alt,
  className = "",
  children,
  zoomOnHover,
  priority,
  sizes = "100vw",
  scrim,
}: VisualProps) {
  const zoom = zoomOnHover
    ? "transition-transform duration-[1.6s] ease-luxe group-hover:scale-105"
    : "";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden style={{ background }} className={`absolute inset-0 ${src ? "" : zoom}`} />

      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${zoom}`}
        />
      ) : null}

      {scrim ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent"
        />
      ) : null}

      <div aria-hidden className="grain absolute inset-0" />
      {children ? <div className="relative h-full">{children}</div> : null}
    </div>
  );
}
