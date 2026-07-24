"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useStore } from "@/components/providers/StoreProvider";
import { getProduct } from "@/lib/data/products";
import Visual from "@/components/ui/Visual";

const steps = [
  { label: "Identity", href: "/wear/checkout/identity" },
  { label: "Shipping", href: "/wear/checkout/shipping" },
  { label: "Payment", href: "/wear/checkout/payment" },
];

/** Shared checkout chrome: step progress + live order summary. */
export default function CheckoutShell({
  step,
  children,
}: {
  step: 0 | 1 | 2;
  children: ReactNode;
}) {
  const { cart, subtotal, hydrated } = useStore();
  const shipping = subtotal >= 250 ? 0 : 18;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-28 pt-36 sm:px-10">
      {/* Progress */}
      <nav aria-label="Checkout progress" className="mb-14">
        <ol className="flex items-center gap-2 sm:gap-4">
          {steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={s.label} className="flex flex-1 items-center gap-2 sm:gap-4">
                {state === "done" ? (
                  <Link href={s.href} className="group flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-label text-[10px] font-bold text-background">
                      ✓
                    </span>
                    <span className="hidden font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 group-hover:text-gold sm:block">
                      {s.label}
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-3" aria-current={state === "current" ? "step" : undefined}>
                    <span
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full border font-label text-[10px] font-bold",
                        state === "current"
                          ? "border-gold text-gold shadow-[0_0_16px_rgba(212,175,55,0.35)]"
                          : "border-white/15 text-white/30",
                      ].join(" ")}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={[
                        "hidden font-label text-[10px] font-semibold uppercase tracking-[0.2em] sm:block",
                        state === "current" ? "text-white" : "text-white/30",
                      ].join(" ")}
                    >
                      {s.label}
                    </span>
                  </span>
                )}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className={`h-px flex-1 ${i < step ? "bg-gold/60" : "bg-white/10"}`}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">{children}</div>

        {/* Order summary */}
        <aside className="lg:col-span-5">
          <div className="rounded-lg glass p-7 lg:sticky lg:top-32">
            <p className="overline-label text-white/45">Your Order</p>
            {!hydrated ? (
              <div className="mt-6 h-24 animate-pulse rounded-md bg-white/5" aria-hidden />
            ) : cart.length === 0 ? (
              <p className="mt-6 text-sm text-neutral">
                Your bag is empty —{" "}
                <Link href="/wear" className="text-gold hover:text-gold-bright">
                  return to the collection
                </Link>
                .
              </p>
            ) : (
              <>
                <ul className="mt-6 space-y-4">
                  {cart.map((item) => {
                    const product = getProduct(item.slug);
                    if (!product) return null;
                    return (
                      <li key={`${item.slug}-${item.size}`} className="flex items-center gap-4">
                        <Visual background={product.visual} className="h-14 w-12 shrink-0 rounded-md" />
                        <div className="flex-1">
                          <p className="text-sm text-white">{product.name}</p>
                          <p className="text-xs text-white/40">
                            {item.size} × {item.qty}
                          </p>
                        </div>
                        <p className="text-sm text-white/70">${product.price * item.qty}</p>
                      </li>
                    );
                  })}
                </ul>
                <dl className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-white/50">Subtotal</dt>
                    <dd className="text-white">${subtotal}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/50">Shipping</dt>
                    <dd className="text-white">{shipping === 0 ? "Complimentary" : `$${shipping}`}</dd>
                  </div>
                  <div className="flex justify-between pt-2">
                    <dt className="font-label text-xs font-semibold uppercase tracking-widest text-white">Total</dt>
                    <dd className="font-display text-xl text-gold">${subtotal + shipping}</dd>
                  </div>
                </dl>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
