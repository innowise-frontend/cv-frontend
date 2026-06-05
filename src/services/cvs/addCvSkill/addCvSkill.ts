import {
  AddCvSkillDocument,
  AddCvSkillInput,
  AddCvSkillMutation,
  AddCvSkillMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const addCvSkill = async (skill: AddCvSkillInput) => {
  const response = await requestWithAuth<AddCvSkillMutation, AddCvSkillMutationVariables>(
    AddCvSkillDocument,
    { skill },
  );

  return response.addCvSkill;
};
