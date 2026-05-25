import {
  DeleteCvDocument,
  DeleteCvInput,
  DeleteCvMutation,
  DeleteCvMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const deleteCv = async (cv: DeleteCvInput) => {
  const response = await requestWithAuth<DeleteCvMutation, DeleteCvMutationVariables>(
    DeleteCvDocument,
    {
      cv,
    },
  );

  return response.deleteCv;
};
