import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { SortOrder } from "@root/constants";
import { getErrorToastMessage } from "@root/lib";
import { createCv, deleteCv, getCvs, updateCv } from "@services/cvs";
import {
  CreateCvInput,
  DeleteCvInput,
  UpdateCvInput,
} from "@services/graphql/__generated__/graphql";

type CvsQueryConfig = Omit<
  UseQueryOptions<Awaited<ReturnType<typeof getCvs>>>,
  "queryKey" | "queryFn"
>;

interface UseCvsTableQueryParams {
  userId: string;
  search: string;
  page: number;
  limit: number;
  sortOrder: SortOrder;
  config?: CvsQueryConfig;
}

export const useCvsTableQuery = ({
  userId,
  search,
  page,
  limit,
  sortOrder,
  config,
}: UseCvsTableQueryParams) =>
  useQuery({
    queryKey: ["cvs", userId, search, page, limit, sortOrder],
    queryFn: () =>
      getCvs({ search, page: page, limit: limit, sort_order: sortOrder, sort_by: "name" }, userId),
    ...config,
  });

export const useCreateCvMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cv: CreateCvInput) => createCv(cv),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cvs"] });
      onSuccess?.();
      toast.success(t("page.cvs.createCvSuccess"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateCvMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cv: UpdateCvInput) => updateCv(cv),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cvs"] });
      onSuccess?.();
      toast.success(t("page.cvs.updateCvSuccess"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteCvMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cv: DeleteCvInput) => deleteCv(cv),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cvs"] });
      onSuccess?.();
      toast.success(t("page.cvs.deleteCvSuccess"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};
