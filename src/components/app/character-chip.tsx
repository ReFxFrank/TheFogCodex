import Link from "next/link";
import type { Role } from "@/types";
import { CharacterPortrait } from "./character-portrait";
import { cn } from "@/lib/utils";

interface CharacterChipProps {
  character: { slug: string; name: string; role: Role; portrait?: string };
  /** Pass null for a non-interactive chip (e.g. inside a card link). */
  href?: string | null;
  className?: string;
}

/** Compact character avatar + name, used on build cards and headers. */
export function CharacterChip({ character, href, className }: CharacterChipProps) {
  const inner = (
    <span
      data-role={character.role}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-0.5 pl-0.5 pr-2.5 text-xs text-ink-2",
        href !== null && "transition-colors hover:border-accent hover:text-ink",
        className,
      )}
    >
      <CharacterPortrait
        name={character.name}
        slug={character.slug}
        role={character.role}
        portrait={character.portrait}
        className="h-5 w-5 shrink-0"
      />
      <span className="truncate">{character.name}</span>
    </span>
  );

  if (href === null || href === undefined) return inner;
  return <Link href={href}>{inner}</Link>;
}
