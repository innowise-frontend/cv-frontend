import {
  CreateProjectDocument,
  CreateProjectInput,
  CreateProjectMutation,
  CreateProjectMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const createProject = async (project: CreateProjectInput) => {
  const response = await requestWithAuth<CreateProjectMutation, CreateProjectMutationVariables>(
    CreateProjectDocument,
    { project },
  );

  return response.createProject;
};
