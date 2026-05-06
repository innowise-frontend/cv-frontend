import {
  DeleteUserDocument,
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const deleteUser = async (userId: string) => {
  const response = await requestWithAuth<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    {
      userId,
    },
  );

  return response.deleteUser;
};
