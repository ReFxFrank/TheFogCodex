import type { Difficulty } from "@/types";
import { cn } from "@/lib/utils";

const LEVEL: Record<Difficulty, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

const LABEL: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

interface DifficultyDotsProps {
  difficulty: Difficulty;
  withLabel?: boolean;
  className?: string;
}

/** Filled dots (1–4) communicating how demanding a build is to pilot. */
export function DifficultyDots({ difficulty, withLabel = false, className }: DifficultyDotsProps) {
  const filled = LEVEL[difficulty];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      title={`Difficulty: ${LABEL[difficulty]}`}
      aria-label={`Difficulty: ${LABEL[difficulty]}`}
    >
      <span className="flex items-center gap-0.5" aria-hidden>
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              i <= filled ? "bg-accent" : "bg-white/12",
            )}
          />
        ))}
      </span>
      {withLabel && (
        <span className="text-xs font-medium text-ink-2">{LABEL[difficulty]}</span>
      )}
    </span>
  );
}
