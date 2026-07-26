import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { Section } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";
import { galleryScenes } from "@/lib/data/resort";

export const metadata: Metadata = {
  title: "Gallery — Dubzz Wines Resort",
  description: "Scenes from the estate — first light on the east slope to midnight on the terrace.",
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
              Scenes from the estate.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              A day on the estate, first light to midnight. The photograph
              undersells it — guests keep telling us so.
            </p>
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
