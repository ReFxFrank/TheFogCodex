// Next.js runs this once when the server process starts.
//
// We use it to (1) evaluate the shared auth + db module graph up front, so
// the first dynamic request doesn't pay one-time init, and (2) pre-warm the
// Postgres pool so the first visitor to /community, /login or /profile
// doesn't eat the cold-connection latency. Pool warming runs in the
// background — server boot is never gated on the database being reachable.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const [db] = await Promise.all([import("@/db"), import("@/auth")]);
    void db.warmupDb();
  }
}
