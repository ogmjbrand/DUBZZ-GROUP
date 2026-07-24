import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import { diningVenues } from "@/lib/data/resort";

export const metadata: Metadata = {
  title: "Dining — Dubzz Wine Resort",
  description:
    "Meridian fine dining, vineyard long-tables, and the quietest wine bar on the estate.",
};

export default function DiningPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-44 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-wine">Wine Resort · Dining</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              Three rooms, one kitchen garden.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              The menu is written each morning from what the garden, the valley,
              and the cellar offer that day. Nothing travels far; everything
              arrives finished.
            </p>
          </FadeReveal>
        </div>
      </section>

      <Section>
        <div className="space-y-6">
          {diningVenues.map((v, i) => (
            <FadeReveal key={v.name} delay={i * 80}>
              <Card>
                <div className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                  <Visual background={v.visual} className="h-64 lg:h-[380px] lg:[direction:ltr]" />
                  <div className="flex flex-col justify-center p-9 sm:p-14 lg:[direction:ltr]">
                    <p className="overline-label text-wine">{v.type}</p>
                    <h2 className="mt-4 font-display text-4xl text-white">{v.name}</h2>
                    <p className="mt-5 max-w-md leading-relaxed text-neutral">{v.description}</p>
                    <p className="mt-6 text-xs text-white/40">{v.detail}</p>
                    <div className="mt-8">
                      <Button href="/contact" variant="secondary" size="sm">
                        Reserve a Table
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
          overline="The Cellar Rule"
          title="Ask for the east slope barrel."
          align="center"
          lede="If it's your year, it will be poured. Some things should be earned in person."
        />
        <FadeReveal>
          <Button href="/wine-resort/booking/sanctuary" size="lg">
            Stay on the Estate
          </Button>
        </FadeReveal>
      </Section>
    </>
  );
}
