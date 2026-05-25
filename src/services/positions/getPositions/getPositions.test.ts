import { describe, expect, it, vi } from "vitest";
import { getPositions } from "./getPositions";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  PositionsDocument: "POSITIONS_DOCUMENT",
}));

describe("getPositions service", () => {
  it("should request positions and return the list", async () => {
    const positions = [{ id: "p1", name: "Developer" }];
    requestWithAuthMock.mockResolvedValue({ positions });

    const result = await getPositions();

    expect(requestWithAuthMock).toHaveBeenCalledWith("POSITIONS_DOCUMENT");
    expect(result).toEqual(positions);
  });
});
