import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

/**
 * Use in Server Components / Route Handlers. RLS applies as the calling user.
 *
 * Returns `null` when Supabase is unconfigured so a missing env var degrades
 * the account features instead of prerendering the whole site into an error.
 */
export async function createClient() {
  if (!supabaseConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component with no way to set cookies -- fine
            // as long as proxy.ts is refreshing the session (see root proxy.ts).
          }
        },
      },
    }
  );
}
