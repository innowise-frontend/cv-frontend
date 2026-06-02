import {
  DeleteCvSkillDocument,
  DeleteCvSkillInput,
  DeleteCvSkillMutation,
  DeleteCvSkillMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const deleteCvSkills = async (skill: DeleteCvSkillInput) => {
  const response = await requestWithAuth<DeleteCvSkillMutation, DeleteCvSkillMutationVariables>(
    DeleteCvSkillDocument,
    { skill },
  );

  return response.deleteCvSkill;
};
