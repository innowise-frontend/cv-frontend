import { describe, expect, it, vi } from "vitest";
import { createCvValidation } from "./validation";
import type { TFunction } from "i18next";

const t = vi.fn((key: string) => key) as unknown as TFunction;

describe("createCvValidation", () => {
  const schema = createCvValidation(t);

  it("rejects empty required fields", () => {
    const result = schema.safeParse({ name: "", education: "", description: "" });

    expect(result.success).toBe(false);
  });

  it("accepts valid values and trims whitespace", () => {
    const result = schema.safeParse({
      name: "  John  ",
      education: "  MIT  ",
      description: "  Bio  ",
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      name: "John",
      education: "MIT",
      description: "Bio",
    });
  });
});
