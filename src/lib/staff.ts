import "server-only";
import { desc, eq, inArray, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { users, communityBuilds, comments, ratings, reports } from "@/db/schema";
import { atLeast } from "@/lib/permissions";
import type { ReportTarget, StaffRole } from "@/types";

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
  const [u, b, c, r, banned, openReports] = await Promise.all([
    db.select({ n: sql<string>`count(*)` }).from(users),
    db.select({ n: sql<string>`count(*)` }).from(communityBuilds),
    db.select({ n: sql<string>`count(*)` }).from(comments),
    db.select({ n: sql<string>`count(*)` }).from(ratings),
    db.select({ n: sql<string>`count(*)` }).from(users).where(eq(users.banned, true)),
    db.select({ n: sql<string>`count(*)` }).from(reports).where(eq(reports.status, "open")),
  ]);
  return {
    users: Number(u[0]?.n ?? 0),
    builds: Number(b[0]?.n ?? 0),
    comments: Number(c[0]?.n ?? 0),
    ratings: Number(r[0]?.n ?? 0),
    banned: Number(banned[0]?.n ?? 0),
    openReports: Number(openReports[0]?.n ?? 0),
  };
}

export interface StaffReportRow {
  id: string;
  targetType: ReportTarget;
  targetId: string;
  reason: string;
  reporterName: string | null;
  createdAt: Date;
  /** Build title or comment snippet, or a "(deleted …)" marker. */
  targetLabel: string;
  /** Build id to link the report to (null if the content is gone). */
  buildId: string | null;
  exists: boolean;
}

/** Open reports, newest first, enriched with the reported content's context. */
export async function listReports(): Promise<StaffReportRow[]> {
  const rows = await db
    .select({
      id: reports.id,
      targetType: reports.targetType,
      targetId: reports.targetId,
      reason: reports.reason,
      createdAt: reports.createdAt,
      reporterName: users.name,
    })
    .from(reports)
    .leftJoin(users, eq(reports.reporterId, users.id))
    .where(eq(reports.status, "open"))
    .orderBy(desc(reports.createdAt));

  const buildIds = rows.filter((r) => r.targetType === "build").map((r) => r.targetId);
  const commentIds = rows.filter((r) => r.targetType === "comment").map((r) => r.targetId);

  const [buildRows, commentRows] = await Promise.all([
    buildIds.length
      ? db
          .select({ id: communityBuilds.id, title: communityBuilds.title })
          .from(communityBuilds)
          .where(inArray(communityBuilds.id, buildIds))
      : Promise.resolve([] as { id: string; title: string }[]),
    commentIds.length
      ? db
          .select({ id: comments.id, body: comments.body, buildId: comments.buildId })
          .from(comments)
          .where(inArray(comments.id, commentIds))
      : Promise.resolve([] as { id: string; body: string; buildId: string }[]),
  ]);

  const bMap = new Map(buildRows.map((b) => [b.id, b]));
  const cMap = new Map(commentRows.map((c) => [c.id, c]));

  return rows.map((r) => {
    if (r.targetType === "build") {
      const b = bMap.get(r.targetId);
      return {
        ...r,
        targetType: "build" as ReportTarget,
        targetLabel: b ? b.title : "(deleted build)",
        buildId: b?.id ?? null,
        exists: Boolean(b),
      };
    }
    const c = cMap.get(r.targetId);
    return {
      ...r,
      targetType: "comment" as ReportTarget,
      targetLabel: c ? `“${c.body.slice(0, 100)}${c.body.length > 100 ? "…" : ""}”` : "(deleted comment)",
      buildId: c?.buildId ?? null,
      exists: Boolean(c),
    };
  });
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
