import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FadeReveal from "@/components/motion/FadeReveal";
import AccountShell from "@/components/wear/AccountShell";

export const metadata: Metadata = {
  title: "Account — Dubzz Wear",
  description: "Your Dubzz Wear account — orders, numbered pieces, and preferences.",
};

// Mock account data — replaced by Supabase auth + profile once sign-in ships.
const member = {
  name: "Guest",
  tier: "Inner Circle — Provisional",
  pieces: 0,
  since: "2026",
};

export default function AccountPage() {
  return (
    <AccountShell active="/wear/account">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Numbered Pieces Owned", value: String(member.pieces) },
          { label: "Member Since", value: member.since },
          { label: "Standing", value: member.tier },
        ].map((s, i) => (
          <FadeReveal key={s.label} delay={i * 80}>
            <Card static className="h-full">
              <div className="p-7">
                <p className="font-display text-3xl text-gold">{s.value}</p>
                <p className="mt-2 text-xs text-neutral">{s.label}</p>
              </div>
            </Card>
          </FadeReveal>
        ))}
      </div>

      <FadeReveal delay={200} className="mt-10">
        <div className="rounded-lg border border-white/8 p-10 text-center">
          <p className="font-display text-2xl text-white">Sign-in is coming to the atelier.</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral">
            Accounts, owned-piece registries, and archive access are being wired
            to the group&apos;s membership system. Until then, your bag and
            wishlist live safely on this device.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/wear">Browse the Collection</Button>
            <Button href="/wear/account/orders" variant="secondary">
              Order History
            </Button>
          </div>
        </div>
      </FadeReveal>
    </AccountShell>
  );
}
