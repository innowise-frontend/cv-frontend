import { describe, expect, it } from "vitest";
import { createChangePasswordFormSchema } from "./validation";

const t = (key: string) => key;
const schema = createChangePasswordFormSchema(t);

describe("createChangePasswordFormSchema", () => {
  const valid = {
    oldPassword: "oldpass1",
    newPassword: "newpass1",
    confirmPassword: "newpass1",
  };

  it("accepts valid data", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });

  it("rejects oldPassword shorter than 6 characters", () => {
    const result = schema.safeParse({ ...valid, oldPassword: "abc" });
    expect(result.success).toBe(false);
  });

  it("rejects newPassword shorter than 6 characters", () => {
    const result = schema.safeParse({ ...valid, newPassword: "abc", confirmPassword: "abc" });
    expect(result.success).toBe(false);
  });

  it("rejects when newPassword equals oldPassword", () => {
    const result = schema.safeParse({
      oldPassword: "same123",
      newPassword: "same123",
      confirmPassword: "same123",
    });
    expect(result.success).toBe(false);

    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("newPassword");
    }
  });

  it("rejects when confirmPassword does not match newPassword", () => {
    const result = schema.safeParse({
      ...valid,
      confirmPassword: "different1",
    });
    expect(result.success).toBe(false);

    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("confirmPassword");
    }
  });
});
