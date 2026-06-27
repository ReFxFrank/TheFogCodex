"use client";

import { useSyncExternalStore } from "react";

// ============================================================
// Favorites store — persisted to localStorage, SSR-safe via
// useSyncExternalStore (server snapshot is always empty, so no
// hydration mismatch). Shared across every FavoriteButton.
// ============================================================

const KEY = "fog-codex:favorites";
const EMPTY: string[] = [];

let favorites: string[] = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function load() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        favorites = parsed.filter((x): x is string => typeof x === "string");
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(favorites));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    try {
      const parsed: unknown = e.newValue ? JSON.parse(e.newValue) : [];
      favorites = Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === "string")
        : [];
    } catch {
      favorites = [];
    }
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string[] {
  load();
  return favorites;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

/** Toggle a build slug in/out of favorites. */
export function toggleFavorite(slug: string) {
  load();
  favorites = favorites.includes(slug)
    ? favorites.filter((s) => s !== slug)
    : [...favorites, slug];
  persist();
  emit();
}

/** Reactive list of favorited build slugs. */
export function useFavorites(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Reactive boolean for a single slug. */
export function useIsFavorite(slug: string): boolean {
  return useFavorites().includes(slug);
}
