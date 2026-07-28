import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import CinematicVideo from "@/components/effects/CinematicVideo";
import EcosystemCanvas from "@/components/effects/EcosystemCanvas";
import { divisions } from "@/lib/data/divisions";
import { posts } from "@/lib/data/posts";
import { milestones } from "@/lib/data/site";

/**
 * The profile's Five-Year Strategic Roadmap.
 *
 * Replaces an invented corporate history (a 2016 founding, a 2019 sell-out
 * run, a corridor opened in 2022, an estate acquired in 2024). The Group is
 * in its foundation year: Wear is preparing to launch and the resort is still
 * being developed, so a past-tense timeline was fiction. Forward-looking
 * phases are what the Group has actually published.
 */
const timeline = [
  { year: "2026", event: "Foundation — establish operations, strengthen Dubzz Media, prepare the launch of Dubzz Wear, and introduce the first After Dark experiences." },
  { year: "2027", event: "Expansion — grow across Nigeria through stronger partnerships, brand visibility, and momentum in every division." },
  { year: "2028", event: "Regional Growth — enter key African markets while building hospitality, lifestyle experiences, and export." },
  { year: "2029", event: "Institutional Growth — flagship hospitality developments and larger-scale entertainment, under operational excellence." },
  { year: "2030", event: "Global Positioning — one of Africa's leading creative and lifestyle holding companies." },
];

export default function Home() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
        {/* Base layer: the flagship film. Decorative, so it carries no label —
            the headline below states everything the footage says. */}
        <CinematicVideo name="hero-film" poster="/posters/hero-film.jpg" />
        <EcosystemCanvas />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div aria-hidden className="grain absolute inset-0" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-gold">A Multi-Venture Luxury Ecosystem</p>
          </FadeReveal>
          <FadeReveal delay={120}>
            <h1 className="mt-8 max-w-5xl font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.98] tracking-tight text-white">
              Five houses.
              <br />
              <span className="text-gradient-gold">One standard.</span>
            </h1>
          </FadeReveal>
          <FadeReveal delay={240}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              Media, fashion, hospitality, and global trade — built as one
              ecosystem, governed by a single uncompromising idea of quality.
            </p>
          </FadeReveal>
          <FadeReveal delay={360} className="mt-12 flex flex-wrap gap-4">
            <Button href="#divisions" size="lg">
              Explore the Ecosystem
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              Our Story
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
                <span className="font-display text-xs text-white/30 transition-colors group-hover:text-gold">
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
                  <span className="font-label text-[11px] font-semibold uppercase tracking-[0.4em] text-white/20">
                    {d.name}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gold/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ——— ABOUT ——— */}
      <Section id="about">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                overline="The Group"
                title="Built slowly. Held to one standard."
                className="mb-0 md:mb-0"
              />
              <FadeReveal delay={150} className="mt-10">
                <Button href="/about" variant="secondary">
                  Read the Full Story
                </Button>
              </FadeReveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FadeReveal>
              <p className="text-xl leading-relaxed text-white/80 sm:text-2xl">
                Dubzz Group exists on one simple refusal — to ship anything we
                wouldn&apos;t sign. That refusal now spans five ventures across
                media, fashion, hospitality, and trade, and the work of
                building each one properly is only just beginning.
              </p>
              <p className="mt-6 text-base leading-relaxed text-neutral sm:text-lg">
                Each house operates with its own identity and its own craft.
                What they share is governance: patient capital, deliberate
                growth, and the single-regret test applied to every decision
                that ships.
              </p>
            </FadeReveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              <FadeReveal delay={100}>
                <Card static className="h-full">
                  <div className="p-8">
                    <p className="overline-label text-gold">Mission</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      To build ventures worth keeping — businesses whose quality
                      compounds across decades, not quarters.
                    </p>
                  </div>
                </Card>
              </FadeReveal>
              <FadeReveal delay={200}>
                <Card static className="h-full">
                  <div className="p-8">
                    <p className="overline-label text-gold">Vision</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      An ecosystem where each house sharpens the others — and
                      the standard is the only strategy that never changes.
                    </p>
                  </div>
                </Card>
              </FadeReveal>
            </div>

            {/* Timeline */}
            <ol className="mt-16 border-l border-white/10 pl-8">
              {timeline.map((t, i) => (
                <FadeReveal key={t.year} delay={i * 90}>
                  <li className="relative pb-10 last:pb-0">
                    <span aria-hidden className="absolute -left-[37px] top-1.5 h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                    <p className="font-display text-2xl text-gold">{t.year}</p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral">{t.event}</p>
                  </li>
                </FadeReveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ——— FIVE DIVISIONS ——— */}
      <Section id="divisions" className="border-t border-white/5">
        <SectionHeading
          overline="The Ecosystem"
          title="Five ventures, one ambition."
          lede="Each division is a house in its own right — explore what they build."
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
                <span className="relative font-display text-lg text-white/30 transition-colors duration-300 group-hover:text-gold sm:w-16">
                  {d.index}
                </span>
                <span className="relative flex-1">
                  <span className="block font-display text-3xl text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-5xl">
                    {d.name}
                  </span>
                  <span className="mt-2 block text-sm text-neutral sm:text-base">{d.tagline}</span>
                </span>
                <span className="relative hidden gap-2 lg:flex">
                  {d.facets.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/10 px-4 py-1.5 font-label text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 group-hover:border-gold/30 group-hover:text-white/70"
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
                  className="relative shrink-0 -translate-x-2 text-white/30 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-gold group-hover:opacity-100"
                >
                  <path d="M14 1l7 7-7 7M21 8H1" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— MILESTONES ———
          Replaces a "Featured Work" grid of invented case studies, a counter
          row of invented metrics, and three invented client testimonials. The
          Group is early-stage; what it has are foundations laid, and the
          profile states them plainly. Restore richer proof here only when
          there is real work to show. */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Key Milestones"
          title="Building momentum."
          lede="Every enduring institution begins with deliberate progress. These are the foundations already in place."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {milestones.map((m, i) => (
            <FadeReveal key={m.area} delay={i * 90}>
              <Card static className="h-full">
                <div className="flex h-full flex-col p-9">
                  <p className="overline-label text-gold">{m.area}</p>
                  <ul className="mt-6 space-y-4">
                    {m.items.map((item) => (
                      <li key={item} className="flex gap-4 text-sm leading-relaxed text-neutral">
                        <span aria-hidden className="mt-2 h-px w-5 shrink-0 bg-gold/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— LATEST NEWS ——— */}
      <Section className="border-t border-white/5">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <SectionHeading overline="The Journal" title="Latest dispatches." className="mb-0 md:mb-0" />
          <FadeReveal delay={150}>
            <Button href="/blog" variant="secondary">
              All Articles
            </Button>
          </FadeReveal>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <FadeReveal key={p.slug} delay={i * 100}>
              <Link href={`/blog/${p.slug}`} className="group block h-full">
                <Card className="h-full" innerClassName="flex flex-col">
                  <Visual
                    background={p.visual}
                    src={p.image}
                    alt={p.imageAlt}
                    zoomOnHover
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="h-44"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="overline-label text-gold">{p.category}</p>
                    <h3 className="mt-3 font-display text-xl leading-snug text-white transition-colors group-hover:text-gold-bright">
                      {p.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral">{p.dek}</p>
                    <p className="mt-auto pt-6 text-xs text-white/35">
                      {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {p.readTime}
                    </p>
                  </div>
                </Card>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— FINAL CTA ——— */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_100%_at_50%_120%,rgba(212,175,55,0.16)_0%,transparent_60%)]"
        />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center md:py-44">
          <FadeReveal>
            <p className="overline-label text-gold">The Invitation</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
              Let&apos;s build something
              <br />
              <span className="text-gradient-gold">that outlasts us.</span>
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
