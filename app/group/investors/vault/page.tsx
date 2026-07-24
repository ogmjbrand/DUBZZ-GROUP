import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";

export const metadata: Metadata = {
  title: "Resource Vault — Investor Relations",
  description:
    "The expanded resource vault — reports, governance documents, and division deep-dives for Dubzz Group partners.",
};

const collections = [
  {
    name: "Group Reporting",
    open: true,
    items: [
      { title: "Annual Letter & Accounts 2025", meta: "PDF · 42 pages" },
      { title: "H1 2026 Group Performance", meta: "PDF · 18 pages" },
      { title: "Five-Year Standard Review", meta: "PDF · 24 pages" },
    ],
  },
  {
    name: "Governance",
    open: true,
    items: [
      { title: "Governance & Standards Codex", meta: "PDF · 200 pages" },
      { title: "The Single-Regret Test — Policy", meta: "PDF · 6 pages" },
    ],
  },
  {
    name: "Division Deep-Dives",
    open: false,
    items: [
      { title: "Estate Phase II — Capital Note", meta: "Partners only" },
      { title: "Atelier In-House Production Plan", meta: "Partners only" },
      { title: "Trade Corridor Economics 2026", meta: "Partners only" },
    ],
  },
  {
    name: "The Archive",
    open: false,
    items: [
      { title: "Founding Documents, 2016", meta: "Partners only" },
      { title: "Letters I–IX, Complete", meta: "Partners only" },
    ],
  },
];

export default function VaultPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-44 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold">Investor Relations · Vault</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              The resource vault.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              Public documents open to everyone; partner materials unlock with
              Inner Circle access once sign-in ships.
            </p>
          </FadeReveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {collections.map((col, i) => (
            <FadeReveal key={col.name} delay={i * 80}>
              <Card static className="h-full">
                <div className="flex h-full flex-col p-9">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl text-white">{col.name}</h2>
                    <span
                      className={[
                        "rounded-full border px-4 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.18em]",
                        col.open
                          ? "border-success/40 bg-success/10 text-success"
                          : "border-gold/40 bg-gold/10 text-gold",
                      ].join(" ")}
                    >
                      {col.open ? "Open" : "Partners"}
                    </span>
                  </div>
                  <ul className="mt-6 flex-1 divide-y divide-white/6">
                    {col.items.map((item) => (
                      <li key={item.title} className="flex items-center justify-between gap-4 py-4">
                        <div className="flex items-center gap-4">
                          {col.open ? (
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden className="shrink-0 text-white/40">
                              <path d="M1 1h9l5 5v11H1V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                              <path d="M10 1v5h5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden className="shrink-0 text-gold/70">
                              <rect x="1" y="8" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                              <path d="M4 8V5.5a3.5 3.5 0 017 0V8" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                          )}
                          <span className="text-sm text-white">{item.title}</span>
                        </div>
                        <span className="shrink-0 text-xs text-white/35">{item.meta}</span>
                      </li>
                    ))}
                  </ul>
                  {!col.open ? (
                    <p className="mt-5 text-xs leading-relaxed text-white/30">
                      Unlocks with Inner Circle sign-in — request access via IR.
                    </p>
                  ) : null}
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>

        <FadeReveal className="mt-16 text-center">
          <SectionHeading
            overline="Access"
            title="Missing a document?"
            lede="IR responds within one business day — and if a document should exist and doesn't, we'll write it."
            align="center"
          />
          <Button href="/contact">Contact Investor Relations</Button>
        </FadeReveal>
      </Section>
    </>
  );
}
