import {
  AddProfileSkillDocument,
  AddProfileSkillInput,
  AddProfileSkillMutation,
  AddProfileSkillMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const addProfileSkill = async (skill: AddProfileSkillInput) => {
  const response = await requestWithAuth<AddProfileSkillMutation, AddProfileSkillMutationVariables>(
    AddProfileSkillDocument,
    { skill },
  );

  return response.addProfileSkill;
};
