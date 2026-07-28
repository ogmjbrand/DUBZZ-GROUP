import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FadeReveal from "@/components/motion/FadeReveal";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Inner Circle Hub — Dubzz Group",
  description: "Your guest profile across the Dubzz ecosystem — standing, privileges, and activity.",
};

/** Program description, not a per-user entitlement claim -- nothing here implies it's active for this account yet. */
const privileges = [
  { division: "Wines Resort", perk: "Event priority & cellar allocations once the estate opens" },
  { division: "Wear", perk: "First access to numbered runs" },
  { division: "Media", perk: "Studio previews & screening invitations" },
  { division: "Trade", perk: "Desk introductions on request" },
];

const roleLabel: Record<string, string> = {
  customer: "Member",
  investor: "Investor",
  admin: "Administrator",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/group/profile");

  const [{ data: profile }, { data: membership }, { data: bookings }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("investor_memberships").select("*").eq("profile_id", user.id).maybeSingle(),
    supabase
      .from("bookings")
      .select("id, check_in, check_out, status, created_at, sanctuaries(name)")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const displayName = profile?.full_name?.trim() || user.email?.split("@")[0] || "Member";
  const memberNumber = user.id.replace(/-/g, "").slice(0, 8).toUpperCase();
  const since = new Date(profile?.created_at ?? user.created_at ?? Date.now()).getFullYear();
  const tier = roleLabel[profile?.role ?? "customer"] ?? "Member";
  const standing = membership?.tier ? membership.tier.replace("_", " ") : "member";

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 lg:px-16">
      <FadeReveal>
        <p className="overline-label text-gold">Dubzz Group · Inner Circle</p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">
          Welcome back, {displayName}.
        </h1>
      </FadeReveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        {/* Membership card */}
        <FadeReveal delay={100} className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-lg border border-gold/30 bg-[linear-gradient(135deg,#16120a_0%,#0b0906_60%,#000000_100%)] p-8">
            <div aria-hidden className="grain absolute inset-0" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-label text-[10px] font-bold tracking-[0.3em] text-gold">
                  INNER CIRCLE
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
              <p className="mt-14 font-display text-3xl capitalize text-white">{standing}</p>
              <p className="mt-1 text-xs text-white/40">{tier} · Since {since}</p>
              <div className="mt-10 flex items-end justify-between">
                <p className="font-label text-[9px] uppercase tracking-[0.24em] text-white/35">
                  Member № {memberNumber}
                </p>
                <p className="font-label text-[9px] uppercase tracking-[0.24em] text-gold/70">
                  Dubzz Group
                </p>
              </div>
            </div>
          </div>
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
                {bookings && bookings.length > 0 ? (
                  <ol className="mt-6 space-y-5 border-l border-white/10 pl-6">
                    {bookings.map((b) => (
                      <li key={b.id} className="relative">
                        <span aria-hidden className="absolute -left-[27px] top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
                        <p className="text-sm text-white">
                          Booking requested — {(b as { sanctuaries: { name: string } | null }).sanctuaries?.name ?? "Sanctuary"}
                        </p>
                        <p className="mt-0.5 text-xs text-white/35">
                          {new Date(b.check_in).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} —{" "}
                          {new Date(b.check_out).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {b.status}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-6 text-sm leading-relaxed text-neutral">
                    Nothing yet — bookings, applications, and allocations will
                    appear here as you use the group&apos;s houses.
                  </p>
                )}
              </div>
            </Card>
          </FadeReveal>
        </div>
      </div>
    </div>
  );
}
