import { describe, expect, it, vi } from "vitest";
import { getMe } from "./me";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  MeDocument: "ME_DOCUMENT",
}));

describe("getMe service", () => {
  it("should request current user and return me payload", async () => {
    requestWithAuthMock.mockResolvedValue({
      me: { id: "1", email: "user@example.com", role: "USER" },
    });

    const result = await getMe();

    expect(requestWithAuthMock).toHaveBeenCalledWith("ME_DOCUMENT");
    expect(result).toEqual({ id: "1", email: "user@example.com", role: "USER" });
  });
});
