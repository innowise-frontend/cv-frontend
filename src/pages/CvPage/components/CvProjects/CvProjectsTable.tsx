import { useLocation, useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@components/shared";
import {
  CreateProjectModal,
  DeleteProjectModal,
  UpdateProjectModal,
} from "@pages/ProjectsPage/components";
import { defaultProjectFormValues } from "@pages/ProjectsPage/components/types";
import { SortOrder, VIEW_OPTIONS } from "@root/constants";
import { useHandleSearch } from "@root/hooks";
import { useCvQuery } from "@root/pages/CvPage/api";
import {
  useAddCvProjectMutation,
  useCvProjectRoleOptionsQuery,
  useCvProjectsCatalogQuery,
  useCvProjectsTableQuery,
  useRemoveCvProjectMutation,
  useUpdateCvProjectMutation,
} from "./api";
import { Responsibilities } from "./components/Responsibilities/Responsibilities";
import { useCvProjectsTableColumns } from "./hooks";
import {
  type CvProjectDateBounds,
  type CvProjectItem,
  type CvProjectsSortBy,
  type ProjectCatalogItem,
} from "./types";
import {
  createAddCvProjectSubmitHandler,
  createUpdateCvProjectSubmitHandler,
  cvUpdateProjectFormValidation,
  toCvProjectFormValues,
} from "./utils";

export const CvProjectsTable = () => {
  const { t } = useTranslation();
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });
  const searchParams = useSearch({ from: "/_app/cvs/$cvId/projects" });
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentSort, setCurrentSort] = useState<SortOrder>(SortOrder.ASC);
  const [currentSortBy, setCurrentSortBy] = useState<CvProjectsSortBy>("name");

  const { data: cv } = useCvQuery(cvId);
  const { data: catalog } = useCvProjectsCatalogQuery();
  const { data: roleOptions = [] } = useCvProjectRoleOptionsQuery();
  const linkedProjectIds = useMemo(
    () => new Set((cv?.projects ?? []).map((project: CvProjectItem) => project.project.id)),
    [cv?.projects],
  );

  const buildNameSelectOptions = (
    catalogItems: ProjectCatalogItem[] | undefined,
    linkedProjectIds: Set<string>,
  ) =>
    (catalogItems ?? [])
      .filter((item) => !linkedProjectIds.has(item.id))
      .map((item) => ({ value: item.id, label: item.name }));

  const nameSelectOptions = useMemo(
    () => buildNameSelectOptions(catalog?.items, linkedProjectIds),
    [catalog?.items, linkedProjectIds],
  );

  const { mutate: addCvProject, isPending: isAdding } = useAddCvProjectMutation({ cvId });
  const { mutate: updateCvProject, isPending: isUpdating } = useUpdateCvProjectMutation({ cvId });
  const { mutate: removeCvProject, isPending: isRemoving } = useRemoveCvProjectMutation({ cvId });

  const cvDisabledFields = {
    domain: true,
    description: true,
    environment: true,
  } as const;

  const cvUpdateDisabledFields = {
    name: true,
    domain: true,
    description: true,
    environment: true,
  } as const;

  const handleSort = (sortBy: CvProjectsSortBy) => {
    if (currentSortBy === sortBy) {
      setCurrentSort((prev) => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
    } else {
      setCurrentSortBy(sortBy);
      setCurrentSort(SortOrder.ASC);
    }

    setCurrentPage(1);
  };

  const handleRemoveCvProjects = (projectId: string, { close }: { close: () => void }) => {
    removeCvProject(
      { cvId, projectId },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  const { columns } = useCvProjectsTableColumns({
    currentSort,
    currentSortBy,
    onSort: handleSort,
    renderUpdateModal: (row) => {
      const rowWithResponsibilities = row as typeof row & {
        responsibilities?: string[];
        roles?: string[];
      };
      const catalogProject = catalog?.items?.find((item) => item.id === row.id);
      const projectDateBounds: CvProjectDateBounds = catalogProject
        ? { startDate: catalogProject.start_date, endDate: catalogProject.end_date }
        : { startDate: row.start_date, endDate: row.end_date };

      return (
        <UpdateProjectModal
          projectId={row.id}
          initialValues={toCvProjectFormValues({
            ...row,
            responsibilities: rowWithResponsibilities.responsibilities,
            roles: rowWithResponsibilities.roles,
          })}
          disabled={cvUpdateDisabledFields}
          nameAsSelect
          showResponsibilities
          roleOptions={roleOptions}
          projectDateBounds={projectDateBounds}
          validationSchema={cvUpdateProjectFormValidation(projectDateBounds)}
          isSubmitting={isUpdating}
          headerTitle={t("page.cvs.projects.updateProject")}
          submitLabel={t("page.cvs.projects.update")}
          onSubmit={createUpdateCvProjectSubmitHandler(cvId, row.id, updateCvProject)}
        />
      );
    },
    renderDeleteModal: (row) => (
      <DeleteProjectModal
        projectId={row.id}
        name={row.name}
        isSubmitting={isRemoving}
        headerTitle={t("page.cvs.projects.removeProject")}
        bodyText={t("page.cvs.projects.confirmRemoveProject", { name: row.name })}
        confirmLabel={t("page.cvs.projects.confirm")}
        onConfirm={handleRemoveCvProjects}
      />
    ),
  });

  const { onSearch } = useHandleSearch({
    searchValue: searchParams.search ?? "",
    onSearchChange: (value) => {
      navigate({
        to: location.pathname,
        search: { search: value.length === 0 ? undefined : value },
        replace: true,
      });
      setCurrentPage(1);
    },
  });

  const { data, isLoading } = useCvProjectsTableQuery({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sortOrder: currentSort,
    sortBy: currentSortBy,
  });

  const tableData = data?.items ?? [];
  const hasActiveSearch = (searchParams.search ?? "").trim().length > 0;
  const emptyMessage = hasActiveSearch ? t("page.table.noResults") : t("page.cvs.projects.noData");

  const handleChangeViewOption = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TableSearch
        action={
          <Modal>
            <CreateProjectModal
              disabled={cvDisabledFields}
              defaultValues={defaultProjectFormValues}
              nameAsSelect
              nameSelectOptions={nameSelectOptions}
              catalogItems={catalog?.items ?? []}
              showResponsibilities
              roleOptions={roleOptions}
              isSubmitting={isAdding}
              headerTitle={t("page.cvs.projects.addProject")}
              submitLabel={t("page.cvs.projects.add")}
              triggerLabel={t("page.cvs.projects.addProject")}
              onSubmit={createAddCvProjectSubmitHandler(cvId, addCvProject)}
            />
          </Modal>
        }
        searchValue={searchParams.search ?? ""}
        onSearch={onSearch}
      />
      <div className="min-h-0 flex-1">
        <Table
          data={tableData}
          columns={columns}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
          pagesAmount={data?.total_pages ?? 0}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          currentSort={currentSort}
          currentSortBy={currentSortBy}
          viewOptions={VIEW_OPTIONS}
          currentViewOption={currentLimit}
          onChangeViewOption={handleChangeViewOption}
          renderSubRow={Responsibilities}
        />
      </div>
    </div>
  );
};
