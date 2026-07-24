import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import GoldShaderBackground from "@/components/effects/GoldShaderBackground";
import { divisions } from "@/lib/data/divisions";

export const metadata: Metadata = {
  title: "Our Story & Vision — Dubzz Group",
  description:
    "The corporate house of the Dubzz ecosystem — how the group is structured, governed, and pointed at the next decade.",
};

const pillars = [
  {
    title: "One Balance Sheet, Five Signatures",
    body: "The group holds the capital; the houses hold the craft. Each venture head runs their house like an owner because, in equity terms, they are one.",
  },
  {
    title: "The Standard Is Central",
    body: "Quality is the only function that reports to the centre. Everything else — product, pricing, hiring — belongs to the house.",
  },
  {
    title: "Compounding Over Harvesting",
    body: "Profits recycle into the houses before anything leaves the group. The estate's second phase was paid for by the atelier's third run.",
  },
];

export default function GroupStoryPage() {
  return (
    <>
      {/* Hero with shader */}
      <section className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden">
        <GoldShaderBackground />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-gold">Dubzz Group · 01</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.98] text-white">
              The house above
              <span className="text-gradient-gold"> the houses.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              Strategy, capital, and governance for five ventures — structured
              so that no quarter can force a decision a decade would regret.
            </p>
          </FadeReveal>
        </div>
      </section>

      {/* Founder letter */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <FadeReveal>
            <p className="overline-label text-gold">From the Founder&apos;s Desk</p>
            <blockquote className="mt-8 font-display text-2xl leading-relaxed text-white/85 sm:text-3xl">
              &ldquo;We are often asked when we will raise, exit, or franchise.
              The honest answer is that the group is structured to make those
              questions optional forever. Patient capital is not a constraint we
              tolerate — it is the moat.&rdquo;
            </blockquote>
            <p className="mt-8 font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              — D. · A Letter on the Next Decade, 2026
            </p>
            <div className="mt-8">
              <Button href="/blog/investor-letter-2026" variant="secondary" size="sm">
                Read the Full Letter
              </Button>
            </div>
          </FadeReveal>
        </div>
      </Section>

      {/* Governance pillars */}
      <Section className="border-t border-white/5">
        <SectionHeading overline="How the Group Works" title="Structure is strategy." />
        <div className="grid gap-4 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <FadeReveal key={p.title} delay={i * 90}>
              <Card static className="h-full">
                <div className="p-9">
                  <p className="font-display text-lg text-white/25">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl text-white">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-neutral">{p.body}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* The houses */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="The Portfolio"
          title="Five houses under one roof."
        />
        <div className="border-t border-white/10">
          {divisions.map((d, i) => (
            <FadeReveal key={d.key} delay={i * 60}>
              <a
                href={d.href}
                className="group flex flex-col gap-2 border-b border-white/10 py-8 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-baseline sm:gap-10"
              >
                <span className="font-display text-base text-white/30 transition-colors group-hover:text-gold sm:w-14">
                  {d.index}
                </span>
                <span className="font-display text-2xl text-white sm:w-72 sm:text-3xl">{d.name}</span>
                <span className="flex-1 text-sm text-neutral">{d.tagline}</span>
                <span className="overline-label hidden text-[9px] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                  Visit →
                </span>
              </a>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/5 text-center">
        <FadeReveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
            For partners who measure in decades.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/group/investors">Investor Relations</Button>
            <Button href="/contact" variant="secondary">
              Contact the Group
            </Button>
          </div>
        </FadeReveal>
      </Section>
    </>
  );
}
