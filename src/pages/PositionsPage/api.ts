import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SortOrder } from "@constants/sortOptions";
import { getErrorToastMessage } from "@root/lib";
import {
  CreatePositionInput,
  DeletePositionInput,
  PositionsQuery,
  UpdatePositionInput,
} from "@services/graphql/__generated__/graphql";
import { createPosition, deletePosition, getPositions, updatePosition } from "@services/positions";

type Position = PositionsQuery["positions"][number];

const paginatePositions = (
  positions: Position[],
  {
    search,
    page,
    limit,
    sortOrder,
  }: {
    search: string;
    page: number;
    limit: number;
    sortOrder: SortOrder;
  },
) => {
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = normalizedSearch
    ? positions.filter((position) => position.name.toLowerCase().includes(normalizedSearch))
    : positions;

  const sorted = [...filtered].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);

    return sortOrder === SortOrder.ASC ? comparison : -comparison;
  });

  const total_pages = sorted.length === 0 ? 0 : Math.ceil(sorted.length / limit);
  const start = (page - 1) * limit;

  return {
    items: sorted.slice(start, start + limit),
    total_pages,
  };
};

export const usePositionsQuery = () =>
  useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
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
    queryFn: getPositions,
    select: (positions) => paginatePositions(positions, { search, page, limit, sortOrder }),
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
