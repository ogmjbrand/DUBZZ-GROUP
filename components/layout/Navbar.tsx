"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { divisions } from "@/lib/data/divisions";
import { navLinks } from "@/lib/data/site";
import { useStore } from "@/components/providers/StoreProvider";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, hydrated } = useStore();
  const { user, profile, loading, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [venturesOpen, setVenturesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const venturesRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation — state reset during render, per React docs,
  // instead of a cascading effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setVenturesOpen(false);
    setAccountOpen(false);
  }

  // Close ventures dropdown on outside click / Escape
  useEffect(() => {
    if (!venturesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!venturesRef.current?.contains(e.target as Node)) setVenturesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVenturesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [venturesOpen]);

  // Close account dropdown on outside click / Escape
  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!accountRef.current?.contains(e.target as Node)) setAccountOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountOpen]);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass = (href: string) =>
    [
      "font-label text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
      pathname === href ? "text-gold" : "text-white/60 hover:text-white",
    ].join(" ");

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || mobileOpen
          ? "border-b border-white/8 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="/" aria-label="Dubzz Group — home" className="group flex items-baseline gap-1.5">
          <span className="font-label text-lg font-bold tracking-[0.3em] text-white">
            DUBZZ
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-300 group-hover:scale-125" />
          <span className="font-label text-[10px] font-semibold tracking-[0.3em] text-white/50">
            GROUP
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          <div ref={venturesRef} className="relative">
            <button
              type="button"
              aria-expanded={venturesOpen}
              aria-haspopup="menu"
              onClick={() => setVenturesOpen((v) => !v)}
              className={[
                "flex items-center gap-2 font-label text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                venturesOpen || pathname.startsWith("/group") ? "text-gold" : "text-white/60 hover:text-white",
              ].join(" ")}
            >
              Ventures
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                aria-hidden
                className={`transition-transform duration-300 ${venturesOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>

            {/* Venture switcher panel */}
            <div
              role="menu"
              className={[
                "absolute left-1/2 top-full mt-5 w-[440px] -translate-x-1/2 rounded-lg glass p-2 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)] transition-all duration-300",
                venturesOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0",
              ].join(" ")}
            >
              {divisions.map((d) => (
                <Link
                  key={d.key}
                  role="menuitem"
                  href={d.href}
                  className="group/item flex items-center gap-4 rounded-md px-4 py-3.5 transition-colors duration-200 hover:bg-white/5"
                >
                  <span className="font-display text-sm text-white/30">{d.index}</span>
                  <span
                    className="h-8 w-px shrink-0"
                    style={{ background: `linear-gradient(to bottom, transparent, ${d.accent}, transparent)` }}
                  />
                  <span className="flex-1">
                    <span className="block font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors group-hover/item:text-gold">
                      {d.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/40">{d.tagline}</span>
                  </span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="-translate-x-1 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                    <path d="M9 1l4 4-4 4M13 5H1" stroke="#d4af37" strokeWidth="1.3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/search" aria-label="Search" className="p-1 text-white/60 transition-colors hover:text-gold">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
              <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </Link>

          <div ref={accountRef} className="relative hidden sm:block">
            {loading ? (
              <span aria-hidden className="block h-[18px] w-[18px]" />
            ) : user ? (
              <>
                <button
                  type="button"
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  aria-label="Account menu"
                  onClick={() => setAccountOpen((v) => !v)}
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full border font-label text-[10px] font-bold transition-colors",
                    accountOpen ? "border-gold text-gold" : "border-white/25 text-white/60 hover:border-gold hover:text-gold",
                  ].join(" ")}
                >
                  {(profile?.full_name?.trim()?.[0] ?? user.email?.[0] ?? "?").toUpperCase()}
                </button>
                <div
                  role="menu"
                  className={[
                    "absolute right-0 top-full mt-4 w-64 rounded-lg glass p-2 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)] transition-all duration-300",
                    accountOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0",
                  ].join(" ")}
                >
                  <div className="px-4 py-3">
                    <p className="truncate text-sm text-white">{profile?.full_name || "Member"}</p>
                    <p className="truncate text-xs text-white/40">{user.email}</p>
                  </div>
                  <div className="my-1 h-px bg-white/8" />
                  {[
                    { label: "Inner Circle Hub", href: "/group/profile" },
                    { label: "Account Settings", href: "/group/settings" },
                    { label: "Wear Account", href: "/wear/account" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      role="menuitem"
                      href={item.href}
                      className="block rounded-md px-4 py-2.5 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:bg-white/5 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-1 h-px bg-white/8" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setAccountOpen(false);
                      void signOut();
                    }}
                    className="block w-full rounded-md px-4 py-2.5 text-left font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:bg-white/5 hover:text-error"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" aria-label="Sign in" className="p-1 text-white/60 transition-colors hover:text-gold">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M3 16c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </Link>
            )}
          </div>

          <Link href="/wear/bag" aria-label={`Shopping bag${hydrated && cartCount > 0 ? `, ${cartCount} items` : ""}`} className="relative p-1 text-white/60 transition-colors hover:text-gold">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 6h12l-1 10.5H4L3 6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M6 6V5a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {hydrated && cartCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-label text-[9px] font-bold text-background">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-lg border border-gold/50 px-5 py-2.5 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 lg:inline-block"
          >
            Start a Project
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-white transition-all duration-300 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-background/97 backdrop-blur-2xl transition-all duration-500 lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-8 py-10">
          <p className="overline-label mb-6 text-gold">Ventures</p>
          <div className="space-y-1">
            {divisions.map((d, i) => (
              <Link
                key={d.key}
                href={d.href}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
                className={[
                  "flex items-baseline gap-4 py-2.5 transition-all duration-500",
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                ].join(" ")}
              >
                <span className="font-display text-sm text-white/30">{d.index}</span>
                <span className="font-display text-3xl text-white">{d.name.replace("Dubzz ", "")}</span>
              </Link>
            ))}
          </div>
          <div className="mt-10 border-t border-white/10 pt-8">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ transitionDelay: mobileOpen ? `${250 + i * 40}ms` : "0ms" }}
                className={[
                  "block py-3 font-label text-xs font-semibold uppercase tracking-[0.24em] text-white/60 transition-all duration-500 hover:text-gold",
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                ].join(" ")}
              >
                {l.label}
              </Link>
            ))}
            {!loading ? (
              user ? (
                <>
                  <Link
                    href="/group/profile"
                    className="block py-3 font-label text-xs font-semibold uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-gold"
                  >
                    Inner Circle Hub
                  </Link>
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    className="block py-3 font-label text-xs font-semibold uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-gold"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-3 font-label text-xs font-semibold uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-gold"
                >
                  Sign In
                </Link>
              )
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
