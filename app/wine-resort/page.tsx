import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";
import { sanctuaries, experiences, resortEvents, diningVenues } from "@/lib/data/resort";

export const metadata: Metadata = {
  title: "Dubzz Wines Resort — Luxury Hospitality",
  description:
    "An estate of vineyards, sanctuaries, and fine dining — hospitality composed like cinema, poured like a rare vintage.",
};

export default function WineResortPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
        {/* The film opens on this same gradient, so it is also the poster-less
            first paint and the reduced-motion floor. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #141414 0%, #0a0a0a 45%, #000000 100%), radial-gradient(80% 60% at 70% 10%, rgba(212,175,55,0.22) 0%, transparent 60%)",
          }}
        />
        <CinematicVideo name="resort-film" poster="/posters/resort-film.jpg" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-wine">Dubzz Wines Resort · 04</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.98] text-white">
              Where the vine meets
              <span className="italic text-wine"> the horizon.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              A working estate of vineyards, stone sanctuaries, and a cellar
              that rewards patience. Come for a night; leave with a tradition.
            </p>
          </FadeReveal>
          <FadeReveal delay={200} className="mt-12 flex flex-wrap gap-4">
            <Button href="/wine-resort/booking/sanctuary" size="lg">
              Book Your Stay
            </Button>
            <Button href="/wine-resort/experiences" variant="secondary" size="lg">
              The Experiences
            </Button>
          </FadeReveal>
        </div>
      </section>

      {/* Sanctuaries */}
      <Section>
        <SectionHeading
          overline="The Sanctuaries"
          title="Three ways to sleep inside a vineyard."
          lede="Each residence is built from estate stone and set where the view earns its keep."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {sanctuaries.map((s, i) => (
            <FadeReveal key={s.slug} delay={i * 100}>
              <Link href="/wine-resort/booking/sanctuary" className="group block h-full">
                <Card className="h-full" innerClassName="flex flex-col">
                  <Visual background={s.visual} zoomOnHover className="h-60" />
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl text-white">{s.name}</h3>
                      <p className="shrink-0 font-label text-sm font-semibold text-gold">
                        ${s.rate}
                        <span className="text-[10px] text-white/40"> /night</span>
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-neutral">{s.tagline}</p>
                    <p className="mt-4 text-xs text-white/40">
                      {s.size} · {s.occupancy}
                    </p>
                    <p className="overline-label mt-auto pt-6 text-[9px] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Check availability →
                    </p>
                  </div>
                </Card>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Experiences preview */}
      <Section className="border-t border-white/5">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <SectionHeading overline="Experiences" title="The estate, up close." className="mb-0 md:mb-0" />
          <FadeReveal delay={120}>
            <Button href="/wine-resort/experiences" variant="secondary">
              All Experiences
            </Button>
          </FadeReveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e, i) => (
            <FadeReveal key={e.slug} delay={i * 80}>
              <Card className="h-full" innerClassName="flex flex-col">
                <Visual background={e.visual} className="h-32" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg text-white">{e.name}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral">{e.description}</p>
                  <p className="mt-4 text-xs text-gold">
                    {e.duration} · ${e.price} pp
                  </p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Dining */}
      <Section className="border-t border-white/5">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <SectionHeading overline="Dining" title="Three rooms, one kitchen garden." className="mb-0 md:mb-0" />
          <FadeReveal delay={120}>
            <Button href="/wine-resort/dining" variant="secondary">
              Explore Dining
            </Button>
          </FadeReveal>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {diningVenues.map((v, i) => (
            <FadeReveal key={v.name} delay={i * 100}>
              <Link href="/wine-resort/dining" className="group block h-full">
                <Card className="h-full" innerClassName="flex flex-col">
                  <Visual background={v.visual} zoomOnHover className="h-44">
                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-background/50 px-4 py-1.5 font-label text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
                      {v.type}
                    </span>
                  </Visual>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl text-white transition-colors group-hover:text-gold-bright">{v.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">{v.description}</p>
                    <p className="mt-5 text-xs text-white/40">{v.detail}</p>
                  </div>
                </Card>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Events strip */}
      <Section className="border-t border-white/5">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <SectionHeading overline="On the Calendar" title="Nights worth crossing borders for." className="mb-0 md:mb-0" />
          <FadeReveal delay={120}>
            <Button href="/wine-resort/events" variant="secondary">
              All Events
            </Button>
          </FadeReveal>
        </div>
        <ul className="divide-y divide-white/8 border-y border-white/8">
          {resortEvents.map((ev, i) => (
            <FadeReveal key={ev.name} delay={i * 70}>
              <li className="flex flex-wrap items-baseline justify-between gap-3 py-6">
                <div>
                  <p className="font-display text-2xl text-white">{ev.name}</p>
                  <p className="mt-1 max-w-xl text-sm text-neutral">{ev.description}</p>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-sm text-white/50">
                    {new Date(ev.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="rounded-full border border-wine/40 bg-wine/10 px-4 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.18em] text-wine">
                    {ev.status}
                  </span>
                </div>
              </li>
            </FadeReveal>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_100%_at_50%_120%,rgba(212,175,55,0.16)_0%,transparent_60%)]" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
          <FadeReveal>
            <h2 className="font-display text-4xl leading-tight text-white sm:text-6xl">
              The east slope is waiting.
            </h2>
            <div className="mt-10">
              <Button href="/wine-resort/booking/sanctuary" size="lg">
                Begin Your Booking
              </Button>
            </div>
          </FadeReveal>
        </div>
      </section>
    </>
  );
}
