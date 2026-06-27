import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// ============================================================
// Password hashing with Node's built-in scrypt (no native deps).
// Stored format: scrypt$<saltHex>$<hashHex>
// ============================================================

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string | null): boolean {
  if (!stored) return false;
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const salt = Buffer.from(parts[1], "hex");
  const expected = Buffer.from(parts[2], "hex");
  let actual: Buffer;
  try {
    actual = scryptSync(password, salt, expected.length);
  } catch {
    return false;
  }
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
