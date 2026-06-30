import { ImageResponse } from "next/og";
import { getBuild } from "@/data";
import { titleCase } from "@/lib/utils";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dead by Daylight build";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) {
    return new ImageResponse(ogCard({ kind: "Build", title: "The Fog Codex" }), OG_SIZE);
  }
  return new ImageResponse(
    ogCard({
      kind: `${build.role} build`,
      title: build.title,
      subtitle: `${build.metaTier}-tier · ${titleCase(build.difficulty)} · ${build.summary}`,
      accent: build.role,
    }),
    OG_SIZE,
  );
}
