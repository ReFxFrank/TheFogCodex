import type { Metadata } from "next";
import Link from "next/link";
import { listCommunityBuilds } from "@/lib/community";
import { requireStaff } from "@/lib/staff";
import { titleCase } from "@/lib/utils";
import { EmptyState } from "@/components/app/empty-state";
import { AuthorChip } from "@/components/app/author-chip";
import { StaffDeleteButton } from "@/components/app/staff-delete-button";

export const metadata: Metadata = { title: "Staff — Builds" };

export default async function StaffBuildsPage() {
  if (!(await requireStaff("moderator"))) return null;
  const builds = await listCommunityBuilds();

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-lg font-semibold text-ink">Community builds</h2>
        <p className="text-sm text-ink-3">{builds.length} published.</p>
      </div>

      {builds.length === 0 ? (
        <EmptyState title="No community builds" message="Nothing's been published yet." />
      ) : (
        <div className="flex flex-col gap-3">
          {builds.map(({ build, authorName, authorImage, avgRating, ratingCount }) => (
            <div
              key={build.id}
              data-role={build.role}
              className="flex flex-col gap-3 rounded-2xl glass p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/community/${build.id}`}
                    className="truncate font-display text-base font-semibold text-ink hover:text-accent"
                  >
                    {build.title}
                  </Link>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-accent">
                    {build.role}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-ink-3">
                  <AuthorChip name={authorName} image={authorImage} />
                  <span>
                    {ratingCount > 0 ? `★ ${avgRating.toFixed(1)} (${ratingCount})` : "unrated"}
                  </span>
                  {build.archetypes.slice(0, 2).map((a) => (
                    <span key={a}>· {titleCase(a)}</span>
                  ))}
                </div>
              </div>
              <StaffDeleteButton kind="build" id={build.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
