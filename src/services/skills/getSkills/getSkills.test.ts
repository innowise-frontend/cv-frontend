import { describe, expect, it, vi } from "vitest";
import { getSkills } from "./getSkills";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  SkillsDocument: "SKILLS_DOCUMENT",
}));

describe("getSkills", () => {
  it("requests skills with pagination params and returns skills payload", async () => {
    const params = {
      search: "react",
      page: 1,
      limit: 10,
      sort_order: "ASC",
      sort_by: "name",
    } as const;
    requestWithAuthMock.mockResolvedValue({
      skills: { items: [{ id: "s1", name: "React" }], total_pages: 1 },
    });

    const result = await getSkills(params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("SKILLS_DOCUMENT", { params });
    expect(result).toEqual({ items: [{ id: "s1", name: "React" }], total_pages: 1 });
  });
});
