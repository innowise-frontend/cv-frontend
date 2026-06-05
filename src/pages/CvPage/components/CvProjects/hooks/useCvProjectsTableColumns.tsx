import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import {
  formatProjectDateDisplay,
  Modal,
  TableActions,
  TableColumnHeader,
} from "@components/shared";
import { DeleteProjectModal, UpdateProjectModal } from "@pages/ProjectsPage/components";
import type { ProjectsTableRow } from "@pages/ProjectsPage/components/ProjectsTable/types";
import { SortOrder } from "@root/constants";
import type { CvProjectsSortBy } from "../types";
import type { ReactNode } from "react";

export type CvProjectsTableColumnsOptions = {
  currentSort: SortOrder;
  currentSortBy: CvProjectsSortBy;
  onSort: (sortBy: CvProjectsSortBy) => void;
  renderUpdateModal?: (row: ProjectsTableRow) => ReactNode;
  renderDeleteModal?: (row: ProjectsTableRow) => ReactNode;
};

export const useCvProjectsTableColumns = ({
  currentSort,
  currentSortBy,
  onSort,
  renderUpdateModal,
  renderDeleteModal,
}: CvProjectsTableColumnsOptions) => {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<ProjectsTableRow>();

  const getSortOrder = (column: CvProjectsSortBy) =>
    currentSortBy === column ? currentSort : undefined;

  const columns = [
    columnHelper.accessor("name", {
      header: () => (
        <TableColumnHeader
          title={t("page.projects.name")}
          sortOrder={getSortOrder("name")}
          onChangeSorting={() => onSort("name")}
        />
      ),
      cell: ({ row }) => <span>{row.original.name}</span>,
    }),
    columnHelper.accessor("domain", {
      header: () => (
        <TableColumnHeader
          title={t("page.projects.domain")}
          sortOrder={getSortOrder("domain")}
          onChangeSorting={() => onSort("domain")}
        />
      ),
      cell: ({ row }) => <span>{row.original.domain}</span>,
    }),
    columnHelper.accessor("start_date", {
      header: () => <TableColumnHeader title={t("page.projects.startDate")} />,
      cell: ({ row }) => (
        <span>{formatProjectDateDisplay(row.original.start_date) || row.original.start_date}</span>
      ),
    }),
    columnHelper.accessor("end_date", {
      header: () => (
        <TableColumnHeader
          title={t("page.projects.endDate")}
          sortOrder={getSortOrder("end_date")}
          onChangeSorting={() => onSort("end_date")}
        />
      ),
      cell: ({ row }) => (
        <span>
          {row.original.end_date
            ? formatProjectDateDisplay(row.original.end_date) || row.original.end_date
            : t("page.projects.tillNow")}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => null,
      size: 72,
      cell: ({ row }) => {
        const actions = [
          {
            label: (
              <Modal>
                {renderUpdateModal ? (
                  renderUpdateModal(row.original)
                ) : (
                  <UpdateProjectModal
                    projectId={row.original.id}
                    initialValues={{
                      name: row.original.name ?? "",
                      domain: row.original.domain ?? "",
                      description: row.original.description ?? "",
                      startDate: formatProjectDateDisplay(row.original.start_date),
                      endDate: formatProjectDateDisplay(row.original.end_date),
                      environment: row.original.environment ?? [],
                      roles: [],
                    }}
                  />
                )}
              </Modal>
            ),
          },
          {
            label: (
              <Modal>
                {renderDeleteModal ? (
                  renderDeleteModal(row.original)
                ) : (
                  <DeleteProjectModal projectId={row.original.id} name={row.original.name ?? ""} />
                )}
              </Modal>
            ),
          },
        ];

        return <TableActions dropdownKeepMounted userId={row.original.id} actions={actions} />;
      },
    }),
  ];

  return { columns };
};
