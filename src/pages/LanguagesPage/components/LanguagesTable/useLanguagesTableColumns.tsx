import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Modal, TableActions, TableColumnHeader } from "@components/shared";
import { LanguagesQuery } from "@services/graphql/__generated__/graphql";
import { DeleteLanguageModal, UpdateLanguageModal } from "..";

type LanguageTableRow = LanguagesQuery["languages"]["items"][number];

export const useLanguagesTableColumns = () => {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<LanguageTableRow>();

  const columns = [
    columnHelper.accessor("name", {
      header: (meta) => (
        <TableColumnHeader
          title={t("page.languages.name")}
          sortOrder={meta.table.options.meta?.currentSort}
          onChangeSorting={meta.table.options.meta?.onSort}
          table={meta.table}
        />
      ),
      cell: ({ row }) => {
        return <span>{row.original.name}</span>;
      },
    }),
    columnHelper.accessor("iso2", {
      header: () => <TableColumnHeader title={t("page.languages.iso")} />,
      cell: ({ row }) => {
        return <span>{row.original.iso2}</span>;
      },
    }),
    columnHelper.accessor("native_name", {
      header: () => <TableColumnHeader title={t("page.languages.nativeName")} />,
      cell: ({ row }) => {
        return <span>{row.original.native_name}</span>;
      },
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
                    <UpdateLanguageModal
                      languageId={row.original.id}
                      name={row.original.name}
                      iso2={row.original.iso2}
                      nativeName={row.original.native_name}
                    />
                  </Modal>
                ),
              },
              {
                label: (
                  <Modal>
                    <DeleteLanguageModal name={row.original.name} id={row.original.id} />{" "}
                  </Modal>
                ),
              },
            ]}
          />
        );
      },
    }),
  ];

  return { columns };
};
