import { describe, expect, it, vi } from "vitest";
import { deleteProject } from "./deleteProject";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  DeleteProjectDocument: "DELETE_PROJECT_DOCUMENT",
}));

describe("deleteProject service", () => {
  it("sends delete payload and returns affected count", async () => {
    const project = { projectId: "p1" };
    requestWithAuthMock.mockResolvedValue({
      deleteProject: { affected: 1 },
    });

    const result = await deleteProject(project);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_PROJECT_DOCUMENT", { project });
    expect(result).toEqual({ affected: 1 });
  });
});
