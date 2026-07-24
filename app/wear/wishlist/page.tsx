import type { Metadata } from "next";
import FadeReveal from "@/components/motion/FadeReveal";
import WishlistView from "@/components/wear/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist — Dubzz Wear",
  description: "Pieces you're keeping an eye on.",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 lg:px-16">
      <FadeReveal>
        <p className="overline-label text-wear">Dubzz Wear</p>
        <h1 className="mb-14 mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">
          Your wishlist.
        </h1>
      </FadeReveal>
      <FadeReveal delay={120}>
        <WishlistView />
      </FadeReveal>
    </div>
  );
}
