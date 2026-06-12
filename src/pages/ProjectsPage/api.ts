import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { SortOrder } from "@constants/sortOptions";
import { getErrorToastMessage } from "@root/lib";
import { buildSortParams } from "@root/lib/sorting/toggleTableSort";
import { getPositions } from "@services/positions";
import { createProject, deleteProject, getProjects, updateProject } from "@services/projects";
import { getSkills } from "@services/skills";

const POSITIONS_OPTIONS_LIMIT = 500;

export const useProjectRoleOptionsQuery = (enabled = true) =>
  useQuery({
    queryKey: ["positions", "options"],
    queryFn: () =>
      getPositions({
        page: 1,
        limit: POSITIONS_OPTIONS_LIMIT,
        sort_order: SortOrder.ASC,
        sort_by: "name",
      }),
    select: (data) => data.items.map((position) => ({ value: position.id, label: position.name })),
    enabled,
  });

export const useProjectsTableQuery = ({
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
    queryKey: ["projects", search, page, limit, sortOrder],
    queryFn: () =>
      getProjects({
        search,
        page,
        limit,
        ...buildSortParams(sortOrder, "name"),
      }),
  });

export const useCreateProjectMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(t("page.projects.toast.created"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateProjectMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(t("page.projects.toast.updated"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteProjectMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(t("page.projects.toast.deleted"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useProjectSkillsQuery = () =>
  useQuery({
    queryKey: ["projects", "skills-options"],
    queryFn: () =>
      getSkills({
        page: 1,
        limit: 100,
        sort_order: SortOrder.ASC,
        sort_by: "name",
      }),
  });
