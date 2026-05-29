import {
  CreatePositionDocument,
  CreatePositionInput,
  CreatePositionMutation,
  CreatePositionMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const createPosition = async (position: CreatePositionInput) => {
  const response = await requestWithAuth<CreatePositionMutation, CreatePositionMutationVariables>(
    CreatePositionDocument,
    {
      position,
    },
  );

  return response.createPosition;
};
