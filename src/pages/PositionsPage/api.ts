import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SortOrder } from "@constants/sortOptions";
import { getErrorToastMessage } from "@root/lib";
import {
  CreatePositionInput,
  DeletePositionInput,
  UpdatePositionInput,
} from "@services/graphql/__generated__/graphql";
import { createPosition, deletePosition, getPositions, updatePosition } from "@services/positions";

export const usePositionsQuery = () =>
  useQuery({
    queryKey: ["positions"],
    queryFn: () => getPositions({ page: 1, limit: 100 }),
  });

export const usePositionsTableQuery = ({
  search,
  page,
  limit,
  sortOrder,
}: {
  search: string;
  page: number;
  limit: number;
  sortOrder: SortOrder;
}) =>
  useQuery({
    queryKey: ["positions", search, page, limit, sortOrder],
    queryFn: () =>
      getPositions({
        search,
        page,
        limit,
        sort_order: sortOrder,
        sort_by: "name",
      }),
  });

export const useCreatePositionMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePositionInput) => createPosition(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["positions"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdatePositionMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePositionInput) => updatePosition(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["positions"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeletePositionMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeletePositionInput) => deletePosition(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["positions"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};
