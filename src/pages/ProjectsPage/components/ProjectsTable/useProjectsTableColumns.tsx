import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import {
  formatProjectDateDisplay,
  Modal,
  TableActions,
  TableColumnHeader,
} from "@components/shared";
import { ProjectsQuery } from "@services/graphql/__generated__/graphql";
import { DeleteProjectModal, UpdateProjectModal } from "..";

type ProjectsTableRow = ProjectsQuery["projects"]["items"][number];

export const useProjectsTableColumns = () => {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<ProjectsTableRow>();

  const columns = [
    columnHelper.accessor("name", {
      header: (meta) => (
        <TableColumnHeader
          title={t("page.projects.name")}
          sortOrder={meta.table.options.meta?.currentSort}
          onChangeSorting={meta.table.options.meta?.onSort}
        />
      ),
      cell: ({ row }) => <span>{row.original.name}</span>,
    }),
    columnHelper.accessor("domain", {
      header: () => <TableColumnHeader title={t("page.projects.domain")} />,
      cell: ({ row }) => <span>{row.original.domain}</span>,
    }),
    columnHelper.accessor("start_date", {
      header: () => <TableColumnHeader title={t("page.projects.startDate")} />,
      cell: ({ row }) => (
        <span>{formatProjectDateDisplay(row.original.start_date) || row.original.start_date}</span>
      ),
    }),
    columnHelper.accessor("end_date", {
      header: () => <TableColumnHeader title={t("page.projects.endDate")} />,
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
                <UpdateProjectModal
                  projectId={row.original.id}
                  initialValues={{
                    name: row.original.name ?? "",
                    domain: row.original.domain ?? "",
                    description: row.original.description ?? "",
                    startDate: formatProjectDateDisplay(row.original.start_date),
                    endDate: formatProjectDateDisplay(row.original.end_date),
                    environment: row.original.environment ?? [],
                  }}
                />
              </Modal>
            ),
          },
          {
            label: (
              <Modal>
                <DeleteProjectModal projectId={row.original.id} name={row.original.name ?? ""} />
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
