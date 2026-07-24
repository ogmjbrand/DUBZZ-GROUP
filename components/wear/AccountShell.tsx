import Link from "next/link";
import type { ReactNode } from "react";

const accountNav = [
  { label: "Overview", href: "/wear/account" },
  { label: "Order History", href: "/wear/account/orders" },
  { label: "Wishlist", href: "/wear/wishlist" },
];

export default function AccountShell({
  active,
  children,
}: {
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 lg:px-16">
      <p className="overline-label text-wear">Dubzz Wear · Account</p>
      <h1 className="mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">
        Your atelier ledger.
      </h1>
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <nav aria-label="Account" className="lg:col-span-3">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {accountNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active === item.href ? "page" : undefined}
                  className={[
                    "block whitespace-nowrap rounded-lg px-5 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors",
                    active === item.href
                      ? "bg-gold/10 text-gold"
                      : "text-white/50 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
