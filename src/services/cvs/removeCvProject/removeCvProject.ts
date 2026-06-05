import {
  RemoveCvProjectDocument,
  RemoveCvProjectInput,
  RemoveCvProjectMutation,
  RemoveCvProjectMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const removeCvProject = async (project: RemoveCvProjectInput) => {
  const response = await requestWithAuth<RemoveCvProjectMutation, RemoveCvProjectMutationVariables>(
    RemoveCvProjectDocument,
    { project },
  );

  return response.removeCvProject;
};
