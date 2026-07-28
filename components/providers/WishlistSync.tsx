"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useStore } from "@/components/providers/StoreProvider";
import { fetchServerWishlist, syncWishlist } from "@/lib/wishlist-sync";

/**
 * Merges the local (guest) wishlist with Supabase once per sign-in: pulls
 * down anything saved server-side, pushes up anything added while signed
 * out. Renders nothing -- it only exists for this effect.
 */
export default function WishlistSync() {
  const { user } = useAuth();
  const { wishlist, hydrated, toggleWishlist } = useStore();
  const syncedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!user || !hydrated || syncedFor.current === user.id) return;
    syncedFor.current = user.id;

    void (async () => {
      const serverSlugs = await fetchServerWishlist();
      serverSlugs.forEach((slug) => {
        if (!wishlist.includes(slug)) toggleWishlist(slug);
      });
      wishlist
        .filter((slug) => !serverSlugs.includes(slug))
        .forEach((slug) => void syncWishlist(slug, true));
    })();
  }, [user, hydrated, wishlist, toggleWishlist]);

  return null;
}
