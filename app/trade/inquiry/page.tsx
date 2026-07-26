import type { Metadata } from "next";
import FadeReveal from "@/components/motion/FadeReveal";
import TradeInquiryForm from "@/components/forms/TradeInquiryForm";

export const metadata: Metadata = {
  title: "Trade Inquiry — Dubzz Trade",
  description: "Open a commodity inquiry with the Dubzz Trade desk — spec, volume, destination.",
};

const process = [
  { step: "01", title: "The Spec", body: "You send grade, volume, and destination. The more precise, the faster." },
  { step: "02", title: "The Position", body: "Within a day: availability, spec sheets, and an indicative price." },
  { step: "03", title: "The Contract", body: "Terms agreed, custody chain opened, and both sides watch the same data." },
];

export default function TradeInquiryPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_0%,rgba(168,168,168,0.10)_0%,transparent_60%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 pb-28 pt-44 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <FadeReveal>
            <p className="overline-label text-trade">Dubzz Trade · Inquiry</p>
            <h1 className="mt-7 font-display text-5xl leading-[1.05] text-white sm:text-6xl">
              Open an inquiry.
            </h1>
            <p className="mt-7 max-w-md leading-relaxed text-neutral">
              One form, straight to the desk — no gatekeeping layers. If we
              can&apos;t serve the spec, we&apos;ll say so in the first reply.
            </p>
          </FadeReveal>
          <div className="mt-14 space-y-8">
            {process.map((p, i) => (
              <FadeReveal key={p.step} delay={120 + i * 90}>
                <div className="flex gap-6">
                  <span className="font-display text-lg text-trade">{p.step}</span>
                  <div>
                    <p className="font-display text-xl text-white">{p.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral">{p.body}</p>
                  </div>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <FadeReveal delay={150}>
            <div className="rounded-lg glass p-8 sm:p-12">
              <TradeInquiryForm />
            </div>
          </FadeReveal>
        </div>
      </div>
    </div>
  );
}
