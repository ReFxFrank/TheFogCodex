import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { PerksExplorer } from "@/components/app/perks-explorer";

export const metadata: Metadata = {
  title: "Perk Knowledgebase",
  description:
    "A complete, paraphrased Dead by Daylight perk knowledgebase — filter Survivor and Killer perks by category and owner, with meta-history flags and the builds that use each one.",
};

function Fallback() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-32 rounded-2xl glass shimmer" />
      ))}
    </div>
  );
}

export default function PerksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Knowledgebase"
        title="The perk encyclopedia"
        description="Every perk, paraphrased in plain language and tagged by what it actually does. Tap any perk to read its effect and every build that runs it."
        className="mb-8"
      />
      <Suspense fallback={<Fallback />}>
        <PerksExplorer />
      </Suspense>
    </div>
  );
}
