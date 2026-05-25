import { describe, expect, it } from "vitest";
import { createResetPasswordSchema } from "./validation";

const t = (key: string) => key;
const schema = createResetPasswordSchema(t);

describe("createResetPasswordSchema", () => {
  it("accepts matching passwords of sufficient length", () => {
    expect(schema.safeParse({ newPassword: "secure1", confirmPassword: "secure1" }).success).toBe(
      true,
    );
  });

  it("rejects newPassword shorter than 6 characters", () => {
    expect(schema.safeParse({ newPassword: "abc", confirmPassword: "abc" }).success).toBe(false);
  });

  it("rejects when confirmPassword does not match newPassword", () => {
    const result = schema.safeParse({
      newPassword: "secure1",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);

    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("confirmPassword");
    }
  });

  it("uses the t() key as the error message", () => {
    const result = schema.safeParse({ newPassword: "secure1", confirmPassword: "mismatch" });
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "page.resetPassword.validation.passwordsDoNotMatch",
      );
    }
  });
});
