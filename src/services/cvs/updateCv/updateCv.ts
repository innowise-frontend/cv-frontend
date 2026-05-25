import {
  UpdateCvDocument,
  UpdateCvInput,
  UpdateCvMutation,
  UpdateCvMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const updateCv = async (cv: UpdateCvInput) => {
  const response = await requestWithAuth<UpdateCvMutation, UpdateCvMutationVariables>(
    UpdateCvDocument,
    {
      cv,
    },
  );

  return response.updateCv;
};
