import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";
import { commodities, tradeFocusAreas, operatingPrinciples } from "@/lib/data/trade";

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
            <Button href="#focus" variant="secondary" size="lg">
              What We Do
            </Button>
          </FadeReveal>
        </div>
      </section>

      {/* Focus areas — replaces a counter row of invented metrics ("42 active
          corridors", "99.2% on-spec delivery"). The desk is pre-operational;
          what it can state truthfully is scope, not throughput. */}
      <Section id="focus">
        <SectionHeading
          overline="Core Focus Areas"
          title="What the desk does."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tradeFocusAreas.map((f, i) => (
            <FadeReveal key={f.title} delay={(i % 3) * 80}>
              <Card static className="h-full">
                <div className="flex h-full flex-col p-8">
                  <p className="font-display text-lg text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl text-white">{f.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">{f.body}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Commodities */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="The Book"
          title="Commodity showcase."
          lede="The current product portfolio. Grades and specifications on request."
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

      {/* Operating principles — replaces an "Active corridors" board of
          invented origin/destination lanes and transit times. */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Operating Principles"
          title="What every trade is built on."
          lede="The standards a counterparty can hold us to, stated before the first cargo moves."
        />
        <ul className="divide-y divide-white/8 border-y border-white/8">
          {operatingPrinciples.map((o, i) => (
            <FadeReveal key={o.title} delay={i * 60}>
              <li className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-10">
                <span className="font-display text-2xl text-white sm:w-72 sm:shrink-0">
                  {o.title}
                </span>
                <span className="text-sm leading-relaxed text-neutral">{o.body}</span>
              </li>
            </FadeReveal>
          ))}
        </ul>
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
