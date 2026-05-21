import { describe, expect, it, vi } from "vitest";
import { getSkillCategories } from "./getSkillCategories";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  SkillCategoriesDocument: "SKILL_CATEGORIES_DOCUMENT",
}));

describe("getSkillCategories", () => {
  it("requests skill categories and returns the list", async () => {
    const categories = [{ id: "c1", name: "Frontend", children: [] }];
    requestWithAuthMock.mockResolvedValue({ skillCategories: categories });

    const result = await getSkillCategories();

    expect(requestWithAuthMock).toHaveBeenCalledWith("SKILL_CATEGORIES_DOCUMENT");
    expect(result).toEqual(categories);
  });
});
