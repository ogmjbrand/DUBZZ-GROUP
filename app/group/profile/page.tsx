import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FadeReveal from "@/components/motion/FadeReveal";

export const metadata: Metadata = {
  title: "Inner Circle Hub — Dubzz Group",
  description: "Your guest profile across the Dubzz ecosystem — standing, privileges, and activity.",
};

// Mock profile — bound to Supabase auth + profiles once sign-in ships.
const privileges = [
  { division: "Wine Resort", perk: "Event priority & cellar allocations", state: "Active" },
  { division: "Wear", perk: "First access to numbered runs", state: "Active" },
  { division: "Media", perk: "Studio previews & screening invitations", state: "Active" },
  { division: "Trade", perk: "Desk introductions on request", state: "By request" },
];

const activity = [
  { when: "Jul 2026", what: "Invitation — The Midnight Vintage, September" },
  { when: "Jun 2026", what: "Allocation — East Slope Barrel, 1 of 40" },
  { when: "May 2026", what: "Access granted — Resource Vault, partner tier" },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 lg:px-16">
      <FadeReveal>
        <p className="overline-label text-gold">Dubzz Group · Inner Circle</p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">
          The Inner Circle hub.
        </h1>
      </FadeReveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        {/* Membership card */}
        <FadeReveal delay={100} className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-lg border border-gold/30 bg-[linear-gradient(135deg,#16120a_0%,#0b0906_60%,#050505_100%)] p-8">
            <div aria-hidden className="grain absolute inset-0" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-label text-[10px] font-bold tracking-[0.3em] text-gold">
                  INNER CIRCLE
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
              <p className="mt-14 font-display text-3xl text-white">Guest</p>
              <p className="mt-1 text-xs text-white/40">Provisional standing · 2026</p>
              <div className="mt-10 flex items-end justify-between">
                <p className="font-label text-[9px] uppercase tracking-[0.24em] text-white/35">
                  Member № —— ——
                </p>
                <p className="font-label text-[9px] uppercase tracking-[0.24em] text-gold/70">
                  Dubzz Group
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-white/30">
            Sign-in is on its way — standing, numbers, and allocations will bind
            to your account. Until then, the hub shows the provisional view.
          </p>
          <div className="mt-6 flex gap-3">
            <Button href="/group/settings" variant="secondary" size="sm">
              Account Settings
            </Button>
            <Button href="/group/investors/vault" variant="ghost" size="sm">
              Resource Vault
            </Button>
          </div>
        </FadeReveal>

        {/* Privileges + activity */}
        <div className="space-y-8 lg:col-span-7">
          <FadeReveal delay={180}>
            <Card static>
              <div className="p-8">
                <p className="overline-label text-white/45">Privileges Across the Houses</p>
                <ul className="mt-6 divide-y divide-white/6">
                  {privileges.map((p) => (
                    <li key={p.division} className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-display text-lg text-white">{p.division}</p>
                        <p className="mt-0.5 text-xs text-neutral">{p.perk}</p>
                      </div>
                      <span
                        className={[
                          "shrink-0 rounded-full border px-3.5 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.16em]",
                          p.state === "Active"
                            ? "border-success/40 bg-success/10 text-success"
                            : "border-white/15 bg-white/5 text-white/45",
                        ].join(" ")}
                      >
                        {p.state}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </FadeReveal>

          <FadeReveal delay={260}>
            <Card static>
              <div className="p-8">
                <p className="overline-label text-white/45">Recent Activity</p>
                <ol className="mt-6 space-y-5 border-l border-white/10 pl-6">
                  {activity.map((a) => (
                    <li key={a.what} className="relative">
                      <span aria-hidden className="absolute -left-[27px] top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
                      <p className="text-sm text-white">{a.what}</p>
                      <p className="mt-0.5 text-xs text-white/35">{a.when}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          </FadeReveal>
        </div>
      </div>
    </div>
  );
}
