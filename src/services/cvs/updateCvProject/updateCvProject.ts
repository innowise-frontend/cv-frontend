import {
  UpdateCvProjectDocument,
  UpdateCvProjectInput,
  UpdateCvProjectMutation,
  UpdateCvProjectMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const updateCvProject = async (project: UpdateCvProjectInput) => {
  const response = await requestWithAuth<UpdateCvProjectMutation, UpdateCvProjectMutationVariables>(
    UpdateCvProjectDocument,
    { project },
  );

  return response.updateCvProject;
};
