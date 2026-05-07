import type {
  DeleteResult,
  DeleteSkillInput,
  DeleteSkillMutation,
  DeleteSkillMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { DeleteSkillDocument } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const deleteSkill = async (skill: DeleteSkillInput): Promise<DeleteResult> => {
  const response = await requestWithAuth<DeleteSkillMutation, DeleteSkillMutationVariables>(
    DeleteSkillDocument,
    { skill },
  );

  return response.deleteSkill;
};
