/**
 * Seeds the live Supabase project with the content already published in
 * lib/data/*.ts, so the transactional flows (wishlist, careers applications,
 * wine-resort bookings) have real rows to reference. Row ids are deterministic
 * (see lib/ids.ts) so re-running this is idempotent -- it always upserts the
 * same ids for the same slugs.
 *
 * Usage: node --env-file=.env.local scripts/seed.mts
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.ts";
import { products } from "../lib/data/products.ts";
import { sanctuaries, experiences } from "../lib/data/resort.ts";
import { commodities } from "../lib/data/trade.ts";
import { jobs } from "../lib/data/jobs.ts";
import {
  productId,
  productVariantId,
  sanctuaryId,
  experienceId,
  jobPostingId,
  commodityId,
} from "../lib/ids.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set -- run with --env-file=.env.local"
  );
}

const supabase = createClient<Database>(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function parseCapacity(occupancy: string): number {
  const match = occupancy.match(/\d+/);
  return match ? parseInt(match[0], 10) : 2;
}

async function seedProducts() {
  const rows = products.map((p) => ({
    id: productId(p.slug),
    slug: p.slug,
    name: p.name,
    description: p.description,
    price_cents: Math.round(p.price * 100),
    currency: "USD",
    category: p.category,
    images: [] as string[],
    is_published: true,
  }));
  const { error } = await supabase.from("products").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`products: ${error.message}`);
  console.log(`Seeded ${rows.length} products`);

  const variantRows = products.flatMap((p) =>
    p.sizes.map((size) => ({
      id: productVariantId(p.slug, size),
      product_id: productId(p.slug),
      size,
      color: p.colorway,
      sku: `${p.slug}-${size}`.toUpperCase(),
      stock_quantity: 25,
    }))
  );
  const { error: variantError } = await supabase
    .from("product_variants")
    .upsert(variantRows, { onConflict: "id" });
  if (variantError) throw new Error(`product_variants: ${variantError.message}`);
  console.log(`Seeded ${variantRows.length} product variants`);
}

async function seedResort() {
  const sanctuaryRows = sanctuaries.map((s) => ({
    id: sanctuaryId(s.slug),
    slug: s.slug,
    name: s.name,
    description: s.tagline,
    images: [] as string[],
    base_price_cents: Math.round(s.rate * 100),
    capacity: parseCapacity(s.occupancy),
    is_published: true,
  }));
  const { error } = await supabase.from("sanctuaries").upsert(sanctuaryRows, { onConflict: "id" });
  if (error) throw new Error(`sanctuaries: ${error.message}`);
  console.log(`Seeded ${sanctuaryRows.length} sanctuaries`);

  const experienceRows = experiences.map((e) => ({
    id: experienceId(e.slug),
    sanctuary_id: null,
    name: e.name,
    description: e.description,
    price_cents: Math.round(e.price * 100),
    is_published: true,
  }));
  const { error: expError } = await supabase.from("experiences").upsert(experienceRows, { onConflict: "id" });
  if (expError) throw new Error(`experiences: ${expError.message}`);
  console.log(`Seeded ${experienceRows.length} experiences`);
}

async function seedJobs() {
  const rows = jobs.map((j) => ({
    id: jobPostingId(j.id),
    title: j.title,
    department: j.division,
    location: j.location,
    employment_type: j.type,
    description: j.summary,
    is_published: true,
  }));
  const { error } = await supabase.from("job_postings").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`job_postings: ${error.message}`);
  console.log(`Seeded ${rows.length} job postings`);
}

async function seedCommodities() {
  const rows = commodities.map((c) => ({
    id: commodityId(c.id),
    slug: c.id,
    name: c.name,
    description: c.description,
    category: c.grade,
    images: [] as string[],
    is_published: true,
  }));
  const { error } = await supabase.from("commodities").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`commodities: ${error.message}`);
  console.log(`Seeded ${rows.length} commodities`);
}

async function main() {
  await seedProducts();
  await seedResort();
  await seedJobs();
  await seedCommodities();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
