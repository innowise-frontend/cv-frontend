import {
  CvsByUserIdDocument,
  CvsByUserIdQuery,
  CvsByUserIdQueryVariables,
  SearchPaginationInput,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getUserCvs = async (params: SearchPaginationInput, userId: string) => {
  const response = await requestWithAuth<CvsByUserIdQuery, CvsByUserIdQueryVariables>(
    CvsByUserIdDocument,
    { params, userId },
  );

  return response.cvsByUserId;
};
