import type { Role } from "@/types";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  role?: Role;
  children?: React.ReactNode;
  className?: string;
}

/** Consistent page intro with an accent eyebrow and a glowing rule. */
export function PageHeader({
  eyebrow,
  title,
  description,
  role,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header data-role={role} className={cn("relative", className)}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-2">
          {description}
        </p>
      )}
      {children && <div className="mt-5">{children}</div>}
      <hr className="rule-glow mt-6" />
    </header>
  );
}
