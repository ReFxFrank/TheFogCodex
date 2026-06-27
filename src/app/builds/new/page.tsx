import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { BuildSandbox } from "@/components/app/build-sandbox";

export const metadata: Metadata = {
  title: "Build Sandbox",
  description:
    "Draft your own Dead by Daylight loadout — pick a role, character and four perks, see a live in-game-style loadout, then copy or share it as a URL.",
};

export default function NewBuildPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Sandbox"
        title="Draft your own loadout"
        description="Pick a role, an optional character, and up to four perks. Your loadout renders live in the in-game style, and the URL encodes it — copy the link to share the exact build."
        className="mb-8"
      />
      <Suspense
        fallback={<div className="h-96 rounded-2xl glass shimmer" />}
      >
        <BuildSandbox />
      </Suspense>
    </div>
  );
}
