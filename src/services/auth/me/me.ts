import { MeDocument, MeQuery, MeQueryVariables } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getMe = async () => {
  const response = await requestWithAuth<MeQuery, MeQueryVariables>(MeDocument);

  return response.me;
};
