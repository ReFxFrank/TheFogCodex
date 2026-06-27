"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { communityBuilds, comments, ratings } from "@/db/schema";
import { perkBySlug, characterBySlug } from "@/data";
import { ROLES, DIFFICULTY, ARCHETYPES, type Role } from "@/types";

export interface PublishInput {
  title: string;
  summary: string;
  role: Role;
  characterSlug?: string | null;
  perkSlugs: string[];
  archetypes: string[];
  difficulty: string;
  whyItWorks?: string;
}

export type ActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export async function publishBuild(input: PublishInput): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "You must be signed in to publish a build." };
  if (session.user.banned) return { ok: false, error: "Your account is suspended." };

  const title = input.title?.trim() ?? "";
  const summary = input.summary?.trim() ?? "";
  const whyItWorks = input.whyItWorks?.trim() ?? "";

  if (title.length < 3 || title.length > 80)
    return { ok: false, error: "Title must be 3–80 characters." };
  if (summary.length < 10 || summary.length > 200)
    return { ok: false, error: "Summary must be 10–200 characters." };
  if (whyItWorks.length > 600)
    return { ok: false, error: "“Why it works” must be 600 characters or fewer." };
  if (!ROLES.includes(input.role))
    return { ok: false, error: "Invalid role." };
  if (!DIFFICULTY.includes(input.difficulty as (typeof DIFFICULTY)[number]))
    return { ok: false, error: "Invalid difficulty." };

  const perks = input.perkSlugs ?? [];
  if (perks.length !== 4)
    return { ok: false, error: "Pick exactly four perks." };
  if (new Set(perks).size !== 4)
    return { ok: false, error: "Perks must be distinct." };
  for (const slug of perks) {
    const perk = perkBySlug.get(slug);
    if (!perk) return { ok: false, error: `Unknown perk: ${slug}` };
    if (perk.role !== input.role)
      return { ok: false, error: `${perk.name} isn't a ${input.role} perk.` };
  }

  if (input.characterSlug) {
    const ch = characterBySlug.get(input.characterSlug);
    if (!ch) return { ok: false, error: "Unknown character." };
    if (ch.role !== input.role)
      return { ok: false, error: "Character doesn't match the build role." };
  }

  const archetypes = (input.archetypes ?? []).filter((a) =>
    ARCHETYPES.includes(a as (typeof ARCHETYPES)[number]),
  );

  const [row] = await db
    .insert(communityBuilds)
    .values({
      authorId: session.user.id,
      title,
      role: input.role,
      characterSlug: input.characterSlug || null,
      perkSlugs: perks,
      archetypes,
      difficulty: input.difficulty,
      summary,
      whyItWorks: whyItWorks || null,
    })
    .returning({ id: communityBuilds.id });

  revalidatePath("/community");
  revalidatePath("/profile");
  return { ok: true, id: row.id };
}

export async function rateBuild(
  buildId: string,
  value: number,
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Sign in to rate builds." };
  if (session.user.banned) return { ok: false, error: "Your account is suspended." };
  const v = Math.round(value);
  if (v < 1 || v > 5) return { ok: false, error: "Rating must be 1–5." };

  await db
    .insert(ratings)
    .values({ buildId, userId: session.user.id, value: v })
    .onConflictDoUpdate({
      target: [ratings.buildId, ratings.userId],
      set: { value: v },
    });

  revalidatePath(`/community/${buildId}`);
  revalidatePath("/community");
  return { ok: true };
}

export async function addComment(
  buildId: string,
  body: string,
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Sign in to comment." };
  if (session.user.banned) return { ok: false, error: "Your account is suspended." };
  const text = body?.trim() ?? "";
  if (text.length < 1) return { ok: false, error: "Comment can't be empty." };
  if (text.length > 1000) return { ok: false, error: "Comment is too long (1000 max)." };

  await db.insert(comments).values({
    buildId,
    userId: session.user.id,
    body: text,
  });

  revalidatePath(`/community/${buildId}`);
  return { ok: true };
}

export async function deleteComment(commentId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Not signed in." };
  await db
    .delete(comments)
    .where(and(eq(comments.id, commentId), eq(comments.userId, session.user.id)));
  return { ok: true };
}

export async function deleteBuild(buildId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Not signed in." };
  await db
    .delete(communityBuilds)
    .where(
      and(eq(communityBuilds.id, buildId), eq(communityBuilds.authorId, session.user.id)),
    );
  revalidatePath("/community");
  revalidatePath("/profile");
  return { ok: true };
}
