import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import FadeReveal from "@/components/motion/FadeReveal";

export const metadata: Metadata = {
  title: "After Dark — Entertainment & Lifestyle Experiences",
  description:
    "After Dark is Dubzz Group's signature entertainment and lifestyle experience platform — curated nights where music, fashion, food, creativity, and connection meet.",
};

/** Experience Categories, per the 2026 Corporate Profile. */
const experiences = [
  { title: "Rooftop Experiences", body: "Open-air nights above the city, built around a skyline and a sound system." },
  { title: "Garden Sessions", body: "Daylight-into-dusk gatherings in green space — slower, warmer, unhurried." },
  { title: "Premium Lounge", body: "Intimate rooms where the room itself is the guest list." },
  { title: "Cultural Nights", body: "Programming that puts Nigerian and pan-African culture at the centre of the evening." },
  { title: "Fashion Showcases", body: "Runway and presentation formats that give designers a real audience." },
  { title: "Live Music", body: "Performance-first nights booked for the artist, not the algorithm." },
  { title: "Creative Networking", body: "Rooms engineered so the right people actually meet each other." },
  { title: "Food & Lifestyle Festivals", body: "Larger-format days built around kitchens, makers, and the crowd they draw." },
  { title: "Seasonal Signature Events", body: "The tentpole editions the calendar gets planned around." },
];

/** The five principles every edition is built on. */
const principles = [
  "Exceptional Atmosphere",
  "Curated Entertainment",
  "Premium Hospitality",
  "Creative Expression",
  "Community Connection",
];

export default function AfterDarkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #141414 0%, #0a0a0a 45%, #000000 100%), radial-gradient(75% 60% at 25% 10%, rgba(138,109,29,0.30) 0%, transparent 60%)",
          }}
        />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:px-10 lg:px-16">
          <FadeReveal>
            <p className="overline-label text-afterdark">After Dark · 05</p>
            <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.98] text-white">
              Where culture
              <span className="italic text-afterdark"> comes alive.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral">
              Not a single event — a platform. Curated nights where music,
              fashion, food, creativity, and human connection meet, built to
              scale from one city into many.
            </p>
          </FadeReveal>
          <FadeReveal delay={200} className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Partner With Us
            </Button>
            <Button href="#experiences" variant="secondary" size="lg">
              The Formats
            </Button>
          </FadeReveal>
        </div>
      </section>

      {/* Positioning */}
      <Section className="border-t border-white/5">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <FadeReveal>
            <p className="overline-label text-afterdark">The Platform</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.08] text-white sm:text-5xl">
              Built to become a brand, not a night.
            </h2>
          </FadeReveal>
          <FadeReveal delay={120} className="space-y-6 text-lg leading-relaxed text-neutral">
            <p>
              After Dark is the signature entertainment and lifestyle experience
              platform of Dubzz Group — created to celebrate culture, music,
              fashion, food, creativity, and human connection.
            </p>
            <p>
              Rather than existing as a single event, it is designed as a
              scalable platform capable of growing into one of Africa&apos;s most
              recognised lifestyle experience brands. Every edition delivers a
              carefully curated atmosphere where entertainment, creativity,
              networking, and premium hospitality intersect.
            </p>
            <p className="text-white">
              The ambition is to expand across multiple Nigerian cities before
              exploring regional opportunities throughout Africa — through venue
              partnerships, hospitality collaborations, and destination
              experiences.
            </p>
          </FadeReveal>
        </div>
      </Section>

      {/* Experience categories */}
      <Section id="experiences" className="border-t border-white/5">
        <SectionHeading
          overline="Experience Categories"
          title="Nine ways an evening can go."
          lede="Each format exists because it draws a different room — and because a platform needs range to travel."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => (
            <FadeReveal key={e.title} delay={i * 60}>
              <Card static className="h-full">
                <div className="flex h-full flex-col p-8">
                  <p className="font-display text-lg text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl text-white">{e.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">{e.body}</p>
                </div>
              </Card>
            </FadeReveal>
          ))}
        </div>
      </Section>

      {/* Brand experience principles */}
      <Section className="border-t border-white/5">
        <SectionHeading
          overline="Brand Experience"
          title="Five things every edition owes you."
        />
        <ul className="divide-y divide-white/8 border-y border-white/8">
          {principles.map((p, i) => (
            <FadeReveal key={p} delay={i * 60}>
              <li className="flex items-baseline gap-6 py-7">
                <span className="overline-label w-10 shrink-0 text-afterdark">
                  0{i + 1}
                </span>
                <span className="font-display text-2xl text-white sm:text-3xl">{p}</span>
              </li>
            </FadeReveal>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <Section className="border-t border-white/5">
        <FadeReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-[1.08] text-white sm:text-5xl">
            Venues, brands, and artists — talk to us.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral">
            After Dark grows through partnership. If you run a space, build a
            brand, or make the kind of work a room should hear, there is a
            conversation to have.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg">
              Start a Conversation
            </Button>
          </div>
        </FadeReveal>
      </Section>
    </>
  );
}
