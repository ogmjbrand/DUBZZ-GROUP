import type { Metadata } from "next";
import FadeReveal from "@/components/motion/FadeReveal";
import ContactForm from "@/components/forms/ContactForm";
import { contact } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Dubzz Group — media commissions, trade inquiries, resort reservations, or anything in between.",
};

/**
 * Only what the Group publishes.
 *
 * Previously listed three further inboxes (studio@ / trade@ / reservations@)
 * and four offices — London, Accra, Porto, and an estate — none of which
 * exist. The profile gives one head office and one address, and even that is
 * marked "to be activated".
 */
const directLines = [
  { label: "General Enquiries", value: contact.email },
];

const enquiryTypes = contact.enquiries;

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-20 px-6 pb-28 pt-44 sm:px-10 lg:grid-cols-12 lg:px-16">
        {/* Left — context */}
        <div className="lg:col-span-5">
          <FadeReveal>
            <p className="overline-label text-gold">Contact</p>
            <h1 className="mt-7 font-display text-5xl leading-[1.05] text-white sm:text-6xl">
              Every project starts as a conversation.
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-neutral">
              Tell us what you&apos;re building, and we&apos;ll route you to the
              right house. Expect a considered reply, not an automated one.
            </p>
          </FadeReveal>

          <FadeReveal delay={150} className="mt-14">
            <p className="overline-label mb-5 text-white/45">Direct Lines</p>
            <ul className="space-y-3.5">
              {directLines.map((d) => (
                <li key={d.label} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/8 pb-3.5">
                  <span className="text-sm text-white/50">{d.label}</span>
                  <a href={`mailto:${d.value}`} className="text-sm text-white transition-colors hover:text-gold">
                    {d.value}
                  </a>
                </li>
              ))}
            </ul>
          </FadeReveal>

          <FadeReveal delay={250} className="mt-12">
            <p className="overline-label mb-5 text-white/45">Head Office</p>
            <address className="rounded-lg border border-white/8 p-6 not-italic">
              <p className="font-display text-xl text-white">{contact.company}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral">
                {contact.city}
                <br />
                {contact.region}
                <br />
                {contact.country}
              </p>
            </address>
          </FadeReveal>

          <FadeReveal delay={320} className="mt-12">
            <p className="overline-label mb-5 text-white/45">Business Enquiries</p>
            <ul className="flex flex-wrap gap-2">
              {enquiryTypes.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-white/10 px-4 py-1.5 font-label text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45"
                >
                  {e}
                </li>
              ))}
            </ul>
          </FadeReveal>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7">
          <FadeReveal delay={120}>
            <div className="rounded-lg glass p-8 sm:p-12">
              <ContactForm />
            </div>
          </FadeReveal>
        </div>
      </div>
    </div>
  );
}
