import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { Section } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import { posts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "The Dubzz Group journal — dispatches from five houses: perspective, craft, harvest notes, and the occasional letter from the founder.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="px-6 pb-16 pt-44 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-gold">The Journal</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              Dispatches from the five houses.
            </h1>
          </FadeReveal>
        </div>
      </section>

      <Section className="pt-0 md:pt-0">
        {/* Featured */}
        <FadeReveal>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <Card>
              <div className="grid lg:grid-cols-2">
                <Visual background={featured.visual} zoomOnHover className="h-64 lg:h-auto lg:min-h-[420px]" />
                <div className="flex flex-col justify-center p-9 sm:p-14">
                  <p className="overline-label text-gold">
                    {featured.category} · Featured
                  </p>
                  <h2 className="mt-5 font-display text-3xl leading-tight text-white transition-colors group-hover:text-gold-bright sm:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-md leading-relaxed text-neutral">{featured.dek}</p>
                  <p className="mt-8 text-xs text-white/35">
                    {formatDate(featured.date)} · {featured.readTime}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </FadeReveal>

        {/* Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <FadeReveal key={p.slug} delay={(i % 3) * 90}>
              <Link href={`/blog/${p.slug}`} className="group block h-full">
                <Card className="h-full" innerClassName="flex flex-col">
                  <Visual background={p.visual} zoomOnHover className="h-44" />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="overline-label text-gold">{p.category}</p>
                    <h3 className="mt-3 font-display text-xl leading-snug text-white transition-colors group-hover:text-gold-bright">
                      {p.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral">{p.dek}</p>
                    <p className="mt-auto pt-6 text-xs text-white/35">
                      {formatDate(p.date)} · {p.readTime}
                    </p>
                  </div>
                </Card>
              </Link>
            </FadeReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
