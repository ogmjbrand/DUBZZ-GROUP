import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import { experiences } from "@/lib/data/resort";

export const metadata: Metadata = {
  title: "Experiences — Dubzz Wines Resort",
  description:
    "Barrel tastings, harvest immersions, spa rituals, and cellar dinners — the estate, up close.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-44 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-wine">Wines Resort · Experiences</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              The estate, up close.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              Nothing here is staged for visitors — you join the estate as it
              actually runs. Numbers are small and seasons are honest.
            </p>
          </FadeReveal>
        </div>
      </section>

      <Section>
        <div className="space-y-6">
          {experiences.map((e, i) => (
            <FadeReveal key={e.slug} delay={i * 80}>
              <Card>
                <div className={`grid md:grid-cols-5 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <Visual background={e.visual} className="h-52 md:col-span-2 md:h-auto md:[direction:ltr]" />
                  <div className="flex flex-col justify-center p-8 sm:p-12 md:col-span-3 md:[direction:ltr]">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="font-display text-3xl text-white">{e.name}</h2>
                      <p className="font-label text-sm font-semibold text-gold">
                        ${e.price} <span className="text-[10px] text-white/40">per person</span>
                      </p>
                    </div>
                    <p className="mt-4 max-w-xl leading-relaxed text-neutral">{e.description}</p>
                    <p className="mt-5 text-xs text-white/40">{e.duration}</p>
                    <div className="mt-7">
                      <Button href="/wine-resort/booking/experience" variant="secondary" size="sm">
                        Add to a Stay
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5 text-center">
        <SectionHeading
          overline="Plan the Stay"
          title="Experiences attach to a booking."
          lede="Choose a sanctuary first — experiences are tailored to your dates during booking."
          align="center"
        />
        <FadeReveal>
          <Button href="/wine-resort/booking/sanctuary" size="lg">
            Select Your Sanctuary
          </Button>
        </FadeReveal>
      </Section>
    </>
  );
}
