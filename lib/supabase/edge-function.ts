import { createClient } from "@/lib/supabase/server";

// Validates the caller's session, then forwards to a deployed Edge Function
// with their access token so the function's own `auth: "user"` check applies.
export async function callEdgeFunction(name: string, body: unknown) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: 401, data: { message: "Authentication required" } };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return { status: res.status, data };
}
