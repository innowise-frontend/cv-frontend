import { describe, expect, it } from "vitest";
import type { SkillCategory, SkillMastery } from "@services/graphql/__generated__/graphql";
import { buildCategoryNameById, groupSkillsByCategory } from "./const";

const makeCategory = (id: string, name: string, children: SkillCategory[] = []): SkillCategory =>
  ({
    id,
    name,
    children,
    parent: null,
  }) as unknown as SkillCategory;

const makeSkill = (name: string, categoryId: string | null): SkillMastery =>
  ({
    name,
    categoryId,
    mastery: "Novice",
  }) as unknown as SkillMastery;

describe("buildCategoryNameById", () => {
  it("returns an empty map for undefined input", () => {
    expect(buildCategoryNameById(undefined).size).toBe(0);
  });

  it("maps flat categories by id", () => {
    const cats = [makeCategory("c1", "Frontend"), makeCategory("c2", "Backend")];
    const map = buildCategoryNameById(cats);

    expect(map.get("c1")).toBe("Frontend");
    expect(map.get("c2")).toBe("Backend");
  });

  it("traverses nested children", () => {
    const child = makeCategory("child1", "React");
    const root = makeCategory("root1", "Frontend", [child]);
    const map = buildCategoryNameById([root]);

    expect(map.get("root1")).toBe("Frontend");
    expect(map.get("child1")).toBe("React");
  });
});

describe("groupSkillsByCategory", () => {
  it("returns empty array for no skills", () => {
    expect(groupSkillsByCategory([], new Map(), "Other")).toEqual([]);
    expect(groupSkillsByCategory(undefined, new Map(), "Other")).toEqual([]);
  });

  it("groups skills with a known category", () => {
    const map = new Map([["c1", "Frontend"]]);
    const skills = [makeSkill("React", "c1"), makeSkill("Vue", "c1")];

    const groups = groupSkillsByCategory(skills, map, "Other");

    expect(groups).toHaveLength(1);
    expect(groups[0].categoryName).toBe("Frontend");
    expect(groups[0].skills).toHaveLength(2);
  });

  it("places skills with unknown categoryId in the uncategorized bucket", () => {
    const map = new Map([["c1", "Frontend"]]);
    const skills = [makeSkill("Unknown", "c99")];

    const groups = groupSkillsByCategory(skills, map, "Other");

    expect(groups).toHaveLength(1);
    expect(groups[0].categoryId).toBeNull();
    expect(groups[0].categoryName).toBe("Other");
  });

  it("puts uncategorized group last", () => {
    const map = new Map([["c1", "Frontend"]]);
    const skills = [makeSkill("Orphan", null), makeSkill("React", "c1")];

    const groups = groupSkillsByCategory(skills, map, "Other");

    expect(groups[0].categoryName).toBe("Frontend");
    expect(groups[1].categoryName).toBe("Other");
  });

  it("handles skills with null categoryId as uncategorized", () => {
    const skills = [makeSkill("Misc", null)];

    const groups = groupSkillsByCategory(skills, new Map(), "Other");

    expect(groups).toHaveLength(1);
    expect(groups[0].categoryId).toBeNull();
    expect(groups[0].categoryName).toBe("Other");
  });
});
