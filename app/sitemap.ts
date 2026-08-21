import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { divisions } from "@/lib/data/divisions";
import { posts } from "@/lib/data/posts";
import { products } from "@/lib/data/products";

/**
 * Every publicly indexable route.
 *
 * Account, checkout, and search routes are deliberately absent — they are
 * per-visitor or transactional, and robots.ts disallows them. Priority ranks
 * the corporate story above commerce because that is what the Group is here
 * to communicate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  interface Entry {
    path: string;
    priority: number;
    changeFrequency: "yearly" | "monthly" | "weekly";
    lastModified?: Date;
  }

  const corporate: Entry[] = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/group/investors", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/careers", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const divisionRoutes: Entry[] = divisions.map((d) => ({
    path: d.href,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  const divisionSubRoutes: Entry[] = [
    "/media/booking",
    "/trade/inquiry",
    "/wine-resort/experiences",
    "/wine-resort/dining",
    "/wine-resort/events",
    "/wine-resort/gallery",
  ].map((path) => ({ path, priority: 0.6, changeFrequency: "monthly" as const }));

  const journal: Entry[] = posts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.5,
    changeFrequency: "yearly" as const,
    lastModified: new Date(p.date),
  }));

  const collection: Entry[] = products.map((p) => ({
    path: `/wear/product/${p.slug}`,
    priority: 0.5,
    changeFrequency: "monthly" as const,
  }));

  return [...corporate, ...divisionRoutes, ...divisionSubRoutes, ...journal, ...collection].map(
    (entry) => ({
      url: `${base}${entry.path}`,
      lastModified: entry.lastModified ?? now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })
  );
}
