import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// ============================================================
// Postgres connection (node-postgres + Drizzle).
// A single pool is reused across hot reloads in development.
// The pool is created lazily — no connection is opened until the
// first query runs, so `next build` never needs a live database.
// ============================================================

const globalForDb = globalThis as unknown as { __fogPool?: Pool };

const pool =
  globalForDb.__fogPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__fogPool = pool;
}

export const db = drizzle(pool, { schema });
export { schema };
