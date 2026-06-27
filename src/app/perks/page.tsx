import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { PerksExplorer } from "@/components/app/perks-explorer";

export const metadata: Metadata = {
  title: "Perk Knowledgebase",
  description:
    "Every Dead by Daylight perk in plain English. Filter survivor and killer perks by category or owner, see which ones got buffed or nerfed, and find the builds that run them.",
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
        eyebrow="Perks"
        title="Every perk, explained"
        description="What each perk actually does, in plain English, tagged so you can filter by playstyle. Tap one for the full effect and every build that runs it."
        className="mb-8"
      />
      <Suspense fallback={<Fallback />}>
        <PerksExplorer />
      </Suspense>
    </div>
  );
}
