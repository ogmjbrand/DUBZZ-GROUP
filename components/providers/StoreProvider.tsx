"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/data/products";

export interface CartItem {
  slug: string;
  size: string;
  qty: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  hydrated: boolean;
  addToCart: (slug: string, size: string) => void;
  removeFromCart: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
}

const StoreContext = createContext<StoreState | null>(null);

const STORAGE_KEY = "dubzz-store-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Deferred a frame so hydration setState happens in a callback, not the
    // effect body (react-hooks/set-state-in-effect).
    const raf = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { cart?: CartItem[]; wishlist?: string[] };
          setCart(parsed.cart ?? []);
          setWishlist(parsed.wishlist ?? []);
        }
      } catch {
        // corrupted storage — start clean
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }));
  }, [cart, wishlist, hydrated]);

  const addToCart = useCallback((slug: string, size: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug && i.size === size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { slug, size, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((slug: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const value = useMemo<StoreState>(() => {
    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cart.reduce(
      (sum, i) => sum + (getProduct(i.slug)?.price ?? 0) * i.qty,
      0
    );
    return {
      cart,
      wishlist,
      cartCount,
      subtotal,
      hydrated,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
    };
  }, [cart, wishlist, hydrated, addToCart, removeFromCart, setQty, clearCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
