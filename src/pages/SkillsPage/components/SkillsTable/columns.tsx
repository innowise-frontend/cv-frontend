import { createColumnHelper } from "@tanstack/react-table";
import { Modal, TableActions, TableColumnHeader } from "@components/shared";
import i18n from "@root/i18n/i18n";
import { SkillsQuery } from "@services/graphql/__generated__/graphql";
import { DeleteSkillModal, UpdateSkillModal } from "../index";

type SkillTableRow = SkillsQuery["skills"]["items"][number];

const columnHelper = createColumnHelper<SkillTableRow>();

export const columns = [
  columnHelper.accessor("name", {
    header: (meta) => (
      <TableColumnHeader
        title={i18n.t("page.skills.name")}
        sortOrder={meta.table.options.meta?.currentSort}
        onChangeSorting={meta.table.options.meta?.onSort}
      />
    ),
    cell: ({ row }) => <span>{row.original.name}</span>,
  }),
  columnHelper.accessor("category_parent_name", {
    header: () => <TableColumnHeader title={i18n.t("page.skills.type")} />,
    cell: ({ row }) => <span>{row.original.category_parent_name ?? "-"}</span>,
  }),
  columnHelper.accessor("category_name", {
    header: () => <TableColumnHeader title={i18n.t("page.skills.category")} />,
    cell: ({ row }) => <span>{row.original.category_name ?? "-"}</span>,
  }),
  columnHelper.display({
    id: "actions",
    header: () => null,
    size: 72,
    cell: ({ row }) => {
      return (
        <TableActions
          userId={row.original.id}
          dropdownKeepMounted
          actions={[
            {
              label: (
                <Modal>
                  <UpdateSkillModal
                    skillId={row.original.id}
                    name={row.original.name}
                    categoryId={row.original.category?.id ?? null}
                  />
                </Modal>
              ),
            },
            {
              label: (
                <Modal>
                  <DeleteSkillModal name={row.original.name} id={row.original.id} />
                </Modal>
              ),
            },
          ]}
        />
      );
    },
  }),
];
