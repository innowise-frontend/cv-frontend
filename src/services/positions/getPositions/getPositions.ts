import {
  PositionsDocument,
  PositionsQuery,
  PositionsQueryVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getPositions = async () => {
  const response = await requestWithAuth<PositionsQuery, PositionsQueryVariables>(
    PositionsDocument,
  );

  return response.positions;
};
