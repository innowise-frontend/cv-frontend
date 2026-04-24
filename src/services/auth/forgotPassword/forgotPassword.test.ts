import { describe, expect, it, vi } from "vitest";
import { forgotPassword } from "./forgotPassword";

const requestMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  graphqlClient: {
    request: (...args: unknown[]) => requestMock(...args),
  },
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  ForgotPasswordDocument: "FORGOT_PASSWORD_DOCUMENT",
}));

describe("forgotPassword service", () => {
  it("should trim email and send forgot password request", async () => {
    requestMock.mockResolvedValue({});

    await forgotPassword("  user@example.com  ");

    expect(requestMock).toHaveBeenCalledWith("FORGOT_PASSWORD_DOCUMENT", {
      auth: { email: "user@example.com" },
    });
  });
});
