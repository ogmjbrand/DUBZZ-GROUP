"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { divisions } from "@/lib/data/divisions";
import { products } from "@/lib/data/products";
import { posts } from "@/lib/data/posts";
import { sanctuaries, experiences } from "@/lib/data/resort";

interface SearchEntry {
  type: string;
  title: string;
  description: string;
  href: string;
}

const index: SearchEntry[] = [
  ...divisions.map((d) => ({
    type: "Division",
    title: d.name,
    description: d.description,
    href: d.href,
  })),
  ...products.map((p) => ({
    type: "Wear",
    title: p.name,
    description: `${p.category} · $${p.price} · ${p.description}`,
    href: `/wear/product/${p.slug}`,
  })),
  ...posts.map((p) => ({
    type: "Journal",
    title: p.title,
    description: p.dek,
    href: `/blog/${p.slug}`,
  })),
  ...sanctuaries.map((s) => ({
    type: "Wines Resort",
    title: s.name,
    description: s.tagline,
    href: "/wine-resort/booking/sanctuary",
  })),
  ...experiences.map((e) => ({
    type: "Wines Resort",
    title: e.name,
    description: e.description,
    href: "/wine-resort/experiences",
  })),
  { type: "Page", title: "About Dubzz Group", description: "The story, the standard, the houses.", href: "/about" },
  { type: "Page", title: "Careers", description: "Open roles across the five houses.", href: "/careers" },
  { type: "Page", title: "Contact", description: "Start a conversation with the group.", href: "/contact" },
  { type: "Page", title: "Investor Relations", description: "The portal for the group's partners.", href: "/group/investors" },
  { type: "Page", title: "Trade Inquiry", description: "Open a commodity inquiry with the trade desk.", href: "/trade/inquiry" },
  { type: "Page", title: "Book a Stay", description: "Reserve a sanctuary at the estate.", href: "/wine-resort/booking/sanctuary" },
];

export default function SiteSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .map((entry) => {
        const title = entry.title.toLowerCase();
        const desc = entry.description.toLowerCase();
        let score = 0;
        if (title === q) score = 100;
        else if (title.startsWith(q)) score = 60;
        else if (title.includes(q)) score = 40;
        else if (desc.includes(q)) score = 15;
        return { entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.entry);
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchEntry[]>();
    for (const r of results) {
      map.set(r.type, [...(map.get(r.type) ?? []), r]);
    }
    return [...map.entries()];
  }, [results]);

  return (
    <div>
      {/* Pill search bar — the sanctioned exception to the Sharp Rule */}
      <div className="relative">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40"
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the ecosystem — products, work, journal, the estate…"
          aria-label="Search the site"
          className="w-full rounded-full border border-white/15 bg-surface py-5 pl-14 pr-6 text-white placeholder:text-white/30 transition-[border-color,box-shadow] duration-300 focus:border-gold focus:shadow-[0_0_48px_-12px_rgba(212,175,55,0.4)] focus:outline-none"
        />
      </div>

      {/* Results */}
      <div aria-live="polite" className="mt-12">
        {query.trim().length >= 2 && results.length === 0 ? (
          <div className="rounded-lg border border-white/8 p-12 text-center">
            <p className="font-display text-2xl text-white">Nothing in the archive.</p>
            <p className="mt-3 text-sm text-neutral">
              No results for &ldquo;{query}&rdquo; — try a product, an article, or a house name.
            </p>
          </div>
        ) : null}

        {grouped.map(([type, entries]) => (
          <div key={type} className="mb-10">
            <p className="overline-label mb-4 text-gold">{type}</p>
            <ul className="divide-y divide-white/8 border-y border-white/8">
              {entries.map((e) => (
                <li key={e.href + e.title}>
                  <Link href={e.href} className="group flex items-center gap-6 py-5 transition-colors hover:bg-white/[0.02]">
                    <span className="flex-1">
                      <span className="block font-display text-xl text-white transition-colors group-hover:text-gold-bright">
                        {e.title}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-sm text-neutral">{e.description}</span>
                    </span>
                    <svg width="18" height="14" viewBox="0 0 22 16" fill="none" aria-hidden className="shrink-0 -translate-x-1 text-white/20 transition-all group-hover:translate-x-0 group-hover:text-gold">
                      <path d="M14 1l7 7-7 7M21 8H1" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {query.trim().length < 2 ? (
          <div>
            <p className="overline-label mb-5 text-white/40">Popular</p>
            <div className="flex flex-wrap gap-3">
              {["Obsidian Hoodie", "Night Shoots", "Harvest", "Investors", "Cocoa"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-white/12 px-5 py-2 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
