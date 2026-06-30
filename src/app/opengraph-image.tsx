import { ImageResponse } from "next/og";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";
import { SITE_NAME } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SITE_NAME;

export default function Image() {
  return new ImageResponse(
    ogCard({
      kind: "Fan Knowledgebase",
      title: "Dead by Daylight builds, perks & maps",
      subtitle: "Builds worth running, a full perk reference, and a map guide — honest and to the point.",
      accent: "neutral",
    }),
    OG_SIZE,
  );
}
