import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-40 text-center">
      <div aria-hidden className="grain absolute inset-0" />
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(12rem,40vw,32rem)] leading-none text-white/[0.03]"
      >
        404
      </p>
      <div className="relative">
        <p className="overline-label text-gold">Lost in the dark</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
          This room doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-neutral">
          The page you&apos;re looking for was moved, renamed, or was never part
          of the estate. Let us walk you back.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Return Home</Button>
          <Button href="/search" variant="secondary">
            Search the Site
          </Button>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            { label: "Media", href: "/media" },
            { label: "Wear", href: "/wear" },
            { label: "Wine Resort", href: "/wine-resort" },
            { label: "Trade", href: "/trade" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
