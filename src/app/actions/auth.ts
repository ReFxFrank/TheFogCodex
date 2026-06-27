"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/password";

export type RegisterResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResult> {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim().toLowerCase() ?? "";
  const password = input.password ?? "";

  if (name.length < 1 || name.length > 60)
    return { ok: false, error: "Display name must be 1–60 characters." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Enter a valid email address." };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters." };
  if (password.length > 200)
    return { ok: false, error: "That password is too long." };

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing.length > 0)
    return { ok: false, error: "An account with that email already exists — try signing in." };

  await db.insert(users).values({
    name,
    email,
    passwordHash: hashPassword(password),
  });

  return { ok: true };
}
