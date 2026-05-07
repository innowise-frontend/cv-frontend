import { createColumnHelper } from "@tanstack/react-table";
import { Modal, TableActions, TableColumnHeader } from "@components/shared";
import i18n from "@root/i18n/i18n";
import { SkillCategoriesQuery, SkillsQuery } from "@services/graphql/__generated__/graphql";
import { DeleteSkillModal, UpdateSkillModal } from "../index";

type SkillTableRow = SkillsQuery["skills"]["items"][number];
type SkillCategoriesData = SkillCategoriesQuery["skillCategories"];

const columnHelper = createColumnHelper<SkillTableRow>();

type CategoryById = Map<string, SkillCategoriesData[number]>;

const findCategory = (row: SkillTableRow, categoryById: CategoryById) => {
  const categoryId = row.category?.id;
  if (!categoryId) return undefined;

  return categoryById.get(categoryId);
};

const getCategoryTypeName = (row: SkillTableRow, categoryById: CategoryById): string | null => {
  const category = findCategory(row, categoryById);
  if (!category) return null;

  return category.parent?.name ?? category.name;
};

const getCategoryName = (row: SkillTableRow, categoryById: CategoryById): string | null => {
  return findCategory(row, categoryById)?.name ?? null;
};

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
      header: () => <TableColumnHeader title={i18n.t("page.skills.category")} />,
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
