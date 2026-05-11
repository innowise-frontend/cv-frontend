import {
  SearchPaginationInput,
  UsersDocument,
  UsersQuery,
  UsersQueryVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getUsers = async (params: SearchPaginationInput) => {
  const response = await requestWithAuth<UsersQuery, UsersQueryVariables>(UsersDocument, {
    params,
  });

  return response.users;
};
