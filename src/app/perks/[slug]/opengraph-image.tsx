import { ImageResponse } from "next/og";
import { getPerk, getCharacter } from "@/data";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dead by Daylight perk";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const perk = getPerk(slug);
  if (!perk) {
    return new ImageResponse(ogCard({ kind: "Perk", title: "The Fog Codex" }), OG_SIZE);
  }
  const owner = perk.characterSlug ? getCharacter(perk.characterSlug) : undefined;
  return new ImageResponse(
    ogCard({
      kind: `${perk.role} perk`,
      title: perk.name,
      subtitle: owner ? `${owner.name}'s perk` : "General perk",
      accent: perk.role,
    }),
    OG_SIZE,
  );
}
