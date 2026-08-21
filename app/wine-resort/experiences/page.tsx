import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import StatusNote from "@/components/ui/StatusNote";
import { experiences } from "@/lib/data/resort";

export const metadata: Metadata = {
  title: "Experiences — Dubzz Wines Resort",
  description:
    "The experience programme planned for Dubzz Wines Resort — wine culture, leisure, wellness, and signature days.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-44 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-wine">Wines Resort · Experiences</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              The experiences, by design.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              The experience programme planned for the destination — built
              around wine culture, leisure, wellness, and the kind of days
              people travel for.
            </p>
          </FadeReveal>
          <FadeReveal delay={140} className="mt-10 max-w-2xl">
            <StatusNote label="In Development">
              Dubzz Wines Resort is a destination in development. What follows
              is the design vision for it, not a bookable programme.
            </StatusNote>
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
                        ${e.price} <span className="text-[10px] text-white/55">per person</span>
                      </p>
                    </div>
                    <p className="mt-4 max-w-xl leading-relaxed text-neutral">{e.description}</p>
                    <p className="mt-5 text-xs text-white/55">{e.duration}</p>
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
