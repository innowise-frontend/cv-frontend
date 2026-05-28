import {
  PositionsDocument,
  PositionsQuery,
  PositionsQueryVariables,
  SearchPaginationInput,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getPositions = async (params: SearchPaginationInput) => {
  const response = await requestWithAuth<PositionsQuery, PositionsQueryVariables>(
    PositionsDocument,
    {
      params,
    },
  );

  return response.positions;
};
