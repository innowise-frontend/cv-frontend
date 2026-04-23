import { describe, expect, it, vi } from "vitest";
import { updateToken } from "./updateToken";

const requestMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  graphqlClient: {
    request: (...args: unknown[]) => requestMock(...args),
  },
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  UpdateTokenDocument: "UPDATE_TOKEN_DOCUMENT",
}));

describe("updateToken service", () => {
  it("should request updated tokens and return response payload", async () => {
    requestMock.mockResolvedValue({
      updateToken: { access_token: "new-access", refresh_token: "new-refresh" },
    });

    const result = await updateToken();

    expect(requestMock).toHaveBeenCalledWith("UPDATE_TOKEN_DOCUMENT");
    expect(result).toEqual({ access_token: "new-access", refresh_token: "new-refresh" });
  });
});
