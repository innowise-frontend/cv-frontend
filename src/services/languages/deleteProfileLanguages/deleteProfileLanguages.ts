import {
  DeleteProfileLanguageDocument,
  DeleteProfileLanguageInput,
  DeleteProfileLanguageMutation,
  DeleteProfileLanguageMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const deleteProfileLanguages = async (language: DeleteProfileLanguageInput) => {
  const response = await requestWithAuth<
    DeleteProfileLanguageMutation,
    DeleteProfileLanguageMutationVariables
  >(DeleteProfileLanguageDocument, {
    language,
  });

  return response.deleteProfileLanguage;
};
