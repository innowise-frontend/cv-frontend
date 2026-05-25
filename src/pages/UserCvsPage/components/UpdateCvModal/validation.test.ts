import { describe, expect, it, vi } from "vitest";
import { updateCvValidation } from "./validation";
import type { TFunction } from "i18next";

const t = vi.fn((key: string) => key) as unknown as TFunction;

describe("updateCvValidation", () => {
  const schema = updateCvValidation(t);

  it("rejects empty required fields", () => {
    const result = schema.safeParse({ name: " ", education: "", description: " " });

    expect(result.success).toBe(false);
  });

  it("accepts valid values and trims whitespace", () => {
    const result = schema.safeParse({
      name: "  CV  ",
      education: "  School  ",
      description: "  Text  ",
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      name: "CV",
      education: "School",
      description: "Text",
    });
  });
});
