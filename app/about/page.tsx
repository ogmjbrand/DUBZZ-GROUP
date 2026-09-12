import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import GoldShaderBackground from "@/components/effects/GoldShaderBackground";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { divisions } from "@/lib/data/divisions";
import { contact, coreValues, founder, milestones } from "@/lib/data/site";
import { founderNarrative, philosophy, purpose } from "@/lib/data/group";

export const metadata: Metadata = {
  title: "About the Group",
  description:
    "Dubbz Group is a diversified creative, lifestyle, and business holding company headquartered in Abuja, Nigeria — its story, values, and the foundations already in place.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "About the Group", path: "/about" }]} />

      {/* ——— HERO ——— */}
      <section className="relative flex min-h-[72svh] flex-col justify-end overflow-hidden">
        <GoldShaderBackground />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-36 sm:px-10 sm:pb-24 sm:pt-40 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-gold">About the Group</p>
            <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.03] tracking-tight text-white">
              An institution,
              <br />
              <span className="text-gradient-gold">built on purpose.</span>
            </h1>
          </FadeReveal>
          <FadeReveal delay={180}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral">
              {purpose.statement}
            </p>
          </FadeReveal>
        </div>
      </section>

      {/* ——— THE STORY ——— */}
      <Section className="border-t border-white/5">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <FadeReveal>
                <p className="overline-label text-gold">Our Story</p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-white">
                  It began with creative work.
                </h2>
              </FadeReveal>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-8">
            <FadeReveal>
              <p className="text-lg leading-relaxed text-white/85 sm:text-xl">
                Dubbz Media came first — visual storytelling, brand identity,
                and digital content for businesses, institutions, and
                entrepreneurs. It remains the Group&apos;s flagship creative
                business and the discipline everything else is measured
                against.
              </p>
            </FadeReveal>
            <FadeReveal delay={80}>
              <p className="leading-relaxed text-neutral">
                What followed was structural. Dubbz Wear was developed as a
                lifestyle fashion brand rooted in confidence, creativity, and
                contemporary African culture. Dubbz Wines Resort was
                established as a hospitality and lifestyle vision. After Dark
                was created as the Group&apos;s entertainment and experience
                platform. Dubbz Trade was built to connect African producers
                with buyers in regional and international markets.
              </p>
            </FadeReveal>
            <FadeReveal delay={160}>
              <p className="leading-relaxed text-neutral">
                Each was designed to stand on its own and to strengthen the
                others, held inside a single holding company headquartered in{" "}
                {contact.city}, {contact.region}. That structure is the
                argument: shared creativity, shared audience, shared
                infrastructure, and shared growth are worth more than five
                separate companies would be apart.
              </p>
            </FadeReveal>
            <FadeReveal delay={240}>
              <p className="leading-relaxed text-neutral">
                The Group is early in that journey and says so plainly. 2026 is
                its foundation year, and its published roadmap runs to 2030 —
                which is a statement of intent, not of arrival.
              </p>
            </FadeReveal>
            <FadeReveal delay={320}>
              <div className="pt-4">
                <Button href="/#ecosystem" variant="secondary">
                  See the Ecosystem
                </Button>
              </div>
            </FadeReveal>
          </div>
        </div>
      </Section>

      {/* ——— VALUES ———
          On paper, and set as a numbered index rather than six matching
          cards: the values are a short creed, and a grid of identical boxes
          is what makes a creed read as filler. */}
      <section className="on-paper relative bg-paper px-6 py-24 sm:px-10 md:py-36 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold-deep">Core Values</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Six commitments, held without exception.
            </h2>
          </FadeReveal>

          <ol className="mt-16 md:mt-20">
            {coreValues.map((value, i) => (
              <FadeReveal key={value.title} delay={i * 70}>
                <li className="grid gap-2 border-t border-ink/12 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                  <span className="font-label text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/62 md:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-ink md:col-span-4 md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="leading-relaxed text-ink-soft md:col-span-6 md:text-lg">
                    {value.lede}
                  </p>
                </li>
              </FadeReveal>
            ))}
          </ol>

          <FadeReveal delay={120}>
            <div className="mt-20 border-t border-ink/12 pt-10">
              <p className="font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.08] tracking-tight text-ink">
                {philosophy.words.map((word, i) => (
                  <span key={word} className={i === 2 ? "text-gold-deep" : undefined}>
                    {word}{" "}
                  </span>
                ))}
              </p>
            </div>
          </FadeReveal>
        </div>
      </section>

      {/* ——— MILESTONES ——— */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Key Milestones"
          title="What is already in place."
          lede="The Group is in the early stages of its journey. These are the foundations laid so far — stated as foundations, not as performance."
        />
        <div className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2">
          {milestones.map((m, i) => (
            <div key={m.area} className="flex h-full flex-col bg-surface p-8 sm:p-9">
              <FadeReveal delay={i * 90}>
                <p className="overline-label text-[10px] text-gold">{m.area}</p>
                <ul className="mt-6 space-y-4">
                  {m.items.map((item) => (
                    <li key={item} className="flex gap-4 text-sm leading-relaxed text-neutral">
                      <span aria-hidden className="mt-2 h-px w-5 shrink-0 bg-gold/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeReveal>
            </div>
          ))}
        </div>
      </Section>

      {/* ——— LEADERSHIP ——— */}
      <Section className="border-t border-white/5">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              overline="Leadership"
              title="Founded to outlast its founder."
              className="mb-0 md:mb-0"
            />
          </div>
          <div className="lg:col-span-7">
            <FadeReveal>
              <p className="text-lg leading-relaxed text-white/85 sm:text-xl">
                {founderNarrative.standfirst}
              </p>
            </FadeReveal>
            <FadeReveal delay={100}>
              <p className="mt-6 leading-relaxed text-neutral">
                {founderNarrative.paragraphs[0]}
              </p>
            </FadeReveal>
            <FadeReveal delay={180}>
              <div className="mt-10 border-l-2 border-gold pl-6">
                <p className="font-display text-xl text-white">{founder.name}</p>
                <p className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  {founder.role}
                </p>
              </div>
            </FadeReveal>
          </div>
        </div>
      </Section>

      {/* ——— PORTFOLIO ——— */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="The Portfolio"
          title="Five businesses, one institution."
        />
        <div className="border-t border-white/10">
          {divisions.map((d, i) => (
            <FadeReveal key={d.key} delay={i * 60}>
              <Link
                href={d.href}
                className="group flex flex-col gap-2 border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] sm:flex-row sm:items-baseline sm:gap-10"
              >
                <span className="font-display text-base text-white/50 transition-colors group-hover:text-gold sm:w-14">
                  {d.index}
                </span>
                <span className="font-display text-2xl text-white sm:w-72 sm:text-3xl">{d.name}</span>
                <span className="flex-1 text-sm leading-relaxed text-neutral">{d.description}</span>
                <span className="overline-label hidden shrink-0 text-[10px] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                  Visit →
                </span>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* ——— CTA ——— */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div aria-hidden className="light-below absolute inset-0" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
          <FadeReveal>
            <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              Build with Dubbz.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-neutral">
              The Group works with partners across institutions, commerce,
              capital, hospitality, and the creative industries.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Start a Partnership</Button>
              <Button href="/careers" variant="secondary">
                See Open Roles
              </Button>
            </div>
          </FadeReveal>
        </div>
      </section>
    </>
  );
}
