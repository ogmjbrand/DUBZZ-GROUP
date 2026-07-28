import type { Metadata } from "next";
import { redirect } from "next/navigation";
import FadeReveal from "@/components/motion/FadeReveal";
import Button from "@/components/ui/Button";
import AccountShell from "@/components/wear/AccountShell";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Order History — Dubzz Wear",
  description: "Your Dubzz Wear order history.",
};

const statusStyles: Record<string, string> = {
  pending: "border-gold/30 bg-gold/10 text-gold",
  paid: "border-success/30 bg-success/10 text-success",
  fulfilled: "border-success/30 bg-success/10 text-success",
  cancelled: "border-error/30 bg-error/10 text-error",
};

interface OrderItemRow {
  quantity: number;
  product_variants: { size: string | null; products: { name: string } | null } | null;
}

interface OrderRow {
  id: string;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
  order_items: OrderItemRow[];
}

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/wear/account/orders");

  const { data } = await supabase
    .from("orders")
    .select(
      "id, status, total_cents, currency, created_at, order_items(quantity, product_variants(size, products(name)))"
    )
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  const orders = (data ?? []) as unknown as OrderRow[];

  return (
    <AccountShell active="/wear/account/orders">
      <FadeReveal>
        {orders.length === 0 ? (
          <div className="rounded-lg border border-white/8 p-16 text-center">
            <p className="font-display text-3xl text-white">No orders yet.</p>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-neutral">
              Your order history will appear here once you place an order.
            </p>
            <div className="mt-8">
              <Button href="/wear">Browse the Collection</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-white/8">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Order", "Date", "Pieces", "Total", "Status"].map((h) => (
                      <th key={h} className="overline-label px-6 py-4 text-[9px] text-white/40">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((o) => (
                    <tr key={o.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-6 py-5 font-label text-xs font-semibold tracking-wider text-gold">
                        {o.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-6 py-5 text-white/60">
                        {new Date(o.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-5 text-white">
                        {o.order_items
                          .map((i) => {
                            const name = i.product_variants?.products?.name ?? "Piece";
                            const size = i.product_variants?.size;
                            return `${name}${size ? ` (${size})` : ""}${i.quantity > 1 ? ` ×${i.quantity}` : ""}`;
                          })
                          .join(", ")}
                      </td>
                      <td className="px-6 py-5 text-white/80">
                        {o.currency} {(o.total_cents / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs capitalize ${statusStyles[o.status] ?? "border-white/15 bg-white/5 text-white/45"}`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <Button href="/wear" variant="secondary">
                Back to the Collection
              </Button>
            </div>
          </>
        )}
      </FadeReveal>
    </AccountShell>
  );
}
