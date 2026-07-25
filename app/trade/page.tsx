import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import CinematicVideo from "@/components/effects/CinematicVideo";
import { commodities, tradeCorridors, tradeStats } from "@/lib/data/trade";

export const metadata: Metadata = {
  title: "Dubzz Trade — Global Commerce & Logistics",
  description:
    "Global sourcing, export, and logistics — premium commodities moved between markets with executive precision and total traceability.",
};

const assurances = [
  { title: "Full Custody Chain", body: "Farm-gate to destination, every shipment queryable mid-voyage by both sides of the contract." },
  { title: "In-House QC", body: "Our own labs at origin — grading, moisture, purity — before anything reaches a port." },
  { title: "Forward Positions", body: "Contracted supply against forward positions so your production line never waits on a harvest." },
];

export default function TradePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden">
        {/* The film opens on this same gradient, so it is also the poster-less
            first paint and the reduced-motion floor. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(155deg, #0b1017 0%, #070a0f 45%, #050505 100%), radial-gradient(75% 55% at 80% 10%, rgba(74,109,140,0.25) 0%, transparent 60%)",
          }}
        />
        <CinematicVideo name="trade-film" poster="/posters/trade-film.jpg" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-trade">Dubzz Trade · 05</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.98] text-white">
              Commerce that moves
              <span className="italic text-trade"> continents.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              Premium commodities, sourced at origin and delivered on spec —
              with a custody chain both sides of the contract can watch.
            </p>
          </FadeReveal>
          <FadeReveal delay={200} className="mt-12 flex flex-wrap gap-4">
            <Button href="/trade/inquiry" size="lg">
              Open an Inquiry
            </Button>
            <Button href="/trade/dashboard" variant="secondary" size="lg">
              Commerce Dashboard
            </Button>
          </FadeReveal>
        </div>
      </section>

      {/* Stats */}
      <Section>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {tradeStats.map((s, i) => (
            <FadeReveal key={s.label} delay={i * 90} className="border-l border-trade/40 pl-6">
              <p className="font-display text-5xl text-white sm:text-6xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
              </p>
              <p className="mt-3 max-w-[190px] text-sm text-neutral">{s.label}</p>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Commodities */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="The Book"
          title="Commodity showcase."
          lede="Six lines we know down to the farm gate. Grades and specifications on request."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {commodities.map((c, i) => (
            <FadeReveal key={c.id} delay={(i % 3) * 80}>
              <Card className="h-full" innerClassName="flex flex-col">
                <Visual background={c.visual} className="h-36">
                  <span className="absolute bottom-4 left-5 font-display text-3xl text-white">
                    {c.name}
                  </span>
                </Visual>
                <div className="flex flex-1 flex-col p-6">
                  <p className="overline-label text-[9px] text-trade">{c.origin}</p>
                  <p className="mt-2 text-xs text-gold">{c.grade}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">{c.description}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Corridors — the global map, drawn as routes */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Global Reach"
          title="Active corridors."
          lede="Origin to destination, with typical transit under our custody chain."
        />
        <div className="overflow-hidden rounded-lg border border-white/8">
          {tradeCorridors.map((c, i) => (
            <FadeReveal key={`${c.from}-${c.to}`} delay={i * 60}>
              <div className="group grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-white/5 px-6 py-6 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:px-10">
                <div className="text-right">
                  <p className="font-display text-xl text-white sm:text-2xl">{c.from}</p>
                </div>
                <div className="flex w-24 flex-col items-center gap-1.5 sm:w-40">
                  <span className="font-label text-[8px] font-semibold uppercase tracking-[0.2em] text-trade">
                    {c.cargo}
                  </span>
                  <span className="relative h-px w-full overflow-hidden bg-white/15">
                    <span
                      aria-hidden
                      className="animate-shimmer absolute inset-0 bg-[linear-gradient(90deg,transparent,#4a6d8c,transparent)] bg-[length:200%_100%]"
                    />
                  </span>
                  <span className="font-label text-[8px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    {c.transit}
                  </span>
                </div>
                <div>
                  <p className="font-display text-xl text-white sm:text-2xl">{c.to}</p>
                </div>
              </div>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Trust */}
      <Section className="border-t border-white/5">
        <SectionHeading overline="Why Dubzz Trade" title="Certainty is the product." />
        <div className="grid gap-4 lg:grid-cols-3">
          {assurances.map((a, i) => (
            <FadeReveal key={a.title} delay={i * 90}>
              <Card static className="h-full">
                <div className="p-9">
                  <h3 className="font-display text-2xl text-white">{a.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-neutral">{a.body}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/5 text-center">
        <FadeReveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
            Tell us the spec. We&apos;ll tell you the date.
          </h2>
          <div className="mt-10">
            <Button href="/trade/inquiry" size="lg">
              Open a Trade Inquiry
            </Button>
          </div>
        </FadeReveal>
      </Section>
    </>
  );
}
