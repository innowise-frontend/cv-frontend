import { describe, expect, it } from "vitest";
import type { SkillCategoriesQuery } from "@services/graphql/__generated__/graphql";
import { findCategory, getCategoryName, getCategoryTypeName } from "./utils";
import type { CategoryById, SkillTableRow } from "./types";

type CategoryEntry = SkillCategoriesQuery["skillCategories"][number];

const makeRow = (categoryId: string | null | undefined): SkillTableRow =>
  ({
    id: "s1",
    name: "Skill",
    category: categoryId ? { id: categoryId } : null,
  }) as unknown as SkillTableRow;

const makeCategory = (name: string, parentName?: string): CategoryEntry => ({
  id: "cat",
  name,
  parent: parentName ? { id: "p", name: parentName } : null,
  children: [],
});

describe("findCategory", () => {
  it("returns undefined when the row has no category", () => {
    const row = makeRow(null);
    expect(findCategory(row, new Map())).toBeUndefined();
  });

  it("returns undefined when categoryId is not in the map", () => {
    const row = makeRow("unknown");
    expect(findCategory(row, new Map())).toBeUndefined();
  });

  it("returns the matching category entry", () => {
    const cat = makeCategory("Frontend");
    const map: CategoryById = new Map([["c1", cat]]);
    const row = makeRow("c1");

    expect(findCategory(row, map)).toBe(cat);
  });
});

describe("getCategoryTypeName", () => {
  it("returns null when category is not found", () => {
    expect(getCategoryTypeName(makeRow("missing"), new Map())).toBeNull();
  });

  it("returns parent name when category has a parent", () => {
    const cat = makeCategory("React", "Frontend");
    const map: CategoryById = new Map([["c1", cat]]);

    expect(getCategoryTypeName(makeRow("c1"), map)).toBe("Frontend");
  });

  it("returns the category name when there is no parent", () => {
    const cat = makeCategory("Frontend");
    const map: CategoryById = new Map([["c1", cat]]);

    expect(getCategoryTypeName(makeRow("c1"), map)).toBe("Frontend");
  });
});

describe("getCategoryName", () => {
  it("returns null when category is not found", () => {
    expect(getCategoryName(makeRow("missing"), new Map())).toBeNull();
  });

  it("returns the category name", () => {
    const cat = makeCategory("React", "Frontend");
    const map: CategoryById = new Map([["c1", cat]]);

    expect(getCategoryName(makeRow("c1"), map)).toBe("React");
  });
});
