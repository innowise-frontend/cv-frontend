import { useNavigate } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Modal, ROUTES, TableActions, TableColumnHeader } from "@components/shared";
import { CvsByUserIdQuery } from "@services/graphql/__generated__/graphql";
import { DeleteCvModal, UpdateCvModal } from "../../components";

type CvsTableRow = CvsByUserIdQuery["cvsByUserId"]["items"][number];

export const useCvsTableColumns = () => {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<CvsTableRow>();
  const navigate = useNavigate();

  const columns = [
    columnHelper.accessor("name", {
      header: (meta) => (
        <TableColumnHeader
          title={t("page.cvs.name")}
          sortOrder={meta.table.options.meta?.currentSort}
          onChangeSorting={meta.table.options.meta?.onSort}
        />
      ),
      cell: ({ row }) => {
        return <span>{row.original.name}</span>;
      },
    }),
    columnHelper.accessor("education", {
      header: () => <TableColumnHeader title={t("page.cvs.education")} />,
      cell: ({ row }) => {
        return <span>{row.original.education}</span>;
      },
    }),
    columnHelper.accessor((row) => row.user?.email ?? "", {
      id: "employee",
      header: () => <TableColumnHeader title={t("page.cvs.employee")} />,
      cell: ({ row }) => {
        return <span>{row.original.user?.email}</span>;
      },
    }),
    columnHelper.display({
      id: "actions",
      header: () => null,
      size: 72,
      cell: ({ row }) => {
        const actions = [
          {
            label: <span className="p-px">{t("page.cvs.view")}</span>,
            onClick: (cvId: string) => {
              navigate({ to: ROUTES.CV_PAGE, params: { cvId } });
            },
          },
          {
            label: (
              <Modal>
                <UpdateCvModal
                  cvId={row.original.id}
                  name={row.original.name ?? ""}
                  education={row.original.education ?? ""}
                  description={row.original.description ?? ""}
                />
              </Modal>
            ),
          },
          {
            label: (
              <Modal>
                <DeleteCvModal cvId={row.original.id} name={row.original.name ?? ""} />
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
