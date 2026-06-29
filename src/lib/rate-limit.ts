import "server-only";
import { headers } from "next/headers";

// ============================================================
// Tiny in-memory rate limiter (single-instance / pm2-friendly).
// Not distributed — fine for one Node process. For multi-instance,
// swap the Map for Redis/Upstash.
// ============================================================

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/** Best-effort client IP behind Cloudflare/Nginx. */
export async function clientIp(): Promise<string> {
  try {
    const h = await headers();
    return (
      h.get("cf-connecting-ip") ??
      h.get("x-real-ip") ??
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown"
    );
  } catch {
    return "unknown";
  }
}

/** Returns true if the action is allowed; false if the limit is exceeded. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded.
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (now > b.resetAt) buckets.delete(k);
  }

  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= max) return false;
  b.count++;
  return true;
}
