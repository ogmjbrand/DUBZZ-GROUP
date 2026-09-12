import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";
import ProductCard from "@/components/wear/ProductCard";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Dubbz Wear — Lifestyle Fashion",
  description:
    "Dubbz Wear is the Group's lifestyle fashion brand — premium T-shirts, hoodies, polos, joggers, caps, accessories, and limited edition collections built around confidence, creativity, and contemporary African culture.",
  alternates: { canonical: "/wear" },
};

export default function WearPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(150deg, #141414 0%, #0a0a0a 45%, #000000 100%), radial-gradient(70% 55% at 20% 10%, rgba(240,217,140,0.14) 0%, transparent 60%)",
          }}
        />
        <CinematicVideo name="wear-film" poster="/posters/wear-film.jpg" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-wear">Dubbz Wear · 02</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,7.4vw,6rem)] leading-[1.03] text-white">
              Fashion inspired
              <span className="italic text-wear"> by purpose.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              The Group&apos;s lifestyle fashion brand — premium everyday pieces
              drawn from simplicity, functionality, and contemporary African
              culture, made for people who move with confidence.
            </p>
          </FadeReveal>
          <FadeReveal delay={200} className="mt-12 flex flex-wrap gap-4">
            <Button href="#collection" size="lg">
              Shop the Collection
            </Button>
            <Button href="/wear/wishlist" variant="secondary" size="lg">
              Your Wishlist
            </Button>
          </FadeReveal>
        </div>
      </section>

      {/* Collection */}
      <Section id="collection">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <SectionHeading
            overline="The Collection"
            title="Built for every day."
            className="mb-0 md:mb-0"
          />
          <FadeReveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-neutral">
              T-shirts, hoodies, polos, joggers, caps, and accessories —
              alongside limited edition collections released as numbered runs.
            </p>
          </FadeReveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <FadeReveal key={p.slug} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Ethos strip */}
      <Section className="border-t border-white/5">
        <div className="grid gap-10 text-center sm:grid-cols-3">
          {[
            { title: "Confidence", body: "Pieces designed to be worn every day by people who are building something." },
            { title: "Simplicity", body: "Clean silhouettes and considered finishing, with nothing on a garment that has not earned its place." },
            { title: "Culture", body: "Rooted in contemporary African style, and made to travel well beyond it." },
          ].map((e, i) => (
            <FadeReveal key={e.title} delay={i * 90}>
              <div>
                <h3 className="font-display text-2xl text-white">{e.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-neutral">{e.body}</p>
              </div>
            </FadeReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
