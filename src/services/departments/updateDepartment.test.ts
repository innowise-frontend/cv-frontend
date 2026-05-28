import { describe, expect, it, vi } from "vitest";
import { updateDepartment } from "./updateDepartment";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

describe("updateDepartment service", () => {
  it("sends update payload and returns updated department", async () => {
    const department = { departmentId: "d1", name: "Platform" };
    requestWithAuthMock.mockResolvedValue({
      updateDepartment: { id: "d1", name: "Platform" },
    });

    const result = await updateDepartment(department);

    expect(requestWithAuthMock).toHaveBeenCalledWith(expect.stringContaining("updateDepartment"), {
      department,
    });
    expect(result).toEqual({ id: "d1", name: "Platform" });
  });
});
