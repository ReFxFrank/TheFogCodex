import type { StaffRole } from "@/types";

// ============================================================
// Role-based permissions.
// Hierarchy: user (0) < moderator (1) < admin (2) < owner (3).
// Owner is the top authority — only an owner can act on an admin.
// ============================================================

export const ROLE_RANK: Record<StaffRole, number> = {
  user: 0,
  moderator: 1,
  admin: 2,
  owner: 3,
};

export function rankOf(role: string | null | undefined): number {
  return ROLE_RANK[(role as StaffRole) ?? "user"] ?? 0;
}

/** True when `role` is at least `min` in the hierarchy. */
export function atLeast(role: string | null | undefined, min: StaffRole): boolean {
  return rankOf(role) >= ROLE_RANK[min];
}

/** Moderator or admin. */
export function isStaff(role: string | null | undefined): boolean {
  return atLeast(role, "moderator");
}

/** Admin or owner. */
export function isAdmin(role: string | null | undefined): boolean {
  return atLeast(role, "admin");
}

/** The single top authority. */
export function isOwner(role: string | null | undefined): boolean {
  return atLeast(role, "owner");
}

export const ROLE_LABEL: Record<StaffRole, string> = {
  user: "User",
  moderator: "Moderator",
  admin: "Admin",
  owner: "Owner",
};
