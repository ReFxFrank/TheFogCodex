import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { BuildSandbox } from "@/components/app/build-sandbox";

export const metadata: Metadata = {
  title: "Build Sandbox",
  description:
    "Throw together your own Dead by Daylight loadout. Pick a role, a character, and four perks, watch it render live, then share it as a link or publish it.",
};

export default function NewBuildPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Sandbox"
        title="Build your own"
        description="Pick a role, maybe a character, and four perks. The loadout updates as you go and the link encodes it, so you can copy it to share the exact build or publish it to the community."
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
