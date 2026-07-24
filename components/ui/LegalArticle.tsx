import FadeReveal from "@/components/motion/FadeReveal";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export default function LegalArticle({
  overline,
  title,
  updated,
  sections,
}: {
  overline: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-28 pt-44">
      <FadeReveal>
        <p className="overline-label text-gold">{overline}</p>
        <h1 className="mt-7 font-display text-5xl leading-[1.05] text-white sm:text-6xl">{title}</h1>
        <p className="mt-5 text-sm text-white/35">Last updated {updated}</p>
      </FadeReveal>
      <div className="mt-14 space-y-12 border-t border-white/10 pt-14">
        {sections.map((s, i) => (
          <FadeReveal key={s.heading} delay={Math.min(i * 40, 160)}>
            <section>
              <h2 className="font-display text-2xl text-white">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-neutral">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </FadeReveal>
        ))}
      </div>
    </div>
  );
}
