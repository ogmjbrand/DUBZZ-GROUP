import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Whether Supabase credentials are present in this environment.
 *
 * The corporate site is the majority of this project and needs no account
 * system at all. Treating Supabase as required meant a missing env var took
 * down every page — including static ones — so configuration is checked
 * rather than assumed. `proxy.ts` already passes through on the same basis.
 */
export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

/** Returns `null` when Supabase is unconfigured; callers degrade to signed-out. */
export function createClient() {
  if (!supabaseConfigured) return null;

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
