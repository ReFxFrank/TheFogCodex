import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app/page-header";
import { MapsBrowser } from "@/components/app/maps-browser";

export const metadata: Metadata = {
  title: "Maps",
  description:
    "Every Dead by Daylight realm and map — indoor or outdoor, size, which side it tends to favour, and what defines each layout.",
};

function Fallback() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-64 rounded-2xl glass shimmer" />
      ))}
    </div>
  );
}

export default function MapsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Realms"
        title="The maps"
        description="Where the trials happen. Each map's realm, whether it's indoor or outdoor, its size, the side it tends to favour, and what actually defines the layout. Lean and size are rough community reads — they shift whenever a map gets reworked."
        className="mb-8"
      />
      <Suspense fallback={<Fallback />}>
        <MapsBrowser />
      </Suspense>
    </div>
  );
}
