"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, communityBuilds, comments } from "@/db/schema";
import { requireStaff } from "@/lib/staff";
import { rankOf } from "@/lib/permissions";
import { STAFF_ROLES, type StaffRole } from "@/types";

type Result = { ok: true } | { ok: false; error: string };

async function getTargetRole(id: string): Promise<StaffRole | null> {
  const rows = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  if (rows.length === 0) return null;
  return (rows[0].role as StaffRole) ?? "user";
}

/** Change a user's staff role. Admin+; can't change your own. */
export async function setUserRole(
  targetId: string,
  newRole: StaffRole,
): Promise<Result> {
  const actor = await requireStaff("admin");
  if (!actor) return { ok: false, error: "Admin access required." };
  if (!STAFF_ROLES.includes(newRole)) return { ok: false, error: "Invalid role." };
  if (targetId === actor.id)
    return { ok: false, error: "You can't change your own role." };
  const targetRole = await getTargetRole(targetId);
  if (!targetRole) return { ok: false, error: "User not found." };
  // Can't change the role of a peer/superior (also blocks the
  // demote-then-delete bypass of the "can't delete a peer" rule).
  if (rankOf(targetRole) >= rankOf(actor.role))
    return { ok: false, error: "You can't change the role of someone at or above your own rank." };
  // Can't grant a role above your own — an admin must not be able to mint an owner.
  if (rankOf(newRole) > rankOf(actor.role))
    return { ok: false, error: "You can't grant a role above your own." };

  await db.update(users).set({ role: newRole }).where(eq(users.id, targetId));
  revalidatePath("/staff/users");
  return { ok: true };
}

/** Ban or unban a user. Moderator+; can only act on someone below your role. */
export async function setUserBanned(
  targetId: string,
  banned: boolean,
  reason?: string,
): Promise<Result> {
  const actor = await requireStaff("moderator");
  if (!actor) return { ok: false, error: "Staff access required." };
  if (targetId === actor.id) return { ok: false, error: "You can't ban yourself." };
  const targetRole = await getTargetRole(targetId);
  if (!targetRole) return { ok: false, error: "User not found." };
  if (rankOf(targetRole) >= rankOf(actor.role))
    return { ok: false, error: "You can't moderate someone at or above your own role." };

  await db
    .update(users)
    .set({ banned, bannedReason: banned ? reason?.trim() || null : null })
    .where(eq(users.id, targetId));
  revalidatePath("/staff/users");
  return { ok: true };
}

/** Delete any community build. Moderator+. */
export async function deleteBuildAsStaff(buildId: string): Promise<Result> {
  const actor = await requireStaff("moderator");
  if (!actor) return { ok: false, error: "Staff access required." };
  await db.delete(communityBuilds).where(eq(communityBuilds.id, buildId));
  revalidatePath("/staff/builds");
  revalidatePath("/community");
  return { ok: true };
}

/** Delete any comment. Moderator+. */
export async function deleteCommentAsStaff(commentId: string): Promise<Result> {
  const actor = await requireStaff("moderator");
  if (!actor) return { ok: false, error: "Staff access required." };
  await db.delete(comments).where(eq(comments.id, commentId));
  revalidatePath("/staff/comments");
  return { ok: true };
}

/** Delete a user account (cascades their builds/comments). Admin+. */
export async function deleteUserAsStaff(targetId: string): Promise<Result> {
  const actor = await requireStaff("admin");
  if (!actor) return { ok: false, error: "Admin access required." };
  if (targetId === actor.id)
    return { ok: false, error: "You can't delete your own account from here." };
  const targetRole = await getTargetRole(targetId);
  if (!targetRole) return { ok: false, error: "User not found." };
  // Only someone strictly above the target may delete them — so admins can't
  // delete admins/owners, but an owner can remove an admin.
  if (rankOf(targetRole) >= rankOf(actor.role))
    return { ok: false, error: "You can't delete someone at or above your own rank." };

  await db.delete(users).where(eq(users.id, targetId));
  revalidatePath("/staff/users");
  revalidatePath("/community");
  return { ok: true };
}
