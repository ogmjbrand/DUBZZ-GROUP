import type { Metadata } from "next";
import FadeReveal from "@/components/motion/FadeReveal";
import SiteSearch from "@/components/forms/SiteSearch";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across the Dubzz Group ecosystem — products, work, journal entries, and the estate.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-28 pt-44">
      <FadeReveal>
        <p className="overline-label text-gold">Search</p>
        <h1 className="mb-12 mt-7 font-display text-5xl leading-[1.05] text-white sm:text-6xl">
          What are you looking for?
        </h1>
      </FadeReveal>
      <FadeReveal delay={120}>
        <SiteSearch />
      </FadeReveal>
    </div>
  );
}
