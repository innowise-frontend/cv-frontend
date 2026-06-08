import {
  DeleteProjectDocument,
  DeleteProjectInput,
  DeleteProjectMutation,
  DeleteProjectMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const deleteProject = async (project: DeleteProjectInput) => {
  const response = await requestWithAuth<DeleteProjectMutation, DeleteProjectMutationVariables>(
    DeleteProjectDocument,
    { project },
  );

  return response.deleteProject;
};
