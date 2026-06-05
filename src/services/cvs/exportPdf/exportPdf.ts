import {
  ExportPdfDocument,
  ExportPdfInput,
  ExportPdfMutation,
  ExportPdfMutationVariables,
} from "@services/graphql/__generated__/graphql";
import { requestWithAuth } from "@services/graphql/client";

export const exportPdf = async (pdf: ExportPdfInput) => {
  const response = await requestWithAuth<ExportPdfMutation, ExportPdfMutationVariables>(
    ExportPdfDocument,
    { pdf },
  );

  return response.exportPdf;
};
