import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";

export const metadata: Metadata = {
  title: "Dubzz Media — The Creative Engine",
  description:
    "Dubzz Media is the Group's flagship creative business — commercial video production, editing, motion graphics, brand identity, social content strategy, event coverage, and creative campaigns.",
  alternates: { canonical: "/media" },
};

/**
 * The seven services the corporate profile lists for Dubzz Media.
 *
 * Replaces a four-discipline agency menu — "brand codices", "real-time 3D",
 * "immersive product experiences" — that described a different company.
 */
const services = [
  {
    title: "Commercial Video Production",
    body: "Brand films, adverts, and commercial shoots taken from concept and direction through to the finished cut.",
  },
  {
    title: "Professional Video Editing",
    body: "Post-production for brands and creators — assembly, colour, sound, and delivery across every format a campaign needs.",
  },
  {
    title: "Motion Graphics & Animation",
    body: "Animated identity, titles, explainers, and graphics that give a brand a way of moving as well as a way of looking.",
  },
  {
    title: "Brand Identity Development",
    body: "Identity systems built to hold up across every surface a business appears on, and to still work several years in.",
  },
  {
    title: "Social Media Content Strategy",
    body: "Content built for how each platform is actually used, planned as a programme rather than a series of posts.",
  },
  {
    title: "Event Coverage",
    body: "Full coverage of launches, conferences, and cultural events — the film, the stills, and the edit that follows.",
  },
  {
    title: "Creative Campaign Development",
    body: "Campaign ideas developed end to end, from the strategic idea through production to the assets that carry it.",
  },
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
              "linear-gradient(160deg, #141414 0%, #0a0a0a 45%, #000000 100%), radial-gradient(70% 60% at 80% 10%, rgba(255,255,255,0.13) 0%, transparent 60%)",
          }}
        />
        <CinematicVideo name="media-film" poster="/posters/media-film.jpg" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-media">Dubzz Media · 01</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,7.4vw,6rem)] leading-[1.03] text-white">
              The creative engine
              <span className="italic text-media"> of the Group.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              The Group&apos;s flagship creative business — visual storytelling,
              strategic branding, and digital content for businesses,
              institutions, and entrepreneurs.
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

      {/* Services */}
      <Section>
        <SectionHeading
          overline="What We Do"
          title="Seven services, one standard."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <FadeReveal key={s.title} delay={i * 80}>
              <Card static className="h-full">
                <div className="flex h-full flex-col p-8">
                  <p className="font-display text-lg text-white/50">0{i + 1}</p>
                  <h3 className="mt-4 font-display text-xl text-white">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">{s.body}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Vision & Future — replaces a "Selected Work" grid of three invented
          case studies. Dubzz Media has delivered real client work, but the
          profile names none of it, so nothing here can be attributed yet. */}
      <Section id="work" className="border-t border-white/5">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <FadeReveal>
            <p className="overline-label text-media">Our Vision</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.08] text-white sm:text-5xl">
              The creative engine of the Group.
            </h2>
          </FadeReveal>
          <FadeReveal delay={120} className="space-y-6 text-lg leading-relaxed text-neutral">
            <p>
              Dubzz Media is the flagship creative company within Dubzz Group,
              and the foundation the Group was built on. It exists to help
              businesses, organisations, entrepreneurs, and institutions
              communicate their ideas — through visual storytelling, strategic
              branding, and digital content.
            </p>
            <p>
              The ambition is to become one of Africa&apos;s leading creative
              agencies, recognised for exceptional visual content, influential
              brands, and shaping the future of digital storytelling.
            </p>
            <p className="text-white">
              We continue expanding through technology, innovation, strategic
              partnerships, and talent development — serving clients across
              Africa and international markets.
            </p>
          </FadeReveal>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/5 text-center">
        <FadeReveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
            Tell us what you are building.
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
