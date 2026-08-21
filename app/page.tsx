import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";
import EcosystemCanvas from "@/components/effects/EcosystemCanvas";
import EcosystemDiagram from "@/components/group/EcosystemDiagram";
import RoadmapTimeline from "@/components/group/RoadmapTimeline";
import { divisions } from "@/lib/data/divisions";
import { posts } from "@/lib/data/posts";
import { contact, founder, growthPillars, site } from "@/lib/data/site";
import {
  advantages,
  founderNarrative,
  mission,
  partnershipAudiences,
  philosophy,
  purpose,
  vision,
} from "@/lib/data/group";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      {/* ——— HERO ———
          The opening states the Group's own philosophy rather than a
          decorative claim. Anyone landing here should know what Dubzz Group
          is, where it is, and what it operates before scrolling once. */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
        {/* Decorative: the headline below carries everything the footage says. */}
        <CinematicVideo name="hero-film" poster="/posters/hero-film.jpg" />
        <EcosystemCanvas />
        {/* Two scrims rather than one flat veil: a lateral wash that protects
            the type on the left, and a base fade that carries the composition
            into the division strip. A single 70% overlay was hiding the film
            it was supposed to be sitting on. */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.25)_75%,rgba(0,0,0,0.15)_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
        <div aria-hidden className="grain absolute inset-0" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-36 sm:px-10 sm:pb-24 sm:pt-40 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-gold">
              Dubzz Group · {contact.city}, {contact.country}
            </p>
          </FadeReveal>
          <FadeReveal delay={120}>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.5rem,7.4vw,6rem)] leading-[1.03] tracking-tight text-white sm:mt-8">
              {philosophy.words[0]}
              <br />
              {philosophy.words[1]}
              <br />
              <span className="text-gradient-gold">{philosophy.words[2]}</span>
            </h1>
          </FadeReveal>
          <FadeReveal delay={240}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-neutral sm:mt-8 sm:text-lg">
              A diversified holding company operating across media, fashion,
              hospitality, entertainment, and international trade — built as
              one ecosystem rather than five separate ventures.
            </p>
          </FadeReveal>
          <FadeReveal delay={360} className="mt-9 flex flex-wrap gap-4 sm:mt-11">
            <Button href="#ecosystem" size="lg">
              Explore the Ecosystem
            </Button>
            <Button href="#partnerships" variant="secondary" size="lg">
              Build With Dubzz
            </Button>
          </FadeReveal>
        </div>

        {/* Division index strip */}
        <div className="relative border-t border-white/10 bg-background/40 backdrop-blur-sm">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 sm:grid-cols-5">
            {divisions.map((d) => (
              <Link
                key={d.key}
                href={d.href}
                className="group flex items-baseline gap-3 border-r border-white/5 px-6 py-5 transition-colors duration-300 last:border-r-0 hover:bg-white/[0.03] sm:px-8"
              >
                <span className="font-display text-xs text-white/50 transition-colors group-hover:text-gold">
                  {d.index}
                </span>
                <span className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-white">
                  {d.short}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ——— MARQUEE DIVIDER ——— */}
      <div aria-hidden className="overflow-hidden border-b border-white/5 py-5">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-12">
              {divisions.map((d) => (
                <span key={d.key} className="flex items-center gap-12">
                  <span className="font-label text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">
                    {d.name}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gold/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ——— THE GROUP ——— */}
      <Section id="group">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                overline="The Group"
                title="A holding company, built as an institution."
                className="mb-0 md:mb-0"
              />
              <FadeReveal delay={150} className="mt-10">
                <Button href="/about" variant="secondary">
                  Read the Corporate Story
                </Button>
              </FadeReveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FadeReveal>
              <p className="text-xl leading-relaxed text-white/85 sm:text-2xl">
                Dubzz Group is a diversified creative, lifestyle, and business
                holding company headquartered in {contact.city},
                {" "}{contact.region}. It owns and develops five businesses
                across media, fashion, hospitality, entertainment, and
                international trade.
              </p>
            </FadeReveal>
            <FadeReveal delay={100}>
              <p className="mt-6 leading-relaxed text-neutral sm:text-lg">
                The Group was founded on creative work and structured
                deliberately as a holding company — so that each business can
                be run with its own identity and standards while drawing on
                shared creativity, audience, and infrastructure. It is early in
                that journey, and says so: 2026 is its foundation year.
              </p>
            </FadeReveal>

            <dl className="mt-14 grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-3">
              {[
                { term: "Headquarters", detail: `${contact.city}, ${contact.country}` },
                { term: "Structure", detail: "Diversified holding company" },
                { term: "Businesses", detail: `${divisions.length} operating divisions` },
              ].map((item) => (
                <div key={item.term} className="bg-surface p-7">
                  <dt className="overline-label text-[10px] text-gold">{item.term}</dt>
                  <dd className="mt-3 font-display text-lg leading-snug text-white">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ——— ECOSYSTEM ——— */}
      <Section id="ecosystem" className="border-t border-white/5">
        <SectionHeading
          overline="The Ecosystem"
          title="One vision. Multiple businesses. Shared growth."
          lede="The businesses are designed to strengthen one another — visibility, identity, experience, destination, and commerce, held inside a single institution."
        />
        <EcosystemDiagram />
      </Section>

      {/* ——— THE BUSINESSES ——— */}
      <Section id="businesses" className="border-t border-white/5">
        <SectionHeading
          overline="The Businesses"
          title="Five houses, one standard of execution."
          lede="Each division operates with its own identity, market, and craft. Explore what they build."
        />
        <div className="border-t border-white/10">
          {divisions.map((d, i) => (
            <FadeReveal key={d.key} delay={i * 60}>
              <Link
                href={d.href}
                className="group relative flex flex-col gap-4 overflow-hidden border-b border-white/10 py-10 transition-colors duration-500 sm:flex-row sm:items-center sm:gap-10 sm:py-12"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(60% 100% at 20% 50%, color-mix(in srgb, ${d.accent} 10%, transparent) 0%, transparent 70%)`,
                  }}
                />
                <span className="relative font-display text-lg text-white/50 transition-colors duration-300 group-hover:text-gold sm:w-16">
                  {d.index}
                </span>
                <span className="relative flex-1">
                  <span className="block font-display text-3xl text-white transition-transform duration-500 ease-luxe group-hover:translate-x-2 sm:text-5xl">
                    {d.name}
                  </span>
                  <span className="mt-2 block text-sm text-neutral sm:text-base">{d.tagline}</span>
                </span>
                <span className="relative hidden gap-2 lg:flex">
                  {d.facets.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/10 px-4 py-1.5 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors duration-300 group-hover:border-gold/30 group-hover:text-white/70"
                    >
                      {f}
                    </span>
                  ))}
                </span>
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  aria-hidden
                  className="relative shrink-0 -translate-x-2 text-white/50 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-gold group-hover:opacity-100"
                >
                  <path d="M14 1l7 7-7 7M21 8H1" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— PURPOSE · VISION · MISSION ———
          The page inverts here. Three published statements deserve to be read
          as a document, and the break in ground is what stops the site
          reading as one uninterrupted dark scroll. */}
      <section className="on-paper relative bg-paper px-6 py-24 sm:px-10 md:py-36 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold-deep">Purpose · Vision · Mission</p>
          </FadeReveal>
          <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
            {[purpose, vision, mission].map((statement, i) => (
              <FadeReveal key={statement.label} delay={i * 90}>
                <div className="grid gap-6 border-t border-ink/12 pt-8 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-3">
                    <p className="font-label text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/62">
                      {String(i + 1).padStart(2, "0")} — {statement.label}
                    </p>
                  </div>
                  <p className="font-display text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.12] tracking-tight text-ink md:col-span-9">
                    {statement.statement}
                  </p>
                </div>
              </FadeReveal>
            ))}
          </div>

          {/* Philosophy */}
          <FadeReveal delay={120}>
            <div className="mt-24 border-t border-ink/12 pt-10 md:mt-32">
              <p className="font-label text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/62">
                Our Philosophy
              </p>
              <p className="mt-8 font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-ink">
                {philosophy.words.map((word, i) => (
                  <span key={word} className={i === 2 ? "text-gold-deep" : undefined}>
                    {word}{" "}
                  </span>
                ))}
              </p>
              <p className="mt-8 max-w-xl leading-relaxed text-ink-soft sm:text-lg">{philosophy.body}</p>
            </div>
          </FadeReveal>
        </div>
      </section>

      {/* ——— WHY DUBZZ ——— */}
      <Section id="why" className="border-t border-white/5">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                overline="Why Dubzz"
                title="The advantage is structural."
                lede="Six reasons the Group is built the way it is — each one a mechanism, not a claim."
                className="mb-0 md:mb-0"
              />
            </div>
          </div>
          <ol className="lg:col-span-8">
            {advantages.map((item, i) => (
              <FadeReveal key={item.title} delay={i * 70}>
                <li className="group flex gap-6 border-t border-white/10 py-8 last:border-b sm:gap-10">
                  <span className="font-display text-sm text-white/50 transition-colors duration-500 group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-snug text-white sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-neutral">{item.body}</p>
                  </div>
                </li>
              </FadeReveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ——— GROWTH STRATEGY + ROADMAP ——— */}
      <section className="on-paper relative bg-paper px-6 py-24 sm:px-10 md:py-36 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold-deep">Growth Strategy</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Five pillars, then five years.
            </h2>
          </FadeReveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg bg-ink/12 md:mt-16 md:grid-cols-5">
            {growthPillars.map((pillar, i) => (
              <FadeReveal key={pillar.title} delay={i * 70}>
                <li className="flex h-full flex-col bg-paper p-7">
                  <span className="font-display text-sm text-ink/62">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-xl leading-snug text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
                </li>
              </FadeReveal>
            ))}
          </ol>

          <div className="mt-24 border-t border-ink/12 pt-14 md:mt-32">
            <FadeReveal>
              <p className="overline-label text-gold-deep">Five-Year Roadmap</p>
              <h2 className="mt-5 max-w-2xl font-display text-3xl leading-[1.08] tracking-tight text-ink sm:text-4xl md:text-5xl">
                Foundation. Nigeria. Africa. Institution. Global.
              </h2>
            </FadeReveal>
            <div className="mt-14">
              <RoadmapTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* ——— FOUNDER ——— */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div aria-hidden className="light-above absolute inset-0" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 md:py-36 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <FadeReveal>
                <p className="overline-label text-gold">Leadership</p>
                {/* A monogram rather than a stock portrait: the Group has not
                    published a photograph, and borrowing someone else's face
                    for its founder is not a design decision. */}
                <div className="mt-10 flex aspect-[4/5] max-w-sm items-center justify-center rounded-lg border border-white/10 bg-gradient-to-b from-surface-2 to-background">
                  <span aria-hidden className="font-display text-[clamp(5rem,18vw,9rem)] leading-none text-gradient-gold">
                    CN
                  </span>
                </div>
                <p className="mt-8 font-display text-3xl leading-tight text-white">{founder.name}</p>
                <p className="mt-2 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  {founder.role}
                </p>
              </FadeReveal>
            </div>
            <div className="lg:col-span-7">
              <FadeReveal delay={120}>
                <blockquote className="border-l-2 border-gold pl-6 sm:pl-8">
                  <p className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.2] text-white">
                    “{founder.quote}”
                  </p>
                </blockquote>
              </FadeReveal>
              <FadeReveal delay={200}>
                <p className="mt-12 font-display text-xl leading-snug text-white/80 sm:text-2xl">
                  {founderNarrative.standfirst}
                </p>
              </FadeReveal>
              {founderNarrative.paragraphs.map((para, i) => (
                <FadeReveal key={i} delay={260 + i * 70}>
                  <p className="mt-6 leading-relaxed text-neutral">{para}</p>
                </FadeReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— PARTNERSHIPS ——— */}
      <Section id="partnerships" className="border-t border-white/5">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              overline="Strategic Partnerships"
              title="Build with Dubzz."
              lede="The Group is open to partnerships that create long-term value on both sides — commercially, creatively, and institutionally."
              className="mb-0 md:mb-0"
            />
            <FadeReveal delay={150} className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" size="lg">
                Start a Partnership
              </Button>
            </FadeReveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2">
              {partnershipAudiences.map((audience, i) => (
                <FadeReveal key={audience.group} delay={i * 70}>
                  <div className="h-full bg-surface p-7">
                    <p className="overline-label text-[10px] text-gold">{audience.group}</p>
                    <ul className="mt-5 space-y-2.5">
                      {audience.items.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-neutral">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ——— JOURNAL ——— */}
      <Section className="border-t border-white/5">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <SectionHeading overline="The Journal" title="Latest dispatches." className="mb-0 md:mb-0" />
          <FadeReveal delay={150}>
            <Button href="/blog" variant="secondary">
              All Articles
            </Button>
          </FadeReveal>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg bg-white/10 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <FadeReveal key={p.slug} delay={i * 100}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col bg-surface p-8">
                <p className="overline-label text-[10px] text-gold">{p.category}</p>
                <h3 className="mt-4 font-display text-xl leading-snug text-white transition-colors group-hover:text-gold-bright">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral">{p.dek}</p>
                <p className="mt-auto pt-8 text-xs text-white/50">
                  {new Date(p.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {p.readTime}
                </p>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— CLOSING ——— */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div aria-hidden className="light-below absolute inset-0" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
          <FadeReveal>
            <p className="overline-label text-gold">{contact.city} · {contact.country}</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
              An institution is built
              <br />
              <span className="text-gradient-gold">one decision at a time.</span>
            </h2>
          </FadeReveal>
          <FadeReveal delay={200} className="mt-12">
            <Button href="/contact" size="lg">
              Start the Conversation
            </Button>
          </FadeReveal>
        </div>
      </section>
    </>
  );
}
