import { describe, expect, it, vi } from "vitest";
import { getDepartments } from "./getDepartments";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("../graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("../graphql/__generated__/graphql", () => ({
  DepartmentsDocument: "DEPARTMENTS_DOCUMENT",
}));

describe("getDepartments service", () => {
  it("should request departments and return the list", async () => {
    const departments = [{ id: "d1", name: "Engineering" }];
    requestWithAuthMock.mockResolvedValue({ departments });

    const result = await getDepartments();

    expect(requestWithAuthMock).toHaveBeenCalledWith("DEPARTMENTS_DOCUMENT");
    expect(result).toEqual(departments);
  });
});
