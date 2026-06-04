import { Modal, TableActions, TableColumnHeader } from "@components/shared";
import { DeleteSkillModal, UpdateSkillModal } from "@pages/SkillsPage";
import i18n from "@root/i18n/i18n";
import { SkillCategoriesData } from "./types";
import { columnHelper, getCategoryName, getCategoryTypeName } from "./utils";

export const buildColumns = (categories: SkillCategoriesData | undefined) => {
  const categoryById = new Map((categories ?? []).map((category) => [category.id, category]));

  return [
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
    columnHelper.accessor((row) => getCategoryTypeName(row, categoryById), {
      id: "category_type",
      header: () => <TableColumnHeader title={i18n.t("page.skills.type")} />,
      cell: ({ row }) => <span>{getCategoryTypeName(row.original, categoryById) ?? "-"}</span>,
    }),
    columnHelper.accessor((row) => getCategoryName(row, categoryById), {
      id: "category",
      header: () => <TableColumnHeader title={i18n.t("page.skills.categoryLabel")} />,
      cell: ({ row }) => <span>{getCategoryName(row.original, categoryById) ?? "-"}</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: () => null,
      size: 72,
      meta: { align: "right" },
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
};
