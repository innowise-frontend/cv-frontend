import {
  DeleteLanguageDocument,
  DeleteLanguageInput,
  DeleteLanguageMutation,
  DeleteLanguageMutationVariables,
} from "@root/services/graphql/__generated__/graphql";
import { requestWithAuth } from "@root/services/graphql/client";

export const deleteLanguage = async (language: DeleteLanguageInput) => {
  const response = await requestWithAuth<DeleteLanguageMutation, DeleteLanguageMutationVariables>(
    DeleteLanguageDocument,
    { language },
  );

  return response.deleteLanguage;
};
