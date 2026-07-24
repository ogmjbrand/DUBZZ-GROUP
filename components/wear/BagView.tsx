"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { useStore } from "@/components/providers/StoreProvider";
import { getProduct } from "@/lib/data/products";

export default function BagView() {
  const { cart, setQty, removeFromCart, subtotal, hydrated } = useStore();

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-lg bg-surface" aria-hidden />;
  }

  if (cart.length === 0) {
    return (
      <div className="rounded-lg border border-white/8 p-16 text-center">
        <p className="font-display text-3xl text-white">Your bag is empty.</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-neutral">
          The collection is numbered and the runs do close — the piece
          you&apos;re circling won&apos;t circle back.
        </p>
        <div className="mt-8">
          <Button href="/wear">Shop the Collection</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* Items */}
      <ul className="space-y-5 lg:col-span-8">
        {cart.map((item) => {
          const product = getProduct(item.slug);
          if (!product) return null;
          return (
            <li
              key={`${item.slug}-${item.size}`}
              className="flex gap-6 rounded-lg border border-white/8 bg-surface p-5"
            >
              <Link href={`/wear/product/${product.slug}`} className="shrink-0">
                <Visual background={product.visual} className="h-28 w-24 rounded-md sm:h-36 sm:w-32" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/wear/product/${product.slug}`}
                      className="font-display text-xl text-white transition-colors hover:text-gold-bright"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-xs text-neutral">
                      Size {item.size} · {product.colorway}
                    </p>
                  </div>
                  <p className="font-label text-sm font-semibold text-gold">
                    ${product.price * item.qty}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-lg border border-white/12">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                      className="px-3.5 py-2 text-white/60 transition-colors hover:text-gold"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="min-w-8 text-center text-sm text-white">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                      className="px-3.5 py-2 text-white/60 transition-colors hover:text-gold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.slug, item.size)}
                    className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-error"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Summary */}
      <aside className="lg:col-span-4">
        <div className="rounded-lg glass p-8 lg:sticky lg:top-32">
          <p className="overline-label text-white/45">Summary</p>
          <dl className="mt-6 space-y-3.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/50">Subtotal</dt>
              <dd className="text-white">${subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Shipping</dt>
              <dd className="text-white">{subtotal >= 250 ? "Complimentary" : "$18"}</dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-4">
              <dt className="font-label text-xs font-semibold uppercase tracking-widest text-white">
                Total
              </dt>
              <dd className="font-display text-2xl text-gold">
                ${subtotal + (subtotal >= 250 ? 0 : 18)}
              </dd>
            </div>
          </dl>
          <div className="mt-8">
            <Button href="/wear/checkout/identity" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-white/30">
            Numbered pieces are held for 30 minutes at checkout.
          </p>
        </div>
      </aside>
    </div>
  );
}
