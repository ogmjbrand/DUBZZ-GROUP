import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Server-only. Bypasses RLS entirely via the service role key -- never import
// this from a Client Component, and never let SUPABASE_SERVICE_ROLE_KEY reach
// the browser bundle (it has no NEXT_PUBLIC_ prefix, which prevents that).
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
