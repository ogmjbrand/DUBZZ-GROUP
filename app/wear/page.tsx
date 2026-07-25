import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";
import ProductCard from "@/components/wear/ProductCard";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Dubzz Wear — Luxury Fashion",
  description:
    "Dubzz Wear — quiet luxury cut sharp. Numbered runs, architectural silhouettes, and gold spent like a precious resource.",
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
              "linear-gradient(150deg, #171613 0%, #0c0b0a 45%, #050505 100%), radial-gradient(70% 55% at 20% 10%, rgba(232,227,216,0.1) 0%, transparent 60%)",
          }}
        />
        <CinematicVideo name="wear-film-1080" poster="/posters/wear-film.jpg" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-wear">Dubzz Wear · 03</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.98] text-white">
              Quiet luxury,
              <span className="italic text-wear"> cut sharp.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              Numbered runs. Architectural silhouettes. Gold spent where only
              the owner will find it. When a run closes, it closes.
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
            overline="SS26 — The Obsidian Standard"
            title="The collection."
            className="mb-0 md:mb-0"
          />
          <FadeReveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-neutral">
              Twelve silhouettes made the cut from sixty prototypes. Eight are
              currently live.
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
            { title: "Numbered Runs", body: "Every piece is one of a fixed count. The archive is the only restock." },
            { title: "Atelier Made", body: "Cut and finished in Porto by hands that sign their work." },
            { title: "Gold for One", body: "Each garment hides its gold where only the owner will find it." },
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
