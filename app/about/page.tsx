import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import { divisions } from "@/lib/data/divisions";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Dubzz Group — how one studio's refusal to compromise became a five-venture luxury ecosystem.",
};

const principles = [
  {
    title: "The Single-Regret Test",
    body: "Everything that ships must be something we would regret removing — not something we would survive removing. Applied daily, it deletes the mediocre before it exists.",
  },
  {
    title: "Gold Is a Budget",
    body: "Our accent colour is governed like capital: spent rarely, and only where it buys meaning. The same rule applies to launches, partnerships, and words.",
  },
  {
    title: "Patient Capital",
    body: "The group is structured so that no quarter can force a decision a decade would regret. Slowness is not a weakness of the model; it is the model.",
  },
  {
    title: "Craft Is Governance",
    body: "Quality is not a department. Every venture head signs their work the way an artist signs a canvas — personally, and permanently.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-44 sm:px-10 lg:px-16">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_0%,rgba(212,175,55,0.1)_0%,transparent_60%)]" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold">About Dubzz Group</p>
            <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-white sm:text-7xl">
              We didn&apos;t set out to build an empire. We set out to keep
              <span className="text-gradient-gold"> a promise.</span>
            </h1>
          </FadeReveal>
          <FadeReveal delay={180}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-neutral">
              The promise is simple and unreasonable: never ship anything we
              wouldn&apos;t sign. It now has five houses under one name — and
              no expiry date.
            </p>
          </FadeReveal>
        </div>
      </section>

      {/* Editorial story */}
      <Section className="border-t border-white/5">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <FadeReveal>
                <p className="overline-label text-gold">The Story</p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-white">
                  A studio that refused to stay small in spirit.
                </h2>
              </FadeReveal>
            </div>
          </div>
          <div className="space-y-8 lg:col-span-8">
            <FadeReveal>
              <p className="text-lg leading-relaxed text-white/80">
                Dubzz Media came first, and it is still the discipline
                everything else measures against — visual storytelling,
                strategic branding, and digital content for businesses,
                institutions, and entrepreneurs who wanted work built to a
                standard, not a deadline.
              </p>
            </FadeReveal>
            <FadeReveal delay={80}>
              <p className="leading-relaxed text-neutral">
                Wear followed as a concept before it was ever a collection —
                premium apparel drawn from simplicity, functionality, and
                contemporary African culture. Wines Resort and After Dark were
                developed the same way: vision and identity established
                deliberately, ahead of the first guest and the first night.
              </p>
            </FadeReveal>
            <FadeReveal delay={160}>
              <p className="leading-relaxed text-neutral">
                Trade is the newest of the five — an international commerce
                division built to connect African producers of palm oil,
                cocoa, ginger, and charcoal with the buyers who need reliable
                access to them. Five houses, one holding company, one standard
                applied without exception.
              </p>
            </FadeReveal>
            <FadeReveal delay={240}>
              <p className="leading-relaxed text-neutral">
                Dubzz Group is deliberately early in that story, and we would
                rather say so plainly than borrow proof we haven&apos;t earned.
                The group has a published five-year roadmap — we are only in
                its first year.
              </p>
            </FadeReveal>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="How We Operate"
          title="Four rules, no exceptions."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => (
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

      {/* Houses */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="The Houses"
          title="One group, five signatures."
          lede="Each division is led like an independent house — with the group as its patient shareholder."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {divisions.map((d, i) => (
            <FadeReveal key={d.key} delay={i * 70}>
              <Card className="h-full">
                <a href={d.href} className="flex h-full flex-col p-7">
                  <span className="font-display text-sm" style={{ color: d.accent }}>
                    {d.index}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-white">{d.name}</h3>
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-neutral">
                    {d.description}
                  </p>
                  <span className="overline-label mt-6 text-[9px] text-gold">Visit →</span>
                </a>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/5 text-center">
        <FadeReveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
            The standard has room for a few more hands.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/careers">See Open Roles</Button>
            <Button href="/contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </FadeReveal>
      </Section>
    </>
  );
}
