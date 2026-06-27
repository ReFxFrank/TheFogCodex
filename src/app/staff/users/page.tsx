import type { Metadata } from "next";
import { requireStaff, listUsers } from "@/lib/staff";
import { EmptyState } from "@/components/app/empty-state";
import { StaffUserRow } from "@/components/app/staff-user-row";

export const metadata: Metadata = { title: "Staff — Users" };

export default async function StaffUsersPage() {
  // Layout already gates access; this is belt-and-braces.
  const actor = await requireStaff("moderator");
  if (!actor) return null;

  const users = await listUsers();

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-lg font-semibold text-ink">Users</h2>
        <p className="text-sm text-ink-3">
          {users.length} accounts.{" "}
          {actor.role === "admin"
            ? "You can change roles, ban, and delete."
            : "You can ban regular users."}
        </p>
      </div>

      {users.length === 0 ? (
        <EmptyState title="No users yet" message="Accounts will show up here once people sign in." />
      ) : (
        <div className="flex flex-col gap-3">
          {users.map((u) => (
            <StaffUserRow key={u.id} user={u} actorId={actor.id} actorRole={actor.role} />
          ))}
        </div>
      )}
    </div>
  );
}
