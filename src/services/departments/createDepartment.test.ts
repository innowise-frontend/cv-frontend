import { describe, expect, it, vi } from "vitest";
import { createDepartment } from "./createDepartment";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

describe("createDepartment service", () => {
  it("sends create payload and returns created department", async () => {
    const department = { name: "Engineering" };
    requestWithAuthMock.mockResolvedValue({
      createDepartment: { id: "d1", name: "Engineering" },
    });

    const result = await createDepartment(department);

    expect(requestWithAuthMock).toHaveBeenCalledWith(expect.stringContaining("createDepartment"), {
      department,
    });
    expect(result).toEqual({ id: "d1", name: "Engineering" });
  });
});
