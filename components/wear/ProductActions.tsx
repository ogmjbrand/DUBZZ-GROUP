"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import type { Product } from "@/lib/data/products";

export default function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist, hydrated } = useStore();
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const wished = hydrated && wishlist.includes(product.slug);

  const onAdd = () => {
    if (!size) {
      setError("Select a size first.");
      return;
    }
    setError("");
    addToCart(product.slug, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div>
      <fieldset>
        <legend className="overline-label mb-4 text-[10px] text-white/45">Size</legend>
        <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Size">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              onClick={() => {
                setSize(s);
                setError("");
              }}
              className={[
                "min-w-12 rounded-lg border px-4 py-3 font-label text-xs font-semibold uppercase tracking-widest transition-all duration-200",
                size === s
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
        {error ? (
          <p role="alert" className="mt-3 text-xs text-error">
            {error}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button onClick={onAdd} className="flex-1 sm:flex-none">
          {added ? "Added to Bag ✓" : "Add to Bag"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => toggleWishlist(product.slug)}
          ariaLabel={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wished ? "♥ Wishlisted" : "♡ Wishlist"}
        </Button>
      </div>
      {added ? (
        <button
          type="button"
          onClick={() => router.push("/wear/bag")}
          className="mt-4 font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-gold underline-offset-4 hover:underline"
        >
          View bag →
        </button>
      ) : null}
    </div>
  );
}
