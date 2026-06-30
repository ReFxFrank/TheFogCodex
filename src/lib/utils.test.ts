import { describe, it, expect } from "vitest";
import { safeCallbackPath, titleCase, seededPick } from "@/lib/utils";

describe("safeCallbackPath (open-redirect guard)", () => {
  it("allows same-origin internal paths", () => {
    expect(safeCallbackPath("/community")).toBe("/community");
    expect(safeCallbackPath("/builds/new")).toBe("/builds/new");
  });

  it("rejects protocol-relative and backslash tricks", () => {
    expect(safeCallbackPath("//evil.com")).toBe("/community");
    expect(safeCallbackPath("/\\evil.com")).toBe("/community");
  });

  it("rejects absolute URLs and non-path values", () => {
    expect(safeCallbackPath("https://evil.com")).toBe("/community");
    expect(safeCallbackPath("javascript:alert(1)")).toBe("/community");
    expect(safeCallbackPath("")).toBe("/community");
    expect(safeCallbackPath(null)).toBe("/community");
    expect(safeCallbackPath(undefined)).toBe("/community");
  });

  it("honours a custom fallback", () => {
    expect(safeCallbackPath("//evil", "/profile")).toBe("/profile");
  });
});

describe("titleCase", () => {
  it("title-cases hyphen/space separated slugs", () => {
    expect(titleCase("anti-tunnel")).toBe("Anti Tunnel");
    expect(titleCase("gen-slowdown")).toBe("Gen Slowdown");
  });
});

describe("seededPick", () => {
  it("is deterministic for a given seed", () => {
    const arr = ["a", "b", "c", "d"];
    expect(seededPick(arr, 5)).toBe(seededPick(arr, 5));
    expect(seededPick(arr, 1)).toBe("b");
  });

  it("throws on an empty array", () => {
    expect(() => seededPick([], 0)).toThrow();
  });
});
