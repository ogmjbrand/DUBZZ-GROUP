import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Visual from "@/components/ui/Visual";
import FadeReveal from "@/components/motion/FadeReveal";
import Button from "@/components/ui/Button";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: `${cs.title} — Case Study`, description: cs.summary };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const currentIndex = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  const chapters = [
    { label: "The Challenge", body: cs.challenge },
    { label: "The Approach", body: cs.approach },
    { label: "The Outcome", body: cs.outcome },
  ];

  return (
    <article>
      {/* Hero */}
      <div className="relative">
        <Visual background={cs.visual} className="h-[60svh] min-h-[420px]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-6 pb-14 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-gold">
              {cs.discipline} · {cs.year}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.02] text-white sm:text-6xl md:text-7xl">
              {cs.title}
            </h1>
          </FadeReveal>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 sm:px-10 lg:grid-cols-12 lg:px-16">
        {/* Meta sidebar */}
        <aside className="lg:col-span-4">
          <div className="space-y-8 lg:sticky lg:top-32">
            <FadeReveal>
              <p className="text-lg leading-relaxed text-white/80">{cs.summary}</p>
            </FadeReveal>
            <FadeReveal delay={100}>
              <dl className="space-y-4 border-t border-white/10 pt-8 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-white/40">Client</dt>
                  <dd className="text-right text-white">{cs.client}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-white/40">Year</dt>
                  <dd className="text-white">{cs.year}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="shrink-0 text-white/40">Services</dt>
                  <dd className="text-right text-white">{cs.services.join(", ")}</dd>
                </div>
              </dl>
            </FadeReveal>
            <FadeReveal delay={180}>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {cs.results.map((r) => (
                  <div key={r.label}>
                    <p className="font-display text-3xl text-gold">{r.value}</p>
                    <p className="mt-1.5 text-[11px] leading-snug text-neutral">{r.label}</p>
                  </div>
                ))}
              </div>
            </FadeReveal>
          </div>
        </aside>

        {/* Chapters */}
        <div className="space-y-16 lg:col-span-8">
          {chapters.map((ch, i) => (
            <FadeReveal key={ch.label} delay={i * 80}>
              <section className="border-t border-white/10 pt-10">
                <p className="overline-label text-gold">{ch.label}</p>
                <p className="mt-6 text-lg leading-relaxed text-white/75">{ch.body}</p>
              </section>
            </FadeReveal>
          ))}
        </div>
      </div>

      {/* Next case study */}
      <Link href={`/media/case-studies/${next.slug}`} className="group block border-t border-white/5">
        <div className="relative overflow-hidden">
          <Visual background={next.visual} zoomOnHover className="h-[300px]">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="overline-label text-white/50">Next Case Study</p>
              <p className="mt-4 font-display text-4xl text-white transition-colors group-hover:text-gold-bright sm:text-5xl">
                {next.title}
              </p>
            </div>
          </Visual>
        </div>
      </Link>

      <div className="px-6 py-16 text-center">
        <Button href="/media/booking">Commission Work Like This</Button>
      </div>
    </article>
  );
}
