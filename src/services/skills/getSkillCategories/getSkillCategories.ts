import type {
  SkillCategory,
  SkillCategoriesQuery,
  SkillCategoriesQueryVariables,
} from "@services/graphql/__generated__/graphql";
import { SkillCategoriesDocument } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getSkillCategories = async (): Promise<SkillCategory[]> => {
  const response = await requestWithAuth<SkillCategoriesQuery, SkillCategoriesQueryVariables>(
    SkillCategoriesDocument,
  );

  return response.skillCategories as SkillCategory[];
};
