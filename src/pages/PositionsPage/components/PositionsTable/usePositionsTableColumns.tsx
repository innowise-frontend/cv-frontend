import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Modal, TableActions, TableColumnHeader } from "@components/shared";
import { PositionsQuery } from "@services/graphql/__generated__/graphql";
import { DeletePositionModal, UpdatePositionModal } from "..";

type PositionTableRow = PositionsQuery["positions"]["items"][number];

export const usePositionsTableColumns = () => {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<PositionTableRow>();

  const columns = [
    columnHelper.accessor("name", {
      header: (meta) => (
        <TableColumnHeader
          title={t("page.positions.name")}
          sortOrder={meta.table.options.meta?.currentSort}
          onChangeSorting={meta.table.options.meta?.onSort}
        />
      ),
      cell: ({ row }) => <span>{row.original.name}</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: () => null,
      size: 72,
      cell: ({ row }) => (
        <TableActions
          userId={row.original.id}
          dropdownKeepMounted
          actions={[
            {
              label: (
                <Modal>
                  <UpdatePositionModal positionId={row.original.id} name={row.original.name} />
                </Modal>
              ),
            },
            {
              label: (
                <Modal>
                  <DeletePositionModal name={row.original.name} id={row.original.id} />
                </Modal>
              ),
            },
          ]}
        />
      ),
    }),
  ];

  return { columns };
};
