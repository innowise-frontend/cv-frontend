import { describe, expect, it, vi } from "vitest";
import { createPosition } from "./createPosition";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CreatePositionDocument: "CREATE_POSITION_DOCUMENT",
}));

describe("createPosition service", () => {
  it("sends create payload and returns created position", async () => {
    const position = { name: "Developer" };
    requestWithAuthMock.mockResolvedValue({
      createPosition: { id: "p1", name: "Developer" },
    });

    const result = await createPosition(position);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CREATE_POSITION_DOCUMENT", { position });
    expect(result).toEqual({ id: "p1", name: "Developer" });
  });
});
