import {
  AddCvProjectDocument,
  AddCvProjectInput,
  AddCvProjectMutation,
  AddCvProjectMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const addCvProject = async (project: AddCvProjectInput) => {
  const response = await requestWithAuth<AddCvProjectMutation, AddCvProjectMutationVariables>(
    AddCvProjectDocument,
    { project },
  );

  return response.addCvProject;
};
