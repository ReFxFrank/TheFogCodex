import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { BuildsExplorer } from "@/components/app/builds-explorer";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Browse and filter Dead by Daylight builds for survivor and killer by role, archetype, character, perk, difficulty, or tier. Every filtered view has its own shareable link.",
};

function ExplorerFallback() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <div className="hidden h-96 rounded-2xl glass lg:block" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl glass shimmer" />
        ))}
      </div>
    </div>
  );
}

export default function BuildsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Builds"
        title="The whole build library"
        description="Filter by role, archetype, character, perk, difficulty, or tier. Every build shows its loadout up front, plus a straight read on what it's for and where it struggles."
        className="mb-8"
      />
      <Suspense fallback={<ExplorerFallback />}>
        <BuildsExplorer />
      </Suspense>
    </div>
  );
}
