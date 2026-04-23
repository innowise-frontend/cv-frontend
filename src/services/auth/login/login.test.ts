import { describe, expect, it, vi } from "vitest";
import { login } from "./login";

const requestMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  graphqlClient: {
    request: (...args: unknown[]) => requestMock(...args),
  },
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  LoginDocument: "LOGIN_DOCUMENT",
}));

describe("login service", () => {
  it("should send auth payload and return login response", async () => {
    requestMock.mockResolvedValue({
      login: { access_token: "access", refresh_token: "refresh" },
    });

    const result = await login({ email: "user@example.com", password: "secret12" });

    expect(requestMock).toHaveBeenCalledWith("LOGIN_DOCUMENT", {
      auth: { email: "user@example.com", password: "secret12" },
    });
    expect(result).toEqual({ access_token: "access", refresh_token: "refresh" });
  });
});
