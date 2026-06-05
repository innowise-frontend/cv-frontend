import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { getErrorToastMessage } from "@root/lib";
import { addCvSkill, deleteCvSkills, exportPdf, getCv } from "@services/cvs";
import {
  AddCvSkillInput,
  DeleteCvSkillInput,
  ExportPdfInput,
} from "@services/graphql/__generated__/graphql";
import { CvQueryConfig, CvQueryResult } from "./types";

export const useCvQuery = (cvId: string, config?: CvQueryConfig) => {
  return useQuery<CvQueryResult>({
    queryKey: ["cv", cvId],
    queryFn: () => getCv(cvId),
    enabled: Boolean(cvId),
    ...config,
  });
};

export const useAddCvSkillMutation = (
  cvId: string,
  { onSuccess }: { onSuccess?: () => void } = {},
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddCvSkillInput) => addCvSkill(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cv", cvId] });
      onSuccess?.();
      toast.success(t("page.skills.toast.added"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteCvSkillsMutation = (cvId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteCvSkillInput) => deleteCvSkills(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cv", cvId] });
      toast.success(t("page.skills.toast.removed"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useExportCvPdfMutation = () =>
  useMutation({
    mutationFn: (payload: ExportPdfInput) => exportPdf(payload),
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
