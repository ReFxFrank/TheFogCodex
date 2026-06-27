import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

/**
 * Tasteful fade + rise on enter, implemented in pure CSS so the content
 * is visible by default — it renders without JS and collapses to an
 * instant show under prefers-reduced-motion (handled in globals.css).
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Tag = as;
  return (
    <Tag
      className={cn("reveal-up", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
