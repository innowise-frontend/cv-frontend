import {
  LanguagesDocument,
  LanguagesQuery,
  LanguagesQueryVariables,
  SearchPaginationInput,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const getLanguages = async (params: SearchPaginationInput) => {
  const response = await requestWithAuth<LanguagesQuery, LanguagesQueryVariables>(
    LanguagesDocument,
    {
      params,
    },
  );

  return response.languages;
};
