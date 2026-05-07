import { describe, expect, it, vi } from "vitest";
import { getUserProfile } from "./getUserProfile";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  ProfileDocument: "PROFILE_DOCUMENT",
}));

describe("getUserProfile service", () => {
  it("requests profile by user id and returns profile field", async () => {
    requestWithAuthMock.mockResolvedValue({ profile: { id: "u-1", languages: [] } });

    const result = await getUserProfile("u-1");

    expect(requestWithAuthMock).toHaveBeenCalledWith("PROFILE_DOCUMENT", { userId: "u-1" });
    expect(result).toEqual({ id: "u-1", languages: [] });
  });
});
