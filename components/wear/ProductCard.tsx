"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Visual from "@/components/ui/Visual";
import { useStore } from "@/components/providers/StoreProvider";
import type { Product } from "@/lib/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, hydrated } = useStore();
  const wished = hydrated && wishlist.includes(product.slug);

  return (
    <div className="group relative">
      <Link href={`/wear/product/${product.slug}`} className="block">
        <Card innerClassName="flex flex-col">
          <Visual background={product.visual} zoomOnHover className="aspect-[4/5]">
            {product.badge ? (
              <span className="absolute left-5 top-5 rounded-full border border-gold/40 bg-background/60 px-4 py-1.5 font-label text-[9px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                {product.badge}
              </span>
            ) : null}
            {/* Quick view hint */}
            <span className="absolute inset-x-5 bottom-5 translate-y-3 rounded-lg bg-background/70 py-3 text-center font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              View Piece
            </span>
          </Visual>
          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <h3 className="font-display text-lg text-white transition-colors group-hover:text-gold-bright">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-neutral">
                {product.category} · {product.colorway}
              </p>
            </div>
            <p className="font-label text-sm font-semibold text-gold">${product.price}</p>
          </div>
        </Card>
      </Link>
      <button
        type="button"
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={wished}
        onClick={() => toggleWishlist(product.slug)}
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur-md transition-colors hover:bg-background/90"
      >
        <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden fill={wished ? "#d4af37" : "none"}>
          <path
            d="M8 13S1 8.7 1 4.5A3.5 3.5 0 018 3a3.5 3.5 0 017 1.5C15 8.7 8 13 8 13z"
            stroke={wished ? "#d4af37" : "rgba(255,255,255,0.6)"}
            strokeWidth="1.3"
          />
        </svg>
      </button>
    </div>
  );
}
