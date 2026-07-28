import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { growthPillars } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Investor Relations — Dubzz Group",
  description:
    "The Dubzz Group investor relations portal — growth strategy, reporting commitments, and the resource vault for the group's partners.",
};

/**
 * Replaces an invented figures row (14 markets, 38% revenue CAGR, zero
 * external debt) and an invented reports list (an Annual Letter & Accounts
 * dated 2025, a capital note for an estate not yet built). The group is
 * in its foundation year and pre-financial-close, so the honest things to
 * lead with are the operating count that's actually true and the strategy
 * it has published — not metrics or documents it doesn't have yet.
 */
const figures = [{ value: 5, suffix: "", label: "Operating ventures" }];

const reportingCommitments = [
  {
    title: "Annual Letter & Accounts",
    body: "Published once the group closes its first full financial year.",
  },
  {
    title: "Governance & Standards Codex",
    body: "The standards every house is held to — published as governance formalises.",
  },
  {
    title: "Division Updates",
    body: "Direct updates on Media, Wear, Wines Resort, Trade, and After Dark as each reaches operational milestones.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-44 sm:px-10 lg:px-16">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(75%_55%_at_80%_0%,rgba(212,175,55,0.1)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold">Dubzz Group · Investor Relations</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              The portal for patient capital.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              We report the way we operate — plainly, completely, and on a
              cadence built for decades. No adjusted anything.
            </p>
          </FadeReveal>
          <FadeReveal delay={180} className="mt-10 flex flex-wrap gap-4">
            <Button href="/group/investors/vault">Enter the Resource Vault</Button>
            <Button href="/contact" variant="secondary">
              Contact IR
            </Button>
          </FadeReveal>
        </div>
      </section>

      {/* Figures */}
      <Section className="border-t border-white/5">
        <div className="grid gap-12 sm:grid-cols-2">
          {figures.map((f, i) => (
            <FadeReveal key={f.label} delay={i * 90} className="border-l border-gold/25 pl-6">
              <p className="font-display text-5xl text-white sm:text-6xl">
                <AnimatedCounter value={f.value} suffix={f.suffix} />
              </p>
              <p className="mt-3 text-sm text-neutral">{f.label}</p>
            </FadeReveal>
          ))}
          <FadeReveal delay={90} className="border-l border-white/10 pl-6">
            <p className="max-w-sm text-sm leading-relaxed text-neutral">
              The group is in its foundation year. We&apos;d rather state that
              plainly than dress up a young company with metrics it hasn&apos;t
              earned yet — the figure above is the one we can stand behind.
            </p>
          </FadeReveal>
        </div>
      </Section>

      {/* Growth strategy */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Growth Strategy"
          title="Where the group is headed."
          lede="The five pillars of the group's published growth strategy."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {growthPillars.map((p, i) => (
            <FadeReveal key={p.title} delay={i * 80}>
              <Card static className="h-full">
                <div className="p-8">
                  <h3 className="font-display text-xl text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral">{p.body}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Reporting commitments */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Reporting"
          title="What we'll publish, and when."
          lede="No reports exist yet to file here — this is what IR is committed to publishing as the group matures."
        />
        <ul className="divide-y divide-white/8 border-y border-white/8">
          {reportingCommitments.map((r, i) => (
            <FadeReveal key={r.title} delay={i * 60}>
              <li className="flex flex-wrap items-baseline justify-between gap-3 py-6">
                <span className="font-display text-2xl text-white">{r.title}</span>
                <span className="flex items-baseline gap-6">
                  <span className="max-w-xs text-sm text-white/50">{r.body}</span>
                  <span className="shrink-0 rounded-full border border-white/12 px-4 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Not yet published
                  </span>
                </span>
              </li>
            </FadeReveal>
          ))}
        </ul>
      </Section>

      {/* Access */}
      <Section className="border-t border-white/5">
        <div className="grid gap-4 lg:grid-cols-2">
          <FadeReveal>
            <Card static className="h-full">
              <div className="p-10">
                <p className="overline-label text-gold">The Inner Circle</p>
                <h3 className="mt-4 font-display text-3xl text-white">Existing partners</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral">
                  Your profile hub carries allocations, event invitations, and
                  the private side of the vault.
                </p>
                <div className="mt-8">
                  <Button href="/group/profile" variant="secondary" size="sm">
                    Open Your Hub
                  </Button>
                </div>
              </div>
            </Card>
          </FadeReveal>
          <FadeReveal delay={100}>
            <Card static className="h-full">
              <div className="p-10">
                <p className="overline-label text-gold">Introductions</p>
                <h3 className="mt-4 font-display text-3xl text-white">Prospective partners</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral">
                  The group adds partners rarely, by introduction and alignment
                  rather than round. Begin with a letter, not a deck.
                </p>
                <div className="mt-8">
                  <Button href="/contact" variant="secondary" size="sm">
                    Write to the Group
                  </Button>
                </div>
              </div>
            </Card>
          </FadeReveal>
        </div>
      </Section>
    </>
  );
}
