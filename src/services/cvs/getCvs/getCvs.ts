import { CvsDocument, CvsQuery, CvsQueryVariables } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getCvs = async () => {
  const response = await requestWithAuth<CvsQuery, CvsQueryVariables>(CvsDocument, {});

  return response.cvs;
};
