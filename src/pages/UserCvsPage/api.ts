import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { t } from "i18next";
import { toast } from "sonner";
import { SortOrder } from "@root/constants";
import { useAuth } from "@root/hooks";
import { getErrorToastMessage } from "@root/lib";
import { createCv, deleteCv, getCvs, getUserCvs, updateCv } from "@services/cvs";
import {
  CreateCvInput,
  DeleteCvInput,
  UpdateCvInput,
} from "@services/graphql/__generated__/graphql";

type CvsQueryResult = Awaited<ReturnType<typeof getCvs>>;

type CvsQueryConfig = Omit<UseQueryOptions<CvsQueryResult>, "queryKey" | "queryFn">;

interface UseCvsTableQueryParams {
  search: string;
  page: number;
  limit: number;
  sortOrder: SortOrder;
  config?: CvsQueryConfig;
}

export const useCvsTableQuery = ({
  search,
  page,
  limit,
  sortOrder,
  config,
}: UseCvsTableQueryParams) => {
  const { userId: routeUserId } = useParams({ strict: false });
  const { isAdmin, userId: authUserId, isFirstLoad } = useAuth();

  const params = {
    search,
    page,
    limit,
    sort_order: sortOrder,
    sort_by: "name",
  };

  const queryScope = isAdmin ? "all" : routeUserId ? "byUserId" : "me";
  const queryOwnerId = isAdmin ? "all" : (routeUserId ?? authUserId);

  const isEnabled = isAdmin || !!routeUserId || (!routeUserId && !isFirstLoad && !!authUserId);

  return useQuery({
    queryKey: ["cvs", queryScope, queryOwnerId, search, page, limit, sortOrder],
    queryFn: () => {
      if (isAdmin) {
        return getCvs(params);
      }

      if (routeUserId) {
        return getUserCvs(routeUserId, params);
      }

      return getUserCvs(authUserId, params);
    },
    ...config,
    enabled: isEnabled,
  });
};

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
