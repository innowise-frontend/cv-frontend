import {
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const updateUser = async (user: UpdateUserInput) => {
  const response = await requestWithAuth<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    {
      user,
    },
  );

  return response.updateUser;
};
