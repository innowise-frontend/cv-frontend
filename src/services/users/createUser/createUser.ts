import {
  CreateUserDocument,
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const createUser = async (user: CreateUserInput) => {
  const response = await requestWithAuth<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    { user },
  );

  return response.createUser;
};
