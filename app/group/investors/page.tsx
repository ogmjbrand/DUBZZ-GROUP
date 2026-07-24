import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

export const metadata: Metadata = {
  title: "Investor Relations — Dubzz Group",
  description:
    "The Dubzz Group investor relations portal — figures, reports, and the resource vault for the group's partners.",
};

const figures = [
  { value: 5, suffix: "", label: "Operating ventures" },
  { value: 14, suffix: "", label: "Markets" },
  { value: 38, suffix: "%", label: "Revenue CAGR, 3-year" },
  { value: 0, suffix: "", label: "External debt" },
];

const reports = [
  { title: "Annual Letter & Accounts 2025", type: "Report", date: "Feb 2026" },
  { title: "H1 2026 Group Performance", type: "Update", date: "Jul 2026" },
  { title: "Estate Phase II — Capital Note", type: "Note", date: "May 2026" },
  { title: "Governance & Standards Codex", type: "Governance", date: "Jan 2026" },
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
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((f, i) => (
            <FadeReveal key={f.label} delay={i * 90} className="border-l border-gold/25 pl-6">
              <p className="font-display text-5xl text-white sm:text-6xl">
                <AnimatedCounter value={f.value} suffix={f.suffix} />
              </p>
              <p className="mt-3 text-sm text-neutral">{f.label}</p>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Reports */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Recent Publications"
          title="Reports & letters."
          lede="The most recent releases — the full archive lives in the vault."
        />
        <ul className="divide-y divide-white/8 border-y border-white/8">
          {reports.map((r, i) => (
            <FadeReveal key={r.title} delay={i * 60}>
              <li>
                <Link
                  href="/group/investors/vault"
                  className="group flex flex-wrap items-baseline justify-between gap-3 py-6 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="font-display text-2xl text-white transition-colors group-hover:text-gold-bright">
                    {r.title}
                  </span>
                  <span className="flex items-baseline gap-6">
                    <span className="rounded-full border border-white/12 px-4 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      {r.type}
                    </span>
                    <span className="text-sm text-white/40">{r.date}</span>
                  </span>
                </Link>
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
