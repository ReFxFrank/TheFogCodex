import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, MapPin, Maximize, Eye } from "lucide-react";
import { maps, getMap, getMapsInRealm } from "@/data";
import { titleCase } from "@/lib/utils";
import { MapEmblem } from "@/components/app/map-emblem";
import { MapCard } from "@/components/app/map-card";
import { leanRole } from "@/components/app/map-card";
import type { MapLean } from "@/types";

export function generateStaticParams() {
  return maps.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) return { title: "Map not found" };
  return { title: `${map.name} — ${map.realm}`, description: map.summary };
}

const LEAN_BADGE: Record<MapLean, { label: string; cls: string }> = {
  killer: { label: "Killer-sided", cls: "border-killer/40 bg-killer/10 text-killer" },
  balanced: { label: "Balanced", cls: "border-gold/40 bg-gold/10 text-gold" },
  survivor: {
    label: "Survivor-sided",
    cls: "border-survivor/40 bg-survivor/10 text-survivor",
  },
};

export default async function MapDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) notFound();

  const lean = LEAN_BADGE[map.lean];
  const siblings = getMapsInRealm(map.realm).filter((m) => m.slug !== map.slug);

  return (
    <div data-role={leanRole(map.lean)} className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/maps"
        className="inline-flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to maps
      </Link>

      <header className="mt-5 overflow-hidden rounded-2xl glass-elevated">
        <MapEmblem
          name={map.name}
          slug={map.slug}
          setting={map.setting}
          lean={map.lean}
          image={map.image}
          className="aspect-[2/1] w-full sm:aspect-[5/2]"
        />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${lean.cls}`}>
              {lean.label}
            </span>
            {map.licensed && (
              <span className="inline-flex items-center gap-1 rounded-md border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-gold">
                <BadgeCheck className="h-3 w-3" />
                Licensed
              </span>
            )}
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {map.name}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-3">
            <MapPin className="h-4 w-4" />
            {map.realm}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 text-ink-2">
              <Eye className="h-4 w-4 text-accent" />
              {titleCase(map.setting)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink-2">
              <Maximize className="h-4 w-4 text-accent" />
              {titleCase(map.size)}
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">{map.summary}</p>
        </div>
      </header>

      {/* Layout & what to know */}
      <section className="mt-6 rounded-2xl glass p-6 sm:p-8">
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          Layout &amp; what to know
        </h2>
        <p className="max-w-2xl text-[15px] leading-relaxed text-ink-2">{map.notes}</p>

        {map.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {map.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-ink-3"
              >
                {titleCase(t)}
              </span>
            ))}
          </div>
        )}

        <p className="mt-5 text-xs text-ink-3">
          “{lean.label}” and size are rough community reads and shift whenever the map is
          reworked or the meta moves — treat them as a guide, not a verdict.
        </p>
      </section>

      {/* Other maps in the realm */}
      {siblings.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">
            More in {map.realm}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((m) => (
              <MapCard key={m.slug} map={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
