import { describe, expect, it, vi } from "vitest";
import { deletePosition } from "./deletePosition";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  DeletePositionDocument: "DELETE_POSITION_DOCUMENT",
}));

describe("deletePosition service", () => {
  it("sends delete payload and returns delete result", async () => {
    const position = { positionId: "p1" };
    requestWithAuthMock.mockResolvedValue({ deletePosition: { affected: 1 } });

    const result = await deletePosition(position);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_POSITION_DOCUMENT", { position });
    expect(result).toEqual({ affected: 1 });
  });
});
