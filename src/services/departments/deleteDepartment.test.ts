import { describe, expect, it, vi } from "vitest";
import { deleteDepartment } from "./deleteDepartment";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

describe("deleteDepartment service", () => {
  it("sends delete payload and returns affected count", async () => {
    const department = { departmentId: "d1" };
    requestWithAuthMock.mockResolvedValue({ deleteDepartment: { affected: 1 } });

    const result = await deleteDepartment(department);

    expect(requestWithAuthMock).toHaveBeenCalledWith(expect.stringContaining("deleteDepartment"), {
      department,
    });
    expect(result).toEqual({ affected: 1 });
  });
});
