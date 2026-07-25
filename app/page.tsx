import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import CinematicVideo from "@/components/effects/CinematicVideo";
import EcosystemCanvas from "@/components/effects/EcosystemCanvas";
import { divisions } from "@/lib/data/divisions";
import { caseStudies } from "@/lib/data/case-studies";
import { posts } from "@/lib/data/posts";
import { groupStats, testimonials } from "@/lib/data/site";

const timeline = [
  { year: "2016", event: "Dubzz is founded as a single creative studio with an unreasonable standard." },
  { year: "2019", event: "Dubzz Wear launches its first numbered run. It sells out in nine days." },
  { year: "2022", event: "Dubzz Trade opens its first corridor — Accra to Rotterdam, fully traceable." },
  { year: "2024", event: "The estate is acquired. Dubzz Wine Resort breaks ground among the vines." },
  { year: "2026", event: "Five ventures, fourteen markets, one standard. The ecosystem comes online." },
];

export default function Home() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
        {/* Base layer: the flagship film. Decorative, so it carries no label —
            the headline below states everything the footage says. */}
        <CinematicVideo name="hero-film-1080" poster="/posters/hero-film.jpg" />
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
                Dubzz Group began as a single studio with a simple refusal — to
                ship anything we wouldn&apos;t sign. A decade later, that refusal
                has compounded into five ventures across media, fashion,
                hospitality, and trade.
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

      {/* ——— FEATURED WORK ——— */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Featured Work"
          title="Made to be remembered."
          lede="Selected commissions from Dubzz Media — the craft that carries the whole house."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <FadeReveal
              key={cs.slug}
              delay={i * 100}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <Link href={`/media/case-studies/${cs.slug}`} className="group block">
                <Card innerClassName="bg-surface">
                  <Visual
                    background={cs.visual}
                    src={cs.image}
                    alt={cs.imageAlt}
                    scrim
                    zoomOnHover
                    priority={i === 0}
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 1280px" : "(max-width: 768px) 100vw, 640px"}
                    className={i === 0 ? "h-[320px] sm:h-[420px]" : "h-[260px] sm:h-[300px]"}
                  >
                    <div className="flex h-full flex-col justify-end p-8 sm:p-10">
                      <p className="overline-label text-gold">{cs.discipline} · {cs.year}</p>
                      <h3 className={`mt-3 font-display text-white ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>
                        {cs.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
                        {cs.summary}
                      </p>
                    </div>
                  </Visual>
                </Card>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— STATISTICS ——— */}
      <Section className="border-t border-white/5">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {groupStats.map((s, i) => (
            <FadeReveal key={s.label} delay={i * 90} className="border-l border-gold/25 pl-6">
              <p className="font-display text-5xl text-white sm:text-6xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[180px] text-sm text-neutral">{s.label}</p>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— TESTIMONIALS ——— */}
      <Section className="border-t border-white/5">
        <SectionHeading overline="In Their Words" title="The company we keep." align="center" />
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeReveal key={t.name} delay={i * 110}>
              <Card static className="h-full">
                <figure className="flex h-full flex-col p-9">
                  <span aria-hidden className="font-display text-6xl leading-none text-gold/40">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 font-display text-lg leading-relaxed text-white/85">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 border-t border-white/10 pt-5">
                    <p className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                      {t.name}
                    </p>
                    <p className="mt-1 text-xs text-white/40">{t.role}</p>
                  </figcaption>
                </figure>
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
