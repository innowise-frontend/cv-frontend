import { describe, expect, it, vi } from "vitest";
import { createProject } from "./createProject";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CreateProjectDocument: "CREATE_PROJECT_DOCUMENT",
}));

describe("createProject service", () => {
  it("sends create payload and returns created project", async () => {
    const project = {
      name: "CV App",
      domain: "Web",
      description: "Desc",
      start_date: "2025-01-01",
      end_date: null,
      environment: ["React"],
    };
    requestWithAuthMock.mockResolvedValue({
      createProject: { id: "p1", name: "CV App" },
    });

    const result = await createProject(project);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CREATE_PROJECT_DOCUMENT", { project });
    expect(result).toEqual({ id: "p1", name: "CV App" });
  });
});
