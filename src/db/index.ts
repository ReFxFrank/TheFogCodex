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
// Why the tuning below: opening a *new* backend connection can be
// slow on some hosts (e.g. a server-side reverse-DNS lookup during
// auth stalling on a bad resolver). The default pool reaps idle
// connections after 10s, so an idle site re-pays that cold-connect
// on the next visit. We instead keep connections warm, pre-warm a
// few at boot (warmupDb, called from instrumentation), and run a
// heartbeat so the pool self-heals after a Postgres restart — the
// expensive first-connect is never paid on a user's request.
// ============================================================

const globalForDb = globalThis as unknown as {
  __fogPool?: Pool;
  __fogHeartbeat?: ReturnType<typeof setInterval>;
};

function createPool(): Pool {
  const p = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000, // start TCP keepalive probes early, not after the OS default ~2h
    idleTimeoutMillis: 0, // don't reap; the heartbeat keeps connections fresh
    connectionTimeoutMillis: 30_000, // bound a truly-hung connect instead of waiting forever
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

/**
 * Pre-open a few connections so the first page render — including the
 * community list, which fans out to 2–3 concurrent queries — is served
 * warm, and start a heartbeat that keeps a connection alive and re-warms
 * the pool after any disruption (Postgres restart, server-side timeout).
 * Safe to call more than once; the heartbeat is started at most once.
 */
export async function warmupDb(): Promise<void> {
  try {
    await Promise.all([
      pool.query("select 1"),
      pool.query("select 1"),
      pool.query("select 1"),
    ]);
  } catch (err) {
    // Non-fatal: the app degrades gracefully if the DB is unreachable.
    console.error("[db] warmup failed:", (err as Error).message);
  }

  if (!globalForDb.__fogHeartbeat) {
    const t = setInterval(() => {
      pool.query("select 1").catch(() => {
        /* a dead client is logged + removed by the pool 'error' handler */
      });
    }, 45_000);
    // Don't let the heartbeat keep the process alive on shutdown.
    t.unref?.();
    globalForDb.__fogHeartbeat = t;
  }
}
