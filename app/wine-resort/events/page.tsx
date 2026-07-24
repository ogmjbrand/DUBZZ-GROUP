import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import { resortEvents } from "@/lib/data/resort";

export const metadata: Metadata = {
  title: "Events — Dubzz Wine Resort",
  description:
    "Vintage releases, harvest weekends, and single-table dinners — the estate's calendar of nights worth crossing borders for.",
};

export default function EventsPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-44 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-wine">Wine Resort · Events</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              The calendar keeps its promises.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              A handful of nights each year, none of them repeated. Seats are
              deliberately few; the room matters as much as the pour.
            </p>
          </FadeReveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {resortEvents.map((ev, i) => {
            const date = new Date(ev.date);
            return (
              <FadeReveal key={ev.name} delay={i * 100}>
                <Card className="h-full" innerClassName="flex flex-col">
                  <div className="flex flex-1 flex-col p-9">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-5xl text-gold">
                          {date.toLocaleDateString("en-GB", { day: "2-digit" })}
                        </p>
                        <p className="overline-label mt-1 text-[10px] text-white/45">
                          {date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <span className="rounded-full border border-wine/40 bg-wine/10 px-4 py-1.5 font-label text-[9px] font-semibold uppercase tracking-[0.18em] text-wine">
                        {ev.status}
                      </span>
                    </div>
                    <h2 className="mt-7 font-display text-2xl text-white">{ev.name}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">{ev.description}</p>
                    <div className="mt-8">
                      <Button href="/contact" variant="secondary" size="sm">
                        Request a Seat
                      </Button>
                    </div>
                  </div>
                </Card>
              </FadeReveal>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-white/5 text-center">
        <SectionHeading
          overline="Stay the Night"
          title="Events pair best with a sanctuary."
          align="center"
          lede="Guests staying on the estate hold priority for every event seat."
        />
        <FadeReveal>
          <Button href="/wine-resort/booking/sanctuary" size="lg">
            Book Your Stay
          </Button>
        </FadeReveal>
      </Section>
    </>
  );
}
