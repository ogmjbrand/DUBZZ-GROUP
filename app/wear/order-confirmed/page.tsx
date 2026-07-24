import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeReveal from "@/components/motion/FadeReveal";

export const metadata: Metadata = {
  title: "Order Confirmed — Dubzz Wear",
  description: "Your Dubzz Wear order is confirmed.",
};

export default function OrderConfirmedPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-44 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(212,175,55,0.12)_0%,transparent_60%)]"
      />
      <div aria-hidden className="grain absolute inset-0" />
      <FadeReveal className="relative">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden>
            <path d="M2 9l7 7L22 2" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <p className="overline-label mt-8 text-gold">Order Confirmed</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.05] text-white sm:text-6xl">
          The run number is yours.
        </h1>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-neutral">
          Your confirmation is on its way to your inbox with the piece&apos;s
          number and its papers. The atelier packs on weekdays; tracking follows
          within 48 hours.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button href="/wear/account/orders">View Order History</Button>
          <Button href="/wear" variant="secondary">
            Continue Browsing
          </Button>
        </div>
      </FadeReveal>
    </div>
  );
}
