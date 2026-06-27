import { CloudFog } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Friendly empty state with a little personality. */
export function EmptyState({
  title = "The fog is thick here",
  message = "No results match — loosen a filter and try again.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "glass flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center",
        className,
      )}
    >
      <CloudFog className="mb-4 h-10 w-10 text-ink-3" />
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-2">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
