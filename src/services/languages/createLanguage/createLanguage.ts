import {
  CreateLanguageDocument,
  CreateLanguageInput,
  CreateLanguageMutation,
  CreateLanguageMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const createLanguage = async (language: CreateLanguageInput) => {
  const response = await requestWithAuth<CreateLanguageMutation, CreateLanguageMutationVariables>(
    CreateLanguageDocument,
    {
      language,
    },
  );

  return response.createLanguage;
};
