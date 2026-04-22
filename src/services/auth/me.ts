import { requestWithAuth } from "@root/services/graphql/client";
import { MeDocument, MeQuery, MeQueryVariables } from "../graphql/__generated__/graphql";

export const getMe = async () => {
  const response = await requestWithAuth<MeQuery, MeQueryVariables>(MeDocument);

  return response.me;
};
