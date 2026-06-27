"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Ban, ShieldOff, Trash2 } from "lucide-react";
import {
  setUserRole,
  setUserBanned,
  deleteUserAsStaff,
} from "@/app/actions/staff";
import { rankOf, ROLE_LABEL } from "@/lib/permissions";
import { STAFF_ROLES, type StaffRole } from "@/types";
import type { StaffUserRow as Row } from "@/lib/staff";
import { AuthorChip } from "./author-chip";

interface Props {
  user: Row;
  actorId: string;
  actorRole: StaffRole;
}

const ROLE_COLOR: Record<StaffRole, string> = {
  admin: "border-gold/40 bg-gold/10 text-gold",
  moderator: "border-tier-b/40 bg-tier-b/10 text-tier-b",
  user: "border-white/10 text-ink-3",
};

export function StaffUserRow({ user, actorId, actorRole }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isSelf = user.id === actorId;
  const canManage = !isSelf && rankOf(user.role) < rankOf(actorRole);
  const isAdminActor = actorRole === "admin";

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Something went wrong.");
      else router.refresh();
    });
  }

  function onBanToggle() {
    if (user.banned) {
      run(() => setUserBanned(user.id, false));
    } else {
      const reason = window.prompt("Reason for the ban (optional):") ?? undefined;
      run(() => setUserBanned(user.id, true, reason));
    }
  }

  function onDelete() {
    if (!window.confirm(`Delete ${user.name ?? user.email}? This removes their builds and comments too.`))
      return;
    run(() => deleteUserAsStaff(user.id));
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl glass p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <AuthorChip name={user.name} image={user.image} size="md" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm text-ink-2">{user.email ?? "—"}</span>
            {user.banned && (
              <span className="inline-flex items-center gap-1 rounded-md border border-killer/40 bg-killer/10 px-1.5 py-0.5 text-[10px] font-medium text-killer">
                <Ban className="h-3 w-3" />
                Banned
              </span>
            )}
          </div>
          <p className="text-[11px] text-ink-3">
            {user.buildCount} builds · {user.commentCount} comments
            {user.bannedReason ? ` · ${user.bannedReason}` : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isAdminActor && !isSelf ? (
          <select
            value={user.role}
            disabled={pending}
            onChange={(e) => run(() => setUserRole(user.id, e.target.value as StaffRole))}
            aria-label={`Role for ${user.name ?? user.email}`}
            className="rounded-lg border border-white/10 bg-fog-800/60 px-2 py-1.5 text-xs text-ink outline-none focus-visible:border-accent"
          >
            {STAFF_ROLES.map((r) => (
              <option key={r} value={r} className="bg-fog-800">
                {ROLE_LABEL[r]}
              </option>
            ))}
          </select>
        ) : (
          <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${ROLE_COLOR[user.role]}`}>
            {ROLE_LABEL[user.role]}
          </span>
        )}

        {canManage && (
          <button
            type="button"
            onClick={onBanToggle}
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-ink-2 transition-colors hover:border-killer/50 hover:text-killer"
          >
            {user.banned ? <ShieldOff className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
            {user.banned ? "Unban" : "Ban"}
          </button>
        )}

        {isAdminActor && canManage && (
          <button
            type="button"
            onClick={onDelete}
            disabled={pending}
            aria-label="Delete user"
            className="rounded-lg border border-white/10 p-1.5 text-ink-3 transition-colors hover:border-killer/50 hover:text-killer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {error && <p className="w-full text-right text-xs text-killer">{error}</p>}
    </div>
  );
}
