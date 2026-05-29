import { describe, expect, it, vi } from "vitest";
import { updatePosition } from "./updatePosition";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  UpdatePositionDocument: "UPDATE_POSITION_DOCUMENT",
}));

describe("updatePosition service", () => {
  it("sends update payload and returns updated position", async () => {
    const position = { positionId: "p1", name: "Lead Developer" };
    requestWithAuthMock.mockResolvedValue({
      updatePosition: { id: "p1", name: "Lead Developer" },
    });

    const result = await updatePosition(position);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_POSITION_DOCUMENT", { position });
    expect(result).toEqual({ id: "p1", name: "Lead Developer" });
  });
});
