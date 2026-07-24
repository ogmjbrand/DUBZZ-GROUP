"use client";

import Button from "@/components/ui/Button";
import ProductCard from "@/components/wear/ProductCard";
import { useStore } from "@/components/providers/StoreProvider";
import { getProduct } from "@/lib/data/products";

export default function WishlistView() {
  const { wishlist, hydrated } = useStore();

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-lg bg-surface" aria-hidden />;
  }

  const items = wishlist
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-white/8 p-16 text-center">
        <p className="font-display text-3xl text-white">Nothing saved yet.</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-neutral">
          Tap the heart on any piece to keep it here — useful when a run is
          getting close to closing.
        </p>
        <div className="mt-8">
          <Button href="/wear">Browse the Collection</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
