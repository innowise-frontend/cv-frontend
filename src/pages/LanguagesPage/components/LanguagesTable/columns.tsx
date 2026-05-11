import { createColumnHelper } from "@tanstack/react-table";
import { Modal, TableActions, TableColumnHeader } from "@components/shared";
import i18n from "@root/i18n/i18n";
import { LanguagesQuery } from "@services/graphql/__generated__/graphql";
import { DeleteLanguageModal, UpdateLanguageModal } from "../../components";

type LanguageTableRow = LanguagesQuery["languages"]["items"][number];

const columnHelper = createColumnHelper<LanguageTableRow>();

export const columns = [
  columnHelper.accessor("name", {
    header: (meta) => (
      <TableColumnHeader
        title={i18n.t("page.languages.name")}
        sortOrder={meta.table.options.meta?.currentSort}
        onChangeSorting={meta.table.options.meta?.onSort}
      />
    ),
    cell: ({ row }) => {
      return <span>{row.original.name}</span>;
    },
  }),
  columnHelper.accessor("iso2", {
    header: () => <TableColumnHeader title={i18n.t("page.languages.iso")} />,
    cell: ({ row }) => {
      return <span>{row.original.iso2}</span>;
    },
  }),
  columnHelper.accessor("native_name", {
    header: () => <TableColumnHeader title={i18n.t("page.languages.nativeName")} />,
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
