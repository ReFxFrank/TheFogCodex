import { ImageResponse } from "next/og";
import { getCharacter } from "@/data";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dead by Daylight character";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) {
    return new ImageResponse(ogCard({ kind: "Character", title: "The Fog Codex" }), OG_SIZE);
  }
  return new ImageResponse(
    ogCard({
      kind: character.role,
      title: character.name,
      subtitle: character.killerTier
        ? `${character.killerTier}-tier killer`
        : character.realName ?? "Survivor",
      accent: character.role,
    }),
    OG_SIZE,
  );
}
