import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Visual from "@/components/ui/Visual";
import Card from "@/components/ui/Card";
import FadeReveal from "@/components/motion/FadeReveal";
import { getPost, posts } from "@/lib/data/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.dek };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <div className="relative">
        <Visual background={post.visual} className="h-[46svh] min-h-[320px]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24">
        <FadeReveal className="-mt-28 relative">
          <p className="overline-label text-gold">
            {post.category} ·{" "}
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readTime}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] text-white sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{post.dek}</p>
        </FadeReveal>

        <div className="mt-14 space-y-7 border-t border-white/10 pt-14">
          {post.body.map((paragraph, i) => (
            <FadeReveal key={i} delay={Math.min(i * 60, 240)}>
              <p
                className={
                  i === 0
                    ? "text-xl leading-relaxed text-white/85 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold"
                    : "leading-relaxed text-neutral"
                }
              >
                {paragraph}
              </p>
            </FadeReveal>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          <Link href="/blog" className="overline-label text-[10px] text-white/40 transition-colors hover:text-gold">
            ← All dispatches
          </Link>
          <p className="overline-label text-[10px] text-white/25">Dubzz Journal</p>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-white/5 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="overline-label mb-10 text-gold">Keep Reading</p>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <FadeReveal key={p.slug} delay={i * 90}>
                <Link href={`/blog/${p.slug}`} className="group block h-full">
                  <Card className="h-full" innerClassName="flex flex-col">
                    <Visual background={p.visual} zoomOnHover className="h-36" />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="overline-label text-[9px] text-gold">{p.category}</p>
                      <h3 className="mt-2.5 font-display text-lg leading-snug text-white transition-colors group-hover:text-gold-bright">
                        {p.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
