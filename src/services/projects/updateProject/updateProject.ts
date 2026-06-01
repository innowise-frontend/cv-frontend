import {
  UpdateProjectDocument,
  UpdateProjectInput,
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const updateProject = async (project: UpdateProjectInput) => {
  const response = await requestWithAuth<UpdateProjectMutation, UpdateProjectMutationVariables>(
    UpdateProjectDocument,
    { project },
  );

  return response.updateProject;
};
