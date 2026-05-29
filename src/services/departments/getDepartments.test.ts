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
  it("requests departments with params and returns paginated data", async () => {
    const params = { search: "eng", page: 1, limit: 10, sort_order: "ASC", sort_by: "name" };
    const departments = {
      items: [{ id: "d1", name: "Engineering" }],
      total: 1,
      page: 1,
      limit: 10,
      total_pages: 1,
    };
    requestWithAuthMock.mockResolvedValue({ departments });

    const result = await getDepartments(params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DEPARTMENTS_DOCUMENT", { params });
    expect(result).toEqual(departments);
  });
});
