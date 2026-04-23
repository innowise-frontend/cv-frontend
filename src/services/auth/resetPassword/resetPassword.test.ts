import { describe, expect, it, vi } from "vitest";
import { resetPassword } from "./resetPassword";

const requestMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  graphqlClient: {
    request: (...args: unknown[]) => requestMock(...args),
  },
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  ResetPasswordDocument: "RESET_PASSWORD_DOCUMENT",
}));

describe("resetPassword service", () => {
  it("should send password reset payload with authorization header", async () => {
    requestMock.mockResolvedValue({});

    await resetPassword("token-123", "newPass", "newPass");

    expect(requestMock).toHaveBeenCalledWith(
      "RESET_PASSWORD_DOCUMENT",
      { auth: { newPassword: "newPass", confirmPassword: "newPass" } },
      { Authorization: "Bearer token-123" },
    );
  });
});
