import "server-only";
import { desc, eq, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { users, communityBuilds, comments, ratings } from "@/db/schema";
import { atLeast } from "@/lib/permissions";
import type { StaffRole } from "@/types";

// ============================================================
// Server-only staff/moderation reads + the access guard.
// ============================================================

export interface StaffSessionUser {
  id: string;
  name: string | null;
  email: string | null;
  role: StaffRole;
}

/** Returns the current user if they meet `min`, are not banned, else null. */
export async function requireStaff(
  min: StaffRole = "moderator",
): Promise<StaffSessionUser | null> {
  const session = await auth();
  const u = session?.user;
  if (!u?.id || u.banned) return null;
  if (!atLeast(u.role, min)) return null;
  return { id: u.id, name: u.name ?? null, email: u.email ?? null, role: u.role };
}

export async function getStaffStats() {
  const [u, b, c, r, banned] = await Promise.all([
    db.select({ n: sql<string>`count(*)` }).from(users),
    db.select({ n: sql<string>`count(*)` }).from(communityBuilds),
    db.select({ n: sql<string>`count(*)` }).from(comments),
    db.select({ n: sql<string>`count(*)` }).from(ratings),
    db.select({ n: sql<string>`count(*)` }).from(users).where(eq(users.banned, true)),
  ]);
  return {
    users: Number(u[0]?.n ?? 0),
    builds: Number(b[0]?.n ?? 0),
    comments: Number(c[0]?.n ?? 0),
    ratings: Number(r[0]?.n ?? 0),
    banned: Number(banned[0]?.n ?? 0),
  };
}

export interface StaffUserRow {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: StaffRole;
  banned: boolean;
  bannedReason: string | null;
  buildCount: number;
  commentCount: number;
}

export async function listUsers(): Promise<StaffUserRow[]> {
  const [rows, buildCounts, commentCounts] = await Promise.all([
    db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        role: users.role,
        banned: users.banned,
        bannedReason: users.bannedReason,
      })
      .from(users),
    db
      .select({ authorId: communityBuilds.authorId, n: sql<string>`count(*)` })
      .from(communityBuilds)
      .groupBy(communityBuilds.authorId),
    db
      .select({ userId: comments.userId, n: sql<string>`count(*)` })
      .from(comments)
      .groupBy(comments.userId),
  ]);

  const bMap = new Map(buildCounts.map((x) => [x.authorId, Number(x.n)]));
  const cMap = new Map(commentCounts.map((x) => [x.userId, Number(x.n)]));

  const RANK: Record<string, number> = { owner: 0, admin: 1, moderator: 2, user: 3 };
  return rows
    .map((u) => ({
      ...u,
      role: (u.role as StaffRole) ?? "user",
      buildCount: bMap.get(u.id) ?? 0,
      commentCount: cMap.get(u.id) ?? 0,
    }))
    .sort(
      (a, b) =>
        (RANK[a.role] ?? 3) - (RANK[b.role] ?? 3) ||
        (a.name ?? a.email ?? "").localeCompare(b.name ?? b.email ?? ""),
    );
}

export interface StaffCommentRow {
  id: string;
  body: string;
  createdAt: Date;
  buildId: string;
  buildTitle: string | null;
  authorName: string | null;
}

export async function listAllComments(limit = 200): Promise<StaffCommentRow[]> {
  return db
    .select({
      id: comments.id,
      body: comments.body,
      createdAt: comments.createdAt,
      buildId: comments.buildId,
      buildTitle: communityBuilds.title,
      authorName: users.name,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .leftJoin(communityBuilds, eq(comments.buildId, communityBuilds.id))
    .orderBy(desc(comments.createdAt))
    .limit(limit);
}
