import {
  CvsByUserIdDocument,
  CvsByUserIdQuery,
  CvsByUserIdQueryVariables,
  SearchPaginationInput,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getUserCvs = async (userId: string, params: SearchPaginationInput) => {
  const response = await requestWithAuth<CvsByUserIdQuery, CvsByUserIdQueryVariables>(
    CvsByUserIdDocument,
    { userId, params },
  );

  return response.cvsByUserId;
};
