import type { Metadata } from "next";
import Link from "next/link";
import { requireStaff, listAllComments } from "@/lib/staff";
import { EmptyState } from "@/components/app/empty-state";
import { AuthorChip } from "@/components/app/author-chip";
import { StaffDeleteButton } from "@/components/app/staff-delete-button";

export const metadata: Metadata = { title: "Staff — Comments" };

export default async function StaffCommentsPage() {
  if (!(await requireStaff("moderator"))) return null;
  const comments = await listAllComments();

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-lg font-semibold text-ink">Recent comments</h2>
        <p className="text-sm text-ink-3">Newest first ({comments.length}).</p>
      </div>

      {comments.length === 0 ? (
        <EmptyState title="No comments yet" message="Nothing's been posted yet." />
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex flex-col gap-3 rounded-2xl glass p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-3">
                  <AuthorChip name={c.authorName} image={null} />
                  <span>on</span>
                  <Link href={`/community/${c.buildId}`} className="text-accent hover:underline">
                    {c.buildTitle ?? "a build"}
                  </Link>
                </div>
                <p className="mt-1.5 whitespace-pre-wrap text-sm text-ink-2">{c.body}</p>
              </div>
              <StaffDeleteButton kind="comment" id={c.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
