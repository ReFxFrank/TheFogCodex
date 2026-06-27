import "server-only";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { communityBuilds, comments, ratings, users } from "@/db/schema";
import type { CommunityBuildRow } from "@/db/schema";

// ============================================================
// Server-only read helpers for the community layer.
// Aggregates (avg rating, counts) are computed with grouped
// queries and merged in memory.
// ============================================================

export interface CommunityBuildSummary {
  build: CommunityBuildRow;
  authorName: string | null;
  authorImage: string | null;
  avgRating: number;
  ratingCount: number;
  commentCount: number;
}

async function ratingMap() {
  const rows = await db
    .select({
      buildId: ratings.buildId,
      avg: sql<string>`avg(${ratings.value})`,
      count: sql<string>`count(*)`,
    })
    .from(ratings)
    .groupBy(ratings.buildId);
  const map = new Map<string, { avg: number; count: number }>();
  for (const r of rows) {
    map.set(r.buildId, { avg: Number(r.avg), count: Number(r.count) });
  }
  return map;
}

async function commentCountMap() {
  const rows = await db
    .select({ buildId: comments.buildId, count: sql<string>`count(*)` })
    .from(comments)
    .groupBy(comments.buildId);
  const map = new Map<string, number>();
  for (const r of rows) map.set(r.buildId, Number(r.count));
  return map;
}

function summarize(
  rows: { build: CommunityBuildRow; authorName: string | null; authorImage: string | null }[],
  rMap: Map<string, { avg: number; count: number }>,
  cMap: Map<string, number>,
): CommunityBuildSummary[] {
  return rows.map((r) => {
    const rating = rMap.get(r.build.id);
    return {
      build: r.build,
      authorName: r.authorName,
      authorImage: r.authorImage,
      avgRating: rating?.avg ?? 0,
      ratingCount: rating?.count ?? 0,
      commentCount: cMap.get(r.build.id) ?? 0,
    };
  });
}

export async function listCommunityBuilds(opts?: {
  role?: "survivor" | "killer";
  sort?: "recent" | "top";
}): Promise<CommunityBuildSummary[]> {
  const where = opts?.role ? eq(communityBuilds.role, opts.role) : undefined;
  const rows = await db
    .select({
      build: communityBuilds,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(communityBuilds)
    .leftJoin(users, eq(communityBuilds.authorId, users.id))
    .where(where)
    .orderBy(desc(communityBuilds.createdAt));

  const [rMap, cMap] = await Promise.all([ratingMap(), commentCountMap()]);
  const summaries = summarize(rows, rMap, cMap);

  if (opts?.sort === "top") {
    summaries.sort(
      (a, b) => b.avgRating - a.avgRating || b.ratingCount - a.ratingCount,
    );
  }
  return summaries;
}

export async function getCommunityBuild(
  id: string,
): Promise<CommunityBuildSummary | null> {
  const rows = await db
    .select({
      build: communityBuilds,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(communityBuilds)
    .leftJoin(users, eq(communityBuilds.authorId, users.id))
    .where(eq(communityBuilds.id, id))
    .limit(1);
  if (rows.length === 0) return null;
  const [rMap, cMap] = await Promise.all([ratingMap(), commentCountMap()]);
  return summarize(rows, rMap, cMap)[0];
}

export async function getRatingSummary(buildId: string, userId?: string) {
  const agg = await db
    .select({
      avg: sql<string>`coalesce(avg(${ratings.value}), 0)`,
      count: sql<string>`count(*)`,
    })
    .from(ratings)
    .where(eq(ratings.buildId, buildId));

  let userValue: number | null = null;
  if (userId) {
    const own = await db
      .select({ value: ratings.value })
      .from(ratings)
      .where(and(eq(ratings.buildId, buildId), eq(ratings.userId, userId)))
      .limit(1);
    userValue = own[0]?.value ?? null;
  }

  return {
    avg: Number(agg[0]?.avg ?? 0),
    count: Number(agg[0]?.count ?? 0),
    userValue,
  };
}

export interface CommentWithAuthor {
  id: string;
  body: string;
  createdAt: Date;
  userId: string;
  authorName: string | null;
  authorImage: string | null;
}

export async function getComments(buildId: string): Promise<CommentWithAuthor[]> {
  return db
    .select({
      id: comments.id,
      body: comments.body,
      createdAt: comments.createdAt,
      userId: comments.userId,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.buildId, buildId))
    .orderBy(desc(comments.createdAt));
}

export async function getUserBuilds(
  userId: string,
): Promise<CommunityBuildSummary[]> {
  const rows = await db
    .select({
      build: communityBuilds,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(communityBuilds)
    .leftJoin(users, eq(communityBuilds.authorId, users.id))
    .where(eq(communityBuilds.authorId, userId))
    .orderBy(desc(communityBuilds.createdAt));
  const [rMap, cMap] = await Promise.all([ratingMap(), commentCountMap()]);
  return summarize(rows, rMap, cMap);
}
