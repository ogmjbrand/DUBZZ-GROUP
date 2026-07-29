import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FadeReveal from "@/components/motion/FadeReveal";
import AccountShell from "@/components/wear/AccountShell";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Account — Dubzz Wear",
  description: "Your Dubzz Wear account — orders, numbered pieces, and preferences.",
};

const roleLabel: Record<string, string> = {
  customer: "Member",
  investor: "Investor",
  admin: "Administrator",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/wear/account");

  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("orders").select("id, order_items(quantity)").eq("profile_id", user.id),
  ]);

  const pieces = (orders ?? []).reduce(
    (sum, o) =>
      sum + (o.order_items ?? []).reduce((s: number, i: { quantity: number }) => s + i.quantity, 0),
    0
  );
  const since = new Date(profile?.created_at ?? user.created_at).getFullYear();
  const standing = roleLabel[profile?.role ?? "customer"] ?? "Member";

  return (
    <AccountShell active="/wear/account">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Numbered Pieces Owned", value: String(pieces) },
          { label: "Member Since", value: String(since) },
          { label: "Standing", value: standing },
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

      {pieces === 0 ? (
        <FadeReveal delay={200} className="mt-10">
          <div className="rounded-lg border border-white/8 p-10 text-center">
            <p className="font-display text-2xl text-white">No numbered pieces yet.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral">
              Pieces you order appear here once the atelier confirms them.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/wear">Browse the Collection</Button>
              <Button href="/wear/account/orders" variant="secondary">
                Order History
              </Button>
            </div>
          </div>
        </FadeReveal>
      ) : null}
    </AccountShell>
  );
}
