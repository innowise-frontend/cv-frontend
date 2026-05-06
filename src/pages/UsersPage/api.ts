import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorToastMessage } from "@root/lib";
import { getDepartments } from "@services/departments";
import { getPositions } from "@services/positions";
import { createUser, deleteUser, getUsers, updateUser } from "@services/users";

interface UseUsersApiParams {
  search: string;
  page: number;
  limit: number;
  sort_order: string;
  sort_by: string;
}

export const useUsersApi = ({ search, page, limit, sort_order, sort_by }: UseUsersApiParams) => {
  const { data } = useQuery({
    queryKey: ["users", search, page, limit, sort_order, sort_by],
    queryFn: () => getUsers({ search, page, limit, sort_order, sort_by }),
  });

  return data;
};

export const useCreateUserApi = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });

  return { mutate };
};

export const useUpdateUserApi = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });

  return { mutate };
};

export const useDeleteUserApi = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });

  return { mutate };
};

export const useGetDepartmentsApi = (isAdmin: boolean) => {
  const { data } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    enabled: isAdmin,
  });

  return { data };
};

export const useGetPositionsApi = (isAdmin: boolean) => {
  const { data } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
    enabled: isAdmin,
  });

  return { data };
};
