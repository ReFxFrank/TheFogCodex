import { ImageResponse } from "next/og";
import { getMap } from "@/data";
import { titleCase } from "@/lib/utils";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dead by Daylight map";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) {
    return new ImageResponse(ogCard({ kind: "Map", title: "The Fog Codex" }), OG_SIZE);
  }
  const accent = map.lean === "killer" ? "killer" : map.lean === "survivor" ? "survivor" : "neutral";
  return new ImageResponse(
    ogCard({
      kind: "Map",
      title: map.name,
      subtitle: `${map.realm} · ${titleCase(map.setting)} · ${titleCase(map.size)}`,
      accent,
    }),
    OG_SIZE,
  );
}
