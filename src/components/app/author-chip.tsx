interface AuthorChipProps {
  name: string | null;
  image: string | null;
  size?: "sm" | "md";
}

/** Small avatar + display-name chip for a community author. */
export function AuthorChip({ name, image, size = "sm" }: AuthorChipProps) {
  const label = name ?? "Anonymous";
  const initial = label.charAt(0).toUpperCase();
  const dim = size === "md" ? "h-7 w-7 text-sm" : "h-5 w-5 text-[10px]";

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-2">
      <span
        className={`grid ${dim} shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-fog-700 font-semibold text-ink`}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </span>
      <span className="truncate">{label}</span>
    </span>
  );
}
