import {
  CreateCvDocument,
  CreateCvInput,
  CreateCvMutation,
  CreateCvMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const createCv = async (cv: CreateCvInput) => {
  const response = await requestWithAuth<CreateCvMutation, CreateCvMutationVariables>(
    CreateCvDocument,
    {
      cv,
    },
  );

  return response.createCv;
};
