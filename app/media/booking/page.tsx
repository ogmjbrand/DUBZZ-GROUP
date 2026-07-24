import type { Metadata } from "next";
import FadeReveal from "@/components/motion/FadeReveal";
import MediaBookingForm from "@/components/forms/MediaBookingForm";

export const metadata: Metadata = {
  title: "Book a Commission — Dubzz Media",
  description:
    "Commission Dubzz Media — brand identity, film and campaign, digital experience, and strategy engagements.",
};

const expectations = [
  { step: "01", title: "The Read", body: "We review every commission personally, every Friday. No triage bots." },
  { step: "02", title: "The Call", body: "If the fit is right, a working session with the people who'd actually do the work." },
  { step: "03", title: "The Letter", body: "A short proposal: approach, team, timeline, number. One page, no theatre." },
];

export default function MediaBookingPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_0%,rgba(183,188,199,0.08)_0%,transparent_60%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 pb-28 pt-44 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <FadeReveal>
            <p className="overline-label text-media">Dubzz Media · Booking</p>
            <h1 className="mt-7 font-display text-5xl leading-[1.05] text-white sm:text-6xl">
              Commission the studio.
            </h1>
            <p className="mt-7 max-w-md leading-relaxed text-neutral">
              We take a small number of commissions each season so that every
              one gets the studio&apos;s full attention. Tell us what you&apos;re
              making.
            </p>
          </FadeReveal>
          <div className="mt-14 space-y-8">
            {expectations.map((e, i) => (
              <FadeReveal key={e.step} delay={120 + i * 90}>
                <div className="flex gap-6">
                  <span className="font-display text-lg text-gold">{e.step}</span>
                  <div>
                    <p className="font-display text-xl text-white">{e.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral">{e.body}</p>
                  </div>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <FadeReveal delay={150}>
            <div className="rounded-lg glass p-8 sm:p-12">
              <MediaBookingForm />
            </div>
          </FadeReveal>
        </div>
      </div>
    </div>
  );
}
