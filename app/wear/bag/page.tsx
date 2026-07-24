import type { Metadata } from "next";
import FadeReveal from "@/components/motion/FadeReveal";
import BagView from "@/components/wear/BagView";

export const metadata: Metadata = {
  title: "Your Bag — Dubzz Wear",
  description: "Review your Dubzz Wear selection before checkout.",
};

export default function BagPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 lg:px-16">
      <FadeReveal>
        <p className="overline-label text-wear">Dubzz Wear</p>
        <h1 className="mb-14 mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">
          Your bag.
        </h1>
      </FadeReveal>
      <FadeReveal delay={120}>
        <BagView />
      </FadeReveal>
    </div>
  );
}
