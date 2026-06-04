import { CvDocument, CvQuery, CvQueryVariables } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const getCv = async (cvId: string) => {
  const response = await requestWithAuth<CvQuery, CvQueryVariables>(CvDocument, { cvId });

  return response.cv;
};
