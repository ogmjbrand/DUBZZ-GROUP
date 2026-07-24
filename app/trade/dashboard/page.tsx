import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FadeReveal from "@/components/motion/FadeReveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { shipments, tradeCorridors, tradeStats } from "@/lib/data/trade";

export const metadata: Metadata = {
  title: "Commerce Dashboard — Dubzz Trade",
  description: "Live view of Dubzz Trade shipments, corridors, and delivery performance.",
};

const statusStyles: Record<string, string> = {
  "In transit": "border-trade/40 bg-trade/10 text-trade",
  Customs: "border-gold/40 bg-gold/10 text-gold",
  Arriving: "border-success/40 bg-success/10 text-success",
  Complete: "border-white/20 bg-white/5 text-white/50",
};

export default function TradeDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 lg:px-16">
      <FadeReveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="overline-label text-trade">Dubzz Trade · Dashboard</p>
            <h1 className="mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">
              Global commerce, at a glance.
            </h1>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-white/35">
            Illustrative snapshot — partner logins receive live custody-chain
            data per contract.
          </p>
        </div>
      </FadeReveal>

      {/* KPI row */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tradeStats.map((s, i) => (
          <FadeReveal key={s.label} delay={i * 70}>
            <Card static>
              <div className="p-7">
                <p className="font-display text-4xl text-white">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                </p>
                <p className="mt-2 text-xs text-neutral">{s.label}</p>
              </div>
            </Card>
          </FadeReveal>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Shipments table */}
        <FadeReveal delay={100} className="lg:col-span-8">
          <div className="rounded-lg border border-white/8">
            <div className="flex items-center justify-between border-b border-white/8 px-7 py-5">
              <p className="overline-label text-white/45">Active Shipments</p>
              <span className="flex items-center gap-2 text-xs text-success">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                Live custody chain
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    {["Reference", "Cargo", "Route", "ETA", "Status"].map((h) => (
                      <th key={h} className="overline-label px-7 py-4 text-[9px] text-white/35">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {shipments.map((s) => (
                    <tr key={s.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-7 py-5 font-label text-xs font-semibold tracking-wider text-gold">{s.id}</td>
                      <td className="px-7 py-5 text-white">{s.cargo}</td>
                      <td className="px-7 py-5 text-white/60">{s.route}</td>
                      <td className="px-7 py-5 text-white/60">{s.eta}</td>
                      <td className="px-7 py-5">
                        <span className={`rounded-full border px-3 py-1 text-xs ${statusStyles[s.status]}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeReveal>

        {/* Corridor panel */}
        <FadeReveal delay={180} className="lg:col-span-4">
          <div className="flex h-full flex-col rounded-lg border border-white/8">
            <p className="overline-label border-b border-white/8 px-7 py-5 text-white/45">
              Corridor Load
            </p>
            <ul className="flex-1 space-y-5 px-7 py-6">
              {tradeCorridors.map((c, i) => {
                const load = [86, 72, 64, 58, 41][i] ?? 50;
                return (
                  <li key={`${c.from}-${c.to}`}>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/70">
                        {c.from} → {c.to}
                      </span>
                      <span className="text-white/40">{load}%</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-trade to-gold"
                        style={{ width: `${load}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-white/8 p-7">
              <Button href="/trade/inquiry" className="w-full">
                Open an Inquiry
              </Button>
            </div>
          </div>
        </FadeReveal>
      </div>
    </div>
  );
}
