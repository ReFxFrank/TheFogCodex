import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic, de-duping conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Deterministic pick from an array using a seed (no Math.random for SSR safety). */
export function seededPick<T>(arr: readonly T[], seed: number): T {
  if (arr.length === 0) throw new Error("seededPick: empty array");
  const idx = Math.abs(Math.floor(seed)) % arr.length;
  return arr[idx];
}

/**
 * Only allow same-origin internal redirect paths. Blocks protocol-relative
 * (`//evil.com`) and backslash (`/\evil.com`) tricks that pass a naive
 * `startsWith("/")` check.
 */
export function safeCallbackPath(
  cb: string | null | undefined,
  fallback = "/community",
): string {
  if (!cb || !cb.startsWith("/")) return fallback;
  if (cb.startsWith("//") || cb.startsWith("/\\")) return fallback;
  return cb;
}

/** Title-case helper for slugs / tags. */
export function titleCase(input: string): string {
  return input
    .split(/[-\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
