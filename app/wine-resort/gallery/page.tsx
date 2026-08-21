import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { Section } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import StatusNote from "@/components/ui/StatusNote";
import { galleryScenes } from "@/lib/data/resort";

export const metadata: Metadata = {
  title: "Gallery — Dubzz Wines Resort",
  description: "Visual studies for Dubzz Wines Resort — the destination as it is being designed, first light to midnight.",
};

const spanClasses: Record<string, string> = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  std: "",
};

export default function GalleryPage() {
  return (
    <>
      <section className="px-6 pb-8 pt-44 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <FadeReveal>
            <p className="overline-label text-wine">Wines Resort · Gallery</p>
            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-7xl">
              The destination, envisioned.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              A day at the destination as it is being designed — first light
              to midnight. These are visual studies, not photographs of a
              finished property.
            </p>
          </FadeReveal>
          <FadeReveal delay={140} className="mt-10 max-w-2xl">
            <StatusNote label="In Development">
              Dubzz Wines Resort is a destination in development. What follows
              is the design vision for it, not a bookable programme.
            </StatusNote>
          </FadeReveal>
        </div>
      </section>

      <Section>
        <div className="grid auto-rows-[220px] gap-5 sm:grid-cols-3">
          {galleryScenes.map((scene, i) => (
            <FadeReveal key={scene.caption} delay={(i % 3) * 80} className={spanClasses[scene.span]}>
              <div className="group relative h-full overflow-hidden rounded-lg">
                <Visual background={scene.visual} zoomOnHover className="h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="absolute bottom-5 left-5 translate-y-2 font-display text-lg text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {scene.caption}
                  </p>
                </Visual>
              </div>
            </FadeReveal>
          ))}
        </div>
        <FadeReveal className="mt-16 text-center">
          <Button href="/wine-resort/booking/sanctuary" size="lg">
            See It in Person
          </Button>
        </FadeReveal>
      </Section>
    </>
  );
}
