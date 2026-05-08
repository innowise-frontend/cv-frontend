import { SkillCategoriesQuery, SkillsQuery } from "@services/graphql/__generated__/graphql";

export type CategoryById = Map<string, SkillCategoriesQuery["skillCategories"][number]>;
export type SkillTableRow = SkillsQuery["skills"]["items"][number];
export type SkillCategoriesData = SkillCategoriesQuery["skillCategories"];
