import type { Metadata } from "next";
import FadeReveal from "@/components/motion/FadeReveal";
import Button from "@/components/ui/Button";
import AccountShell from "@/components/wear/AccountShell";

export const metadata: Metadata = {
  title: "Order History — Dubzz Wear",
  description: "Your Dubzz Wear order history.",
};

// Mock history — populated from Supabase `orders` once accounts ship.
const orders = [
  {
    id: "DZW-88417",
    date: "12 Jul 2026",
    items: "Obsidian Hoodie (M) · No. 214/300",
    total: "$285",
    status: "Delivered",
  },
  {
    id: "DZW-87902",
    date: "28 May 2026",
    items: "Gilt Crewneck (L), Veil Cap",
    total: "$305",
    status: "Delivered",
  },
] as const;

export default function OrdersPage() {
  return (
    <AccountShell active="/wear/account/orders">
      <FadeReveal>
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
                  <td className="px-6 py-5 font-label text-xs font-semibold tracking-wider text-gold">{o.id}</td>
                  <td className="px-6 py-5 text-white/60">{o.date}</td>
                  <td className="px-6 py-5 text-white">{o.items}</td>
                  <td className="px-6 py-5 text-white/80">{o.total}</td>
                  <td className="px-6 py-5">
                    <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs text-success">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-xs text-white/30">
          Example history shown — live orders appear here once accounts launch.
        </p>
        <div className="mt-8">
          <Button href="/wear" variant="secondary">
            Back to the Collection
          </Button>
        </div>
      </FadeReveal>
    </AccountShell>
  );
}
