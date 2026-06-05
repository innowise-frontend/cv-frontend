import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { t } from "i18next";
import { toast } from "sonner";
import { useProjectRoleOptionsQuery } from "@pages/ProjectsPage/api";
import { SortOrder } from "@root/constants";
import { getErrorToastMessage } from "@root/lib";
import { addCvProject, getCv, removeCvProject, updateCvProject } from "@services/cvs";
import {
  AddCvProjectInput,
  RemoveCvProjectInput,
  UpdateCvProjectInput,
} from "@services/graphql/__generated__/graphql";
import { getProjects } from "@services/projects";
import { type CvProjectsSortBy } from "./types";
import { filterAndPaginateCvProjects, mapCvProjectToTableRow } from "./utils";

const PROJECTS_CATALOG_LIMIT = 500;

export const useCvProjectRoleOptionsQuery = () => useProjectRoleOptionsQuery();

export const useCvProjectsCatalogQuery = () =>
  useQuery({
    queryKey: ["projects", "catalog"],
    queryFn: () =>
      getProjects({
        page: 1,
        limit: PROJECTS_CATALOG_LIMIT,
        sort_order: SortOrder.ASC,
        sort_by: "name",
      }),
  });

export const useCvProjectsTableQuery = ({
  search,
  page,
  limit,
  sortOrder,
  sortBy,
}: {
  search: string;
  page: number;
  limit: number;
  sortOrder: SortOrder;
  sortBy: CvProjectsSortBy;
}) => {
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });

  return useQuery({
    queryKey: ["cv", cvId, "projects-table", search, page, limit, sortOrder, sortBy],
    queryFn: async () => {
      const cv = await getCv(cvId);
      const rows = (cv.projects ?? []).map((project) => ({
        ...mapCvProjectToTableRow(project),
        responsibilities: project.responsibilities ?? [],
        roles: project.roles ?? [],
      }));

      return filterAndPaginateCvProjects({
        projects: rows,
        search,
        page,
        limit,
        sortOrder,
        sortBy,
      });
    },
    enabled: Boolean(cvId),
  });
};

export const useAddCvProjectMutation = ({
  cvId,
  onSuccess,
}: {
  cvId: string;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: AddCvProjectInput) => addCvProject(project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cv", cvId] });
      toast.success(t("page.cvs.projects.toast.added"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateCvProjectMutation = ({
  cvId,
  onSuccess,
}: {
  cvId: string;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: UpdateCvProjectInput) => updateCvProject(project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cv", cvId] });
      toast.success(t("page.cvs.projects.toast.updated"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useRemoveCvProjectMutation = ({
  cvId,
  onSuccess,
}: {
  cvId: string;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: RemoveCvProjectInput) => removeCvProject(project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cv", cvId] });
      toast.success(t("page.cvs.projects.toast.removed"));
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};
