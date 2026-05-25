import {
  CvsDocument,
  CvsQuery,
  CvsQueryVariables,
  SearchPaginationInput,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getCvs = async (params: SearchPaginationInput) => {
  const response = await requestWithAuth<CvsQuery, CvsQueryVariables>(CvsDocument, { params });

  return response.cvs;
};
