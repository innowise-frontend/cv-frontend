import { describe, expect, it, vi } from "vitest";
import { getProjects } from "./getProjects";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  ProjectsDocument: "PROJECTS_DOCUMENT",
}));

describe("getProjects service", () => {
  it("requests projects with params and returns paginated data", async () => {
    const params = { search: "cv", page: 1, limit: 10, sort_order: "ASC", sort_by: "name" };
    const projects = {
      items: [{ id: "p1", name: "CV App" }],
      total: 1,
      page: 1,
      limit: 10,
      total_pages: 1,
    };
    requestWithAuthMock.mockResolvedValue({ projects });

    const result = await getProjects(params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("PROJECTS_DOCUMENT", { params });
    expect(result).toEqual(projects);
  });
});
