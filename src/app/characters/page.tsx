import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { CharactersBrowser } from "@/components/app/characters-browser";

export const metadata: Metadata = {
  title: "Characters",
  description:
    "The Dead by Daylight roster — Survivors and Killers with tiers, archetypes, their teachable perks and recommended builds.",
};

function Fallback() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-48 rounded-2xl glass shimmer" />
      ))}
    </div>
  );
}

export default function CharactersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="The roster"
        title="Survivors & Killers of the fog"
        description="A representative slice of the cast — each with a lore blurb, their teachable perks, and the builds that suit them. Killers carry an approximate current-patch tier."
        className="mb-8"
      />
      <Suspense fallback={<Fallback />}>
        <CharactersBrowser />
      </Suspense>
    </div>
  );
}
