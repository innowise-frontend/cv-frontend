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
  it("should request positions with params and return paginated data", async () => {
    const params = { search: "dev", page: 1, limit: 10, sort_order: "ASC", sort_by: "name" };
    const positions = {
      items: [{ id: "p1", name: "Developer" }],
      total: 1,
      page: 1,
      limit: 10,
      total_pages: 1,
    };
    requestWithAuthMock.mockResolvedValue({ positions });

    const result = await getPositions(params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("POSITIONS_DOCUMENT", { params });
    expect(result).toEqual(positions);
  });
});
