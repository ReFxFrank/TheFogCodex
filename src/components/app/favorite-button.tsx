"use client";

import { Heart } from "lucide-react";
import { toggleFavorite, useIsFavorite } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  slug: string;
  variant?: "icon" | "full";
  className?: string;
}

/** ♥ toggle backed by the localStorage favorites store. */
export function FavoriteButton({ slug, variant = "icon", className }: FavoriteButtonProps) {
  const active = useIsFavorite(slug);

  function onClick(e: React.MouseEvent) {
    // Cards wrap this in a Link — don't navigate when favoriting.
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "glass inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:glow-accent",
          active ? "text-killer-ember" : "text-ink-2",
          className,
        )}
      >
        <Heart className={cn("h-4 w-4", active && "fill-current")} />
        {active ? "Favorited" : "Favorite"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "inline-grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-fog-900/60 backdrop-blur transition-colors hover:border-white/20",
        active ? "text-killer-ember" : "text-ink-3 hover:text-ink-2",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", active && "fill-current")} />
    </button>
  );
}
