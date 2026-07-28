/** Fire-and-forget sync of a wishlist toggle to Supabase for signed-in users. */
export async function syncWishlist(slug: string, add: boolean): Promise<void> {
  try {
    await fetch("/api/wear/wishlist", {
      method: add ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
  } catch {
    // best-effort -- local wishlist state already reflects the change
  }
}

export async function fetchServerWishlist(): Promise<string[]> {
  try {
    const res = await fetch("/api/wear/wishlist");
    if (!res.ok) return [];
    const body = (await res.json()) as { slugs?: string[] };
    return body.slugs ?? [];
  } catch {
    return [];
  }
}
