import {
  DeleteProfileSkillDocument,
  DeleteProfileSkillInput,
  DeleteProfileSkillMutation,
  DeleteProfileSkillMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const deleteProfileSkills = async (skill: DeleteProfileSkillInput) => {
  const response = await requestWithAuth<
    DeleteProfileSkillMutation,
    DeleteProfileSkillMutationVariables
  >(DeleteProfileSkillDocument, { skill });

  return response.deleteProfileSkill;
};
