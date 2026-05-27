import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorToastMessage } from "@root/lib";
import { submitUpdateProfile } from "@services/auth/updateUserProfile/updateUserProfile";
import { getDepartments } from "@services/departments";
import type { UpdateProfileInput } from "@services/graphql/__generated__/graphql";
import { getPositions } from "@services/positions";
import { createUser, deleteUser, getUsers, updateUser } from "@services/users";

interface UseUsersApiParams {
  search: string;
  page: number;
  limit: number;
  sort_order: string;
  sort_by: string;
}

export const useUsersApi = ({ search, page, limit, sort_order, sort_by }: UseUsersApiParams) =>
  useQuery({
    queryKey: ["users", search, page, limit, sort_order, sort_by],
    queryFn: () => getUsers({ search, page, limit, sort_order, sort_by }),
  });

export const useCreateUserApi = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateUserApi = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", variables.userId] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateProfileApi = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: UpdateProfileInput) => submitUpdateProfile(profile),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", variables.userId] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteUserApi = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

type UseGetDepartmentsApiConfig = Omit<
  UseQueryOptions<Awaited<ReturnType<typeof getDepartments>>>,
  "queryKey" | "queryFn"
>;

export const useGetDepartmentsApi = (config: UseGetDepartmentsApiConfig) =>
  useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments({ page: 1, limit: 100 }),
    ...config,
  });

type UseGetPositionsApiConfig = Omit<
  UseQueryOptions<Awaited<ReturnType<typeof getPositions>>>,
  "queryKey" | "queryFn"
>;

export const useGetPositionsApi = (config: UseGetPositionsApiConfig) =>
  useQuery({
    queryKey: ["positions"],
    queryFn: () => getPositions({ page: 1, limit: 100 }),
    ...config,
  });
