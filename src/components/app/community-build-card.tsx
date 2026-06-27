import Link from "next/link";
import { ArrowUpRight, MessageSquare, Star } from "lucide-react";
import type { CommunityBuildSummary } from "@/lib/community";
import type { Role } from "@/types";
import { titleCase } from "@/lib/utils";
import { LoadoutRow } from "./loadout-row";
import { DifficultyDots } from "./difficulty-dots";
import { AuthorChip } from "./author-chip";

export function CommunityBuildCard({ summary }: { summary: CommunityBuildSummary }) {
  const b = summary.build;
  const role = b.role as Role;

  return (
    <Link
      href={`/community/${b.id}`}
      data-role={role}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <DifficultyDots difficulty={b.difficulty as never} />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            {role}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1" title="Average rating">
            <Star
              className={`h-3.5 w-3.5 ${summary.ratingCount > 0 ? "fill-gold text-gold" : "text-ink-3"}`}
            />
            {summary.ratingCount > 0 ? summary.avgRating.toFixed(1) : "—"}
          </span>
          <span className="inline-flex items-center gap-1" title="Comments">
            <MessageSquare className="h-3.5 w-3.5" />
            {summary.commentCount}
          </span>
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold leading-tight text-ink">
        {b.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-ink-2">{b.summary}</p>

      <div className="my-4">
        <LoadoutRow perkSlugs={b.perkSlugs} role={role} size="sm" linked={false} />
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <AuthorChip name={summary.authorName} image={summary.authorImage} />
        <div className="flex items-center gap-2">
          {b.archetypes.slice(0, 1).map((a) => (
            <span
              key={a}
              className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-ink-3"
            >
              {titleCase(a)}
            </span>
          ))}
          <ArrowUpRight className="h-4 w-4 text-ink-3 transition-colors group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
}
