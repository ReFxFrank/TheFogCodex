import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

// Lightweight liveness/readiness probe for uptime monitoring.
// Always 200 if the app is up; the body reports whether the DB is reachable.
export const dynamic = "force-dynamic";

export async function GET() {
  let database = "down";
  try {
    await db.execute(sql`select 1`);
    database = "up";
  } catch {
    /* DB unreachable — reported in the body, app is still alive */
  }

  return NextResponse.json(
    { ok: true, database, time: new Date().toISOString() },
    { status: 200, headers: { "cache-control": "no-store" } },
  );
}
