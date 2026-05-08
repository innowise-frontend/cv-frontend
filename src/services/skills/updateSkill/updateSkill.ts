import type {
  Skill,
  UpdateSkillInput,
  UpdateSkillMutation,
  UpdateSkillMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { UpdateSkillDocument } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const updateSkill = async (skill: UpdateSkillInput): Promise<Skill> => {
  const response = await requestWithAuth<UpdateSkillMutation, UpdateSkillMutationVariables>(
    UpdateSkillDocument,
    { skill },
  );

  return response.updateSkill as Skill;
};
