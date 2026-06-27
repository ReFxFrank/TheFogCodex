"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  LayoutGrid,
  Shield,
  Skull,
  Sparkles,
  Swords,
  User,
  Dices,
} from "lucide-react";
import type { Role, SearchKind } from "@/types";
import { builds, buildsByRole } from "@/data";
import { searchAll } from "@/lib/search";

interface PaletteContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  openPalette: () => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within provider");
  return ctx;
}

const KIND_META: Record<SearchKind, { label: string; Icon: typeof User }> = {
  build: { label: "Builds", Icon: LayoutGrid },
  perk: { label: "Perks", Icon: Sparkles },
  character: { label: "Characters", Icon: User },
};

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [shuffling, setShuffling] = useState(false);

  const openPalette = useCallback(() => setOpen(true), []);

  // ⌘K / Ctrl-K toggle
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => searchAll(query), [query]);
  const grouped = useMemo(() => {
    const g: Record<SearchKind, typeof results> = { build: [], perk: [], character: [] };
    for (const r of results) g[r.kind].push(r);
    return g;
  }, [results]);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function randomBuild(role?: Role) {
    const pool = role ? buildsByRole(role) : [...builds];
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setShuffling(true);
    window.setTimeout(() => {
      setShuffling(false);
      go(`/builds/${pick.slug}`);
    }, 650);
  }

  const value = useMemo(() => ({ open, setOpen, openPalette }), [open, openPalette]);

  return (
    <PaletteContext.Provider value={value}>
      {children}

      <Command.Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setQuery("");
        }}
        label="Search The Fog Codex"
        shouldFilter={false}
        className="fixed left-1/2 top-[12vh] z-[100] w-[min(92vw,640px)] -translate-x-1/2 overflow-hidden rounded-2xl glass-elevated"
      >
        {shuffling ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-16">
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="perk-frame h-12 w-12 animate-shuffle"
                  style={{ animationDelay: `${i * 90}ms` }}
                />
              ))}
            </div>
            <p className="text-sm text-ink-2">Drawing a build from the fog…</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b border-white/8 px-4">
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search builds, perks, characters…"
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-3"
              />
              <kbd className="hidden rounded border border-white/12 px-1.5 py-0.5 text-[10px] text-ink-3 sm:block">
                ESC
              </kbd>
            </div>

            <Command.List className="max-h-[55vh] overflow-y-auto overflow-x-hidden p-2">
              <Command.Empty className="px-3 py-8 text-center text-sm text-ink-2">
                The fog swallows your search — nothing found for “{query}”.
              </Command.Empty>

              {!query && (
                <Command.Group
                  heading="Quick actions"
                  className="px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-3"
                >
                  <PaletteItem
                    value="action-random"
                    onSelect={() => randomBuild()}
                    Icon={Dices}
                    title="Surprise me"
                    hint="Random build"
                  />
                  <PaletteItem
                    value="action-random-survivor"
                    onSelect={() => randomBuild("survivor")}
                    Icon={Shield}
                    title="Random Survivor build"
                  />
                  <PaletteItem
                    value="action-random-killer"
                    onSelect={() => randomBuild("killer")}
                    Icon={Swords}
                    title="Random Killer build"
                  />
                  <PaletteItem
                    value="action-browse"
                    onSelect={() => go("/builds")}
                    Icon={LayoutGrid}
                    title="Browse all builds"
                  />
                  <PaletteItem
                    value="action-sandbox"
                    onSelect={() => go("/builds/new")}
                    Icon={Sparkles}
                    title="Open the build sandbox"
                  />
                </Command.Group>
              )}

              {(["build", "perk", "character"] as SearchKind[]).map((kind) => {
                const items = grouped[kind];
                if (items.length === 0) return null;
                const { label, Icon } = KIND_META[kind];
                return (
                  <Command.Group
                    key={kind}
                    heading={label}
                    className="px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-3"
                  >
                    {items.map((r) => (
                      <PaletteItem
                        key={r.id}
                        value={r.id}
                        onSelect={() => go(r.href)}
                        Icon={r.kind === "character" && r.role === "killer" ? Skull : Icon}
                        title={r.title}
                        hint={r.subtitle}
                        role={r.role}
                      />
                    ))}
                  </Command.Group>
                );
              })}
            </Command.List>
          </>
        )}
      </Command.Dialog>
    </PaletteContext.Provider>
  );
}

function PaletteItem({
  value,
  onSelect,
  Icon,
  title,
  hint,
  role,
}: {
  value: string;
  onSelect: () => void;
  Icon: typeof User;
  title: string;
  hint?: string;
  role?: Role;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      data-role={role}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-2 data-[selected=true]:bg-accent-soft data-[selected=true]:text-ink"
    >
      <Icon className="h-4 w-4 shrink-0 text-accent" />
      <span className="flex-1 truncate text-ink">{title}</span>
      {hint && <span className="shrink-0 truncate text-xs text-ink-3">{hint}</span>}
    </Command.Item>
  );
}
