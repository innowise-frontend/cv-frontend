import {
  DeletePositionDocument,
  DeletePositionInput,
  DeletePositionMutation,
  DeletePositionMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const deletePosition = async (position: DeletePositionInput) => {
  const response = await requestWithAuth<DeletePositionMutation, DeletePositionMutationVariables>(
    DeletePositionDocument,
    { position },
  );

  return response.deletePosition;
};
