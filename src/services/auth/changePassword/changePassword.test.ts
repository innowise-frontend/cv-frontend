import { describe, expect, it, vi } from "vitest";
import { changePassword } from "./changePassword";

const requestMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  graphqlClient: {
    request: (...args: unknown[]) => requestMock(...args),
  },
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  ChangePasswordDocument: "CHANGE_PASSWORD_DOCUMENT",
}));

describe("changePassword service", () => {
  it("should send payload with authorization header", async () => {
    requestMock.mockResolvedValue({});

    await changePassword("token-123", {
      oldPassword: "old-pass",
      newPassword: "new-pass",
      confirmPassword: "new-pass",
    });

    expect(requestMock).toHaveBeenCalledWith(
      "CHANGE_PASSWORD_DOCUMENT",
      {
        args: {
          oldPassword: "old-pass",
          newPassword: "new-pass",
          confirmPassword: "new-pass",
        },
      },
      { Authorization: "Bearer token-123" },
    );
  });
});
