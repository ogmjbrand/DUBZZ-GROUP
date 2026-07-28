import type { Metadata } from "next";
import { redirect } from "next/navigation";
import FadeReveal from "@/components/motion/FadeReveal";
import SettingsPanel from "@/components/group/SettingsPanel";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Account Settings — Dubzz Group",
  description: "Manage your Dubzz Group account — identity, correspondence, and security.",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/group/settings");

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-28 pt-40 sm:px-10">
      <FadeReveal>
        <p className="overline-label text-gold">Dubzz Group · Settings</p>
        <h1 className="mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">
          Account settings.
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral">
          Correspondence from the group is deliberate and rare — tune it to
          your taste.
        </p>
      </FadeReveal>
      <FadeReveal delay={140} className="mt-12">
        <SettingsPanel />
      </FadeReveal>
    </div>
  );
}
