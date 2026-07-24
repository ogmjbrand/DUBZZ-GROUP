import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CareersBoard from "@/components/forms/CareersBoard";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Dubzz Group — open roles across media, fashion, hospitality, and global trade for people who sign their work.",
};

const perks = [
  { title: "Sign Your Work", body: "Every role owns something end-to-end. Your name goes on it — literally." },
  { title: "Cross-House Mobility", body: "Five ventures, one payroll. The atelier to the estate is an internal transfer, not a career change." },
  { title: "The Long Game", body: "Patient capital means no growth-at-all-costs quarters. We hire for decades." },
  { title: "The Standard", body: "You'll never be asked to ship something mediocre faster. That's the whole deal." },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-44 sm:px-10 lg:px-16">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_0%,rgba(212,175,55,0.09)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold">Careers</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              Work somewhere that <span className="text-gradient-gold">keeps its word.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              We hire rarely and deliberately — people who would rather do one
              thing at the highest standard than ten things at any other.
            </p>
          </FadeReveal>
        </div>
      </section>

      <Section className="border-t border-white/5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <FadeReveal key={p.title} delay={i * 80}>
              <div className="h-full rounded-lg border border-white/8 p-7">
                <h3 className="font-display text-xl text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral">{p.body}</p>
              </div>
            </FadeReveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Open Roles"
          title="The current openings."
          lede="Don't see your role? Exceptional people make their own openings — write to careers@dubzzgroup.com."
        />
        <FadeReveal>
          <CareersBoard />
        </FadeReveal>
      </Section>
    </>
  );
}
