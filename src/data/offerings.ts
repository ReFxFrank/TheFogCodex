import type { LoadoutItem } from "@/types";

// ============================================================
// Offering reference stub.
// A small catalog of commonly-suggested offerings that builds
// can reference via their `extras`. Expand as the content grows.
// ============================================================

export const OFFERINGS: LoadoutItem[] = [
  { kind: "offering", name: "Bloody Party Streamers", note: "Bonus bloodpoints for everyone." },
  { kind: "offering", name: "Shroud of Separation", note: "Survivors spawn apart from each other." },
  { kind: "offering", name: "Murky Reagent", note: "Thickens the fog, shortening sightlines." },
  { kind: "offering", name: "Ward", note: "Protects against map offerings." },
];
