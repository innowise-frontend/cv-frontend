import { describe, expect, it, vi } from "vitest";
import { updateProject } from "./updateProject";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  UpdateProjectDocument: "UPDATE_PROJECT_DOCUMENT",
}));

describe("updateProject service", () => {
  it("sends update payload and returns updated project", async () => {
    const project = {
      projectId: "p1",
      name: "CV Platform",
      domain: "Web",
      description: "Desc",
      start_date: "2025-01-01",
      end_date: null,
      environment: ["React"],
    };
    requestWithAuthMock.mockResolvedValue({
      updateProject: { id: "p1", name: "CV Platform" },
    });

    const result = await updateProject(project);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_PROJECT_DOCUMENT", { project });
    expect(result).toEqual({ id: "p1", name: "CV Platform" });
  });
});
