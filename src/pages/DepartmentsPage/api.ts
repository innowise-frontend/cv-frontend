import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SortOrder } from "@constants/sortOptions";
import { buildSortParams } from "@root/lib/sorting/toggleTableSort";
import { getErrorToastMessage } from "@root/lib";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "@services/departments";
import type {
  CreateDepartmentInput,
  DeleteDepartmentInput,
  DeleteResult,
  UpdateDepartmentInput,
} from "@services/graphql/__generated__/graphql";
import { MutationDepartmentProps } from "./types";

export const useDepartmentsTableQuery = ({
  search,
  page,
  limit,
  sortOrder,
}: {
  search: string;
  page: number;
  limit: number;
  sortOrder?: SortOrder;
}) =>
  useQuery({
    queryKey: ["departments", search, page, limit, sortOrder],
    queryFn: () =>
      getDepartments({
        search,
        page,
        limit,
        ...buildSortParams(sortOrder, "name"),
      }),
  });

export const useCreateDepartmentMutation = ({ onSuccess }: MutationDepartmentProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: CreateDepartmentInput) => createDepartment(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success(t("page.departments.toast.created"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateDepartmentMutation = ({ onSuccess }: MutationDepartmentProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: UpdateDepartmentInput) => updateDepartment(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success(t("page.departments.toast.updated"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteDepartmentMutation = ({ onSuccess }: MutationDepartmentProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: DeleteDepartmentInput): Promise<DeleteResult> =>
      deleteDepartment(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success(t("page.departments.toast.deleted"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};
