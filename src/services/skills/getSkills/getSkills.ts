import type {
  SearchPaginationInput,
  SkillsQuery,
  SkillsQueryVariables,
} from "@services/graphql/__generated__/graphql";
import { SkillsDocument } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getSkills = async (params: SearchPaginationInput) => {
  const response = await requestWithAuth<SkillsQuery, SkillsQueryVariables>(SkillsDocument, {
    params,
  });

  return response.skills;
};
