import type { LoadoutItem } from "@/types";

// ============================================================
// Add-on reference stub.
// A small catalog of commonly-suggested add-ons that builds can
// reference via their `extras`. Expand as the content grows.
// ============================================================

export const ADDONS: LoadoutItem[] = [
  { kind: "addon", name: "Wire Spool", note: "Toolbox — extra repair charges." },
  { kind: "addon", name: "Scraps", note: "Toolbox — small charge boost, easy to find." },
  { kind: "addon", name: "Syringe", note: "Medkit — converts charges into a full heal." },
  { kind: "addon", name: "Butterfly Tape", note: "Medkit — faster self-healing." },
  { kind: "addon", name: "Iridescent Stone", note: "Killer — high-impact power modifier." },
];
