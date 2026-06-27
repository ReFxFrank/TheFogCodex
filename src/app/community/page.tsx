import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { listCommunityBuilds } from "@/lib/community";
import { PageHeader } from "@/components/app/page-header";
import { CommunityBuildCard } from "@/components/app/community-build-card";
import { EmptyState } from "@/components/app/empty-state";
import { Button } from "@/components/ui/button";
import type { Role } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community Builds",
  description:
    "Builds created and shared by the community — rate them, comment, and submit your own.",
};

const ROLE_TABS: { value: Role | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "survivor", label: "Survivor" },
  { value: "killer", label: "Killer" },
];

const SORT_TABS = [
  { value: "recent", label: "Newest" },
  { value: "top", label: "Top rated" },
];

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const role: Role | undefined =
    sp.role === "survivor" || sp.role === "killer" ? sp.role : undefined;
  const sort = sp.sort === "top" ? "top" : "recent";

  const builds = await listCommunityBuilds({ role, sort });

  const tabHref = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const r = next.role ?? (role ?? "");
    const s = next.sort ?? sort;
    if (r && r !== "all") params.set("role", r);
    if (s && s !== "recent") params.set("sort", s);
    const qs = params.toString();
    return qs ? `/community?${qs}` : "/community";
  };

  return (
    <div
      data-role={role ?? "survivor"}
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6"
    >
      <PageHeader
        eyebrow="Community"
        title="Builds from the fog-dwellers"
        description="Loadouts created and shared by players. Rate them, leave a comment, and publish your own from the sandbox."
        className="mb-8"
      >
        <Button asChild variant="accent" size="md">
          <Link href="/builds/new">
            <Plus className="h-4 w-4" />
            Create a build
          </Link>
        </Button>
      </PageHeader>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1">
          {ROLE_TABS.map((t) => {
            const active = (role ?? "all") === t.value;
            return (
              <Link
                key={t.value}
                href={tabHref({ role: t.value })}
                data-role={t.value === "all" ? undefined : t.value}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
        <div className="inline-flex gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1">
          {SORT_TABS.map((t) => {
            const active = sort === t.value;
            return (
              <Link
                key={t.value}
                href={tabHref({ sort: t.value })}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>

      {builds.length === 0 ? (
        <EmptyState
          title="No community builds yet"
          message="Be the first to publish one — draft a loadout in the sandbox and share it with the fog."
          action={
            <Button asChild variant="accent" size="sm">
              <Link href="/builds/new">Open the sandbox</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {builds.map((s) => (
            <CommunityBuildCard key={s.build.id} summary={s} />
          ))}
        </div>
      )}
    </div>
  );
}
