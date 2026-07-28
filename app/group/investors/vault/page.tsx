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

/**
 * Replaces a list of documents that didn't exist: a 2025 Annual Letter &
 * Accounts, a capital note for an estate phase not yet built, a founding
 * archive dated 2016. The group is pre-financial-close, so the honest vault
 * is one that says what it will hold and when — not one padded with PDFs
 * that were never written.
 */
const collections = [
  {
    name: "Available Now",
    open: true,
    items: [
      { title: "Key Milestones & Growth Strategy", meta: "On this site" },
      { title: "Group Structure & Governance Principles", meta: "On this site" },
    ],
  },
  {
    name: "Coming As The Group Matures",
    open: false,
    items: [
      { title: "Annual Letter & Accounts", meta: "Not yet published" },
      { title: "Governance & Standards Codex", meta: "Not yet published" },
      { title: "Division Deep-Dives", meta: "Not yet published" },
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
              What&apos;s available today, and what IR is committed to
              publishing as the group closes its first full financial year.
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
                      {col.open ? "Available" : "Pending"}
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
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0 text-gold/70">
                              <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.2" />
                              <path d="M8 4.6V8l2.6 1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
                      Publishes here as each is finalised — no sign-in required.
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
