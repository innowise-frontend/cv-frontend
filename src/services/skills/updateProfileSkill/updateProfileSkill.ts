import {
  UpdateProfileSkillDocument,
  UpdateProfileSkillInput,
  UpdateProfileSkillMutation,
  UpdateProfileSkillMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const updateProfileSkill = async (skill: UpdateProfileSkillInput) => {
  const response = await requestWithAuth<
    UpdateProfileSkillMutation,
    UpdateProfileSkillMutationVariables
  >(UpdateProfileSkillDocument, { skill });

  return response.updateProfileSkill;
};
