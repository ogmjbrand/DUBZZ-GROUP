import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Dubzz Media — Creative Agency",
  description:
    "Dubzz Media is a creative agency at the intersection of film, brand, and technology — identities and campaigns for names that intend to last.",
};

const services = [
  {
    title: "Brand & Identity",
    body: "Naming, identity systems, motion languages, and brand codices — built from the archive up, made to age well.",
  },
  {
    title: "Film & Campaign",
    body: "Directorial campaigns, launch films, and anthologies — strategy through final grade, in-house.",
  },
  {
    title: "Digital & Experience",
    body: "Real-time 3D, immersive product experiences, and websites that behave like the brand they carry.",
  },
  {
    title: "Strategy",
    body: "Positioning for companies whose next decade matters more than their next quarter.",
  },
];

const clients = [
  "AUREUM", "MERIDIAN", "NIGHTSHADE", "OBSIDIAN", "VELLUM & CO", "KESTREL", "SOLSTICE",
];

const awards = [
  { award: "Site of the Day", body: "Awwwards", year: "2026" },
  { award: "Gold — Craft in Film", body: "International Craft Awards", year: "2026" },
  { award: "Best Immersive Experience", body: "Digital Design Awards", year: "2025" },
  { award: "Brand Identity of the Year", body: "European Design Awards", year: "2025" },
];

export default function MediaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #101116 0%, #0a0a0d 45%, #050505 100%), radial-gradient(70% 60% at 80% 10%, rgba(183,188,199,0.14) 0%, transparent 60%)",
          }}
        />
        <CinematicVideo name="media-film-1080" poster="/posters/media-film.jpg" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-media">Dubzz Media · 02</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.98] text-white">
              Stories engineered to be
              <span className="italic text-media"> unforgettable.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              A creative agency at the intersection of film, brand, and
              technology. We take fewer commissions and finish every one of them.
            </p>
          </FadeReveal>
          <FadeReveal delay={200} className="mt-12 flex flex-wrap gap-4">
            <Button href="/media/booking" size="lg">
              Book a Commission
            </Button>
            <Button href="#work" variant="secondary" size="lg">
              Selected Work
            </Button>
          </FadeReveal>
        </div>
      </section>

      {/* Client marquee */}
      <div aria-hidden className="overflow-hidden border-y border-white/5 py-6">
        <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-16">
              {clients.map((c) => (
                <span key={c} className="font-display text-xl tracking-[0.2em] text-white/20">
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <Section>
        <SectionHeading
          overline="What We Do"
          title="Four disciplines, one signature."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <FadeReveal key={s.title} delay={i * 80}>
              <Card static className="h-full">
                <div className="flex h-full flex-col p-8">
                  <p className="font-display text-lg text-white/25">0{i + 1}</p>
                  <h3 className="mt-4 font-display text-xl text-white">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">{s.body}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Selected work */}
      <Section id="work" className="border-t border-white/5">
        <SectionHeading
          overline="Selected Work"
          title="The portfolio."
          lede="Three commissions that show the range — identity, film, and experience."
        />
        <div className="space-y-6">
          {caseStudies.map((cs, i) => (
            <FadeReveal key={cs.slug} delay={i * 80}>
              <Link href={`/media/case-studies/${cs.slug}`} className="group block">
                <Card>
                  <div className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                    <Visual background={cs.visual} zoomOnHover className="h-72 lg:h-[420px] lg:[direction:ltr]" />
                    <div className="flex flex-col justify-center p-9 sm:p-14 lg:[direction:ltr]">
                      <p className="overline-label text-gold">
                        {cs.discipline} · {cs.year}
                      </p>
                      <h3 className="mt-5 font-display text-3xl leading-tight text-white transition-colors group-hover:text-gold-bright sm:text-4xl">
                        {cs.title}
                      </h3>
                      <p className="mt-5 max-w-md leading-relaxed text-neutral">{cs.summary}</p>
                      <div className="mt-8 flex flex-wrap gap-2">
                        {cs.services.slice(0, 3).map((s) => (
                          <span key={s} className="rounded-full border border-white/10 px-4 py-1.5 font-label text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="overline-label mt-10 text-[10px] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        Read the case study →
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Awards */}
      <Section className="border-t border-white/5">
        <SectionHeading overline="Recognition" title="Awarded, occasionally." lede="We enter little and keep less on the shelf — these are the ones that mattered." />
        <ul className="divide-y divide-white/8 border-y border-white/8">
          {awards.map((a, i) => (
            <FadeReveal key={a.award} delay={i * 60}>
              <li className="flex flex-wrap items-baseline justify-between gap-3 py-6">
                <span className="font-display text-2xl text-white">{a.award}</span>
                <span className="flex items-baseline gap-6">
                  <span className="text-sm text-neutral">{a.body}</span>
                  <span className="font-display text-gold">{a.year}</span>
                </span>
              </li>
            </FadeReveal>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/5 text-center">
        <FadeReveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
            The next commission gets the same obsession as the last.
          </h2>
          <div className="mt-10">
            <Button href="/media/booking" size="lg">
              Start a Commission
            </Button>
          </div>
        </FadeReveal>
      </Section>
    </>
  );
}
