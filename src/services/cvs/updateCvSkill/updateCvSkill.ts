import {
  UpdateCvSkillDocument,
  UpdateCvSkillInput,
  UpdateCvSkillMutation,
  UpdateCvSkillMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const updateCvSkill = async (skill: UpdateCvSkillInput) => {
  const response = await requestWithAuth<UpdateCvSkillMutation, UpdateCvSkillMutationVariables>(
    UpdateCvSkillDocument,
    { skill },
  );

  return response.updateCvSkill;
};
