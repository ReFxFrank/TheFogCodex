// Next.js runs this once when the server process starts.
// We use it to pre-warm the Postgres pool so the first request to a
// dynamic page (/community, /login, /profile) doesn't pay the
// cold-connection latency.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { warmupDb } = await import("@/db");
    await warmupDb();
  }
}
