import { describe, it, expect } from "vitest";
import { rankOf, atLeast, isStaff, isAdmin, isOwner } from "@/lib/permissions";
import { STAFF_ROLES } from "@/types";

describe("role hierarchy", () => {
  it("ranks user < moderator < admin < owner", () => {
    expect(rankOf("user")).toBeLessThan(rankOf("moderator"));
    expect(rankOf("moderator")).toBeLessThan(rankOf("admin"));
    expect(rankOf("admin")).toBeLessThan(rankOf("owner"));
  });

  it("treats unknown/empty roles as user", () => {
    expect(rankOf(undefined)).toBe(rankOf("user"));
    expect(rankOf(null)).toBe(rankOf("user"));
    expect(rankOf("nonsense")).toBe(rankOf("user"));
  });

  it("atLeast respects the hierarchy", () => {
    expect(atLeast("admin", "moderator")).toBe(true);
    expect(atLeast("moderator", "admin")).toBe(false);
    expect(atLeast("owner", "admin")).toBe(true);
  });

  it("isStaff is moderator-and-up only", () => {
    expect(isStaff("user")).toBe(false);
    expect(isStaff("moderator")).toBe(true);
    expect(isStaff("admin")).toBe(true);
    expect(isStaff("owner")).toBe(true);
  });

  it("isAdmin includes owner; isOwner is owner-only", () => {
    expect(isAdmin("moderator")).toBe(false);
    expect(isAdmin("admin")).toBe(true);
    expect(isAdmin("owner")).toBe(true);
    expect(isOwner("admin")).toBe(false);
    expect(isOwner("owner")).toBe(true);
  });

  it("every staff role has a defined rank", () => {
    for (const r of STAFF_ROLES) expect(typeof rankOf(r)).toBe("number");
  });
});
