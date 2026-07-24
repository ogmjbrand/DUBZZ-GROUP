import type { ReactNode } from "react";
import FadeReveal from "@/components/motion/FadeReveal";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 sm:px-10 md:py-32 lg:px-16 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  overline,
  title,
  lede,
  align = "left",
  className = "",
}: {
  overline: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <FadeReveal
      className={[
        "mb-14 max-w-3xl md:mb-20",
        centered ? "mx-auto text-center" : "",
        className,
      ].join(" ")}
    >
      <p className="overline-label text-gold">{overline}</p>
      <h2 className="mt-5 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {lede ? (
        <p className={`mt-6 max-w-xl text-base leading-relaxed text-neutral sm:text-lg ${centered ? "mx-auto" : ""}`}>
          {lede}
        </p>
      ) : null}
    </FadeReveal>
  );
}
