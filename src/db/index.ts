import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// ============================================================
// Postgres connection (node-postgres + Drizzle).
//
// A single pool is reused across hot reloads in development.
// The pool is created lazily — no connection is opened until the
// first query runs, so `next build` never needs a live database.
//
// Pool tuning matters here: the default pg pool closes idle
// connections after 10s, so a site that sits idle re-pays the
// (sometimes slow) cold-connect on the next visit. We keep the
// connection warm instead, and pre-warm it at boot via
// `warmupDb()` (called from instrumentation) so the first real
// visitor never eats the connection latency.
// ============================================================

const globalForDb = globalThis as unknown as { __fogPool?: Pool };

function createPool(): Pool {
  const p = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    keepAlive: true, // OS-level TCP keepalive so the socket isn't silently dropped
    idleTimeoutMillis: 0, // never let the pool reap the warm connection
  });
  // A pool MUST have an error handler — otherwise a dead idle client
  // (e.g. after a Postgres restart) throws and takes the process down.
  p.on("error", (err) => {
    console.error("[db] idle client error:", err.message);
  });
  return p;
}

const pool = globalForDb.__fogPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__fogPool = pool;
}

export const db = drizzle(pool, { schema });
export { schema };

/** Open (and keep) one connection so the first user request is already warm. */
export async function warmupDb(): Promise<void> {
  try {
    await pool.query("select 1");
  } catch (err) {
    // Non-fatal: the app degrades gracefully if the DB is unreachable.
    console.error("[db] warmup failed:", (err as Error).message);
  }
}
