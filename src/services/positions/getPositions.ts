import {
  PositionsDocument,
  PositionsQuery,
  PositionsQueryVariables,
} from "../graphql/__generated__/graphql";
import { requestWithAuth } from "../graphql/client";

export const getPositions = async () => {
  const response = await requestWithAuth<PositionsQuery, PositionsQueryVariables>(
    PositionsDocument,
  );

  return response.positions;
};
