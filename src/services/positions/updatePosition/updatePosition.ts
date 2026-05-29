import {
  UpdatePositionDocument,
  UpdatePositionInput,
  UpdatePositionMutation,
  UpdatePositionMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const updatePosition = async (position: UpdatePositionInput) => {
  const response = await requestWithAuth<UpdatePositionMutation, UpdatePositionMutationVariables>(
    UpdatePositionDocument,
    {
      position,
    },
  );

  return response.updatePosition;
};
