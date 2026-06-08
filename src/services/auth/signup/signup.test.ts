import { describe, expect, it, vi } from "vitest";
import { signup } from "./signup";

const requestMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  graphqlClient: {
    request: (...args: unknown[]) => requestMock(...args),
  },
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  SignupDocument: "SIGNUP_DOCUMENT",
}));

describe("signup service", () => {
  it("should send auth payload and return signup response", async () => {
    requestMock.mockResolvedValue({
      signup: { access_token: "access", refresh_token: "refresh", user: { role: "user" } },
    });

    const result = await signup({
      email: "new@example.com",
      password: "secret12",
      confirmPassword: "secret12",
    });

    expect(requestMock).toHaveBeenCalledWith("SIGNUP_DOCUMENT", {
      auth: {
        email: "new@example.com",
        password: "secret12",
        confirmPassword: "secret12",
      },
    });
    expect(result).toEqual({
      access_token: "access",
      refresh_token: "refresh",
      user: { role: "user" },
    });
  });
});
