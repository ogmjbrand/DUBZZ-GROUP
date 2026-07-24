import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FadeReveal from "@/components/motion/FadeReveal";
import Visual from "@/components/ui/Visual";
import ProductCard from "@/components/wear/ProductCard";
import ProductActions from "@/components/wear/ProductActions";
import { getProduct, products } from "@/lib/data/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Dubzz Wear`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-24 pt-32 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
        {/* Gallery */}
        <FadeReveal className="space-y-5">
          <Visual background={product.visual} className="aspect-[4/5] rounded-lg" />
          <div className="grid grid-cols-3 gap-5">
            {["detail", "texture", "profile"].map((angle, i) => (
              <Visual
                key={angle}
                background={product.visual}
                className="aspect-square rounded-lg"
              >
                <span className="absolute bottom-3 left-3 font-label text-[8px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  0{i + 2} · {angle}
                </span>
              </Visual>
            ))}
          </div>
        </FadeReveal>

        {/* Details */}
        <div className="lg:pt-8">
          <FadeReveal delay={100}>
            <p className="overline-label text-wear">
              {product.category} · {product.colorway}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-label text-2xl font-semibold text-gold">
              ${product.price}
            </p>
            <p className="mt-7 leading-relaxed text-neutral">{product.description}</p>
          </FadeReveal>

          <FadeReveal delay={200} className="mt-10">
            <ProductActions product={product} />
          </FadeReveal>

          <FadeReveal delay={280} className="mt-12 border-t border-white/10 pt-8">
            <p className="overline-label mb-5 text-[10px] text-white/45">Details</p>
            <ul className="space-y-3">
              {product.details.map((d) => (
                <li key={d} className="flex items-baseline gap-3 text-sm text-white/70">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-white/40">
              <p>Free carbon-neutral shipping over $250</p>
              <p>14-day returns · archive exchanges</p>
            </div>
          </FadeReveal>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-white/5 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="overline-label mb-10 text-gold">Completes the Silhouette</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <FadeReveal key={p.slug} delay={i * 70}>
                <ProductCard product={p} />
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
