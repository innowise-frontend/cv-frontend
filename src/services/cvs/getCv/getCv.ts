import type { Cv } from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

const CV_QUERY = `
  query Cv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        email
      }
    }
  }
`;

export const getCv = async (cvId: string): Promise<Cv> => {
  const response = await requestWithAuth<{ cv: Cv }, { cvId: string }>(CV_QUERY, { cvId });

  return response.cv;
};
