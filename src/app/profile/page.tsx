import type { Metadata } from "next";
import type { Session } from "next-auth";
import Link from "next/link";
import { Plus } from "lucide-react";
import { auth } from "@/auth";
import { getUserBuilds } from "@/lib/community";
import { PageHeader } from "@/components/app/page-header";
import { CommunityBuildCard } from "@/components/app/community-build-card";
import { EmptyState } from "@/components/app/empty-state";
import { AuthorChip } from "@/components/app/author-chip";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Builds",
  description: "The builds you've published to the community.",
};

export default async function ProfilePage() {
  let session: Session | null = null;
  try {
    session = await auth();
  } catch (err) {
    console.error("[profile] auth/db error:", err);
  }

  if (!session?.user?.id) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="rounded-2xl glass-elevated p-8">
          <h1 className="font-display text-2xl font-bold text-ink">Your builds</h1>
          <p className="mt-2 text-sm text-ink-2">
            Sign in to publish builds and see everything you&apos;ve shared.
          </p>
          <Button asChild variant="accent" size="md" className="mt-6">
            <Link href="/login?callbackUrl=/profile">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  let builds: Awaited<ReturnType<typeof getUserBuilds>> = [];
  try {
    builds = await getUserBuilds(session.user.id);
  } catch (err) {
    console.error("[profile] failed to load builds:", err);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader eyebrow="Your profile" title="My builds" className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <AuthorChip name={session.user.name ?? null} image={session.user.image ?? null} size="md" />
          <Button asChild variant="accent" size="sm">
            <Link href="/builds/new">
              <Plus className="h-4 w-4" />
              Create a build
            </Link>
          </Button>
        </div>
      </PageHeader>

      {builds.length === 0 ? (
        <EmptyState
          title="You haven't published anything yet"
          message="Draft a loadout in the sandbox and hit publish to share it with the community."
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
