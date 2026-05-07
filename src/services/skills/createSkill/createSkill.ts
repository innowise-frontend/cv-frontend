import type {
  CreateSkillInput,
  CreateSkillMutation,
  CreateSkillMutationVariables,
  Skill,
} from "@services/graphql/__generated__/graphql";
import { CreateSkillDocument } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const createSkill = async (skill: CreateSkillInput): Promise<Skill> => {
  const response = await requestWithAuth<CreateSkillMutation, CreateSkillMutationVariables>(
    CreateSkillDocument,
    { skill },
  );

  return response.createSkill as Skill;
};
