import { createHash } from "crypto";

/**
 * Fixed, arbitrary namespace for this project's deterministic IDs. Never
 * change this constant -- every derived ID (products, sanctuaries,
 * experiences, job postings, ...) shifts if it does.
 */
const NAMESPACE = "7b3e1c2a-4f8b-4a6e-9c3d-2f6a8b1e5d40";

/**
 * UUIDv5(name) under the fixed NAMESPACE above. Lets the static content in
 * lib/data/*.ts and the Supabase rows seeded from it (scripts/seed.mjs) agree
 * on a row's id from its slug alone, with no DB round-trip and no extra
 * mapping table. Server-only (Node `crypto`) -- call from route handlers and
 * server components, never from Client Components.
 */
export function deterministicId(name: string): string {
  const nsBytes = Buffer.from(NAMESPACE.replace(/-/g, ""), "hex");
  const nameBytes = Buffer.from(name, "utf8");
  const hash = createHash("sha1").update(Buffer.concat([nsBytes, nameBytes])).digest();
  const bytes = Buffer.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x50; // version 5
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant RFC 4122
  const hex = bytes.toString("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join("-");
}

export const productId = (slug: string) => deterministicId(`product:${slug}`);
export const productVariantId = (slug: string, size: string) =>
  deterministicId(`variant:${slug}:${size}`);
export const sanctuaryId = (slug: string) => deterministicId(`sanctuary:${slug}`);
export const experienceId = (slug: string) => deterministicId(`experience:${slug}`);
export const jobPostingId = (slug: string) => deterministicId(`job:${slug}`);
export const commodityId = (slug: string) => deterministicId(`commodity:${slug}`);
