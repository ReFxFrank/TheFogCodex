"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Command as CommandIcon } from "lucide-react";
import { useCommandPalette } from "./command-palette";
import { UserMenu } from "./user-menu";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/builds", label: "Builds" },
  { href: "/perks", label: "Perks" },
  { href: "/characters", label: "Characters" },
  { href: "/maps", label: "Maps" },
  { href: "/items", label: "Items" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { openPalette } = useCommandPalette();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-fog-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-fog-800">
            <span className="font-display text-lg font-bold text-fog-gradient">F</span>
            <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[0_0_18px_-2px_rgba(79,182,199,0.5)] transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight text-ink sm:block">
            The Fog Codex
          </span>
        </Link>

        <nav className="ml-2 flex items-center gap-1 text-sm">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-2.5 py-1.5 transition-colors sm:px-3",
                  active ? "text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-2.5 -bottom-px h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-fog-800/60 px-2.5 py-2 text-sm text-ink-3 transition-colors hover:border-white/20 hover:text-ink-2"
            aria-label="Open search (Command or Control + K)"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search the fog…</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-white/12 px-1.5 py-0.5 text-[10px] md:inline-flex">
              <CommandIcon className="h-2.5 w-2.5" />K
            </kbd>
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
