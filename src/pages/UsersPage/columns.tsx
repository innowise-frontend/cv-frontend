import { createColumnHelper } from "@tanstack/react-table";
import { TableColumnHeader, Avatar, TableActions } from "@components/shared";
import { UsersQuery } from "@services/graphql/__generated__/graphql";
import type { TFunction } from "i18next";

type UserTableRow = UsersQuery["users"]["items"][number];

const columnHelper = createColumnHelper<UserTableRow>();

export const getUserColumns = (t: TFunction) => [
  columnHelper.accessor("profile.avatar", {
    header: () => null,
    size: 80,
    cell: ({ row }) => {
      return (
        <Avatar
          name={row.original.profile.first_name ?? ""}
          imageSrc={row.original.profile.avatar ?? ""}
          className="bg-gray-5 dark:bg-gray-4"
        />
      );
    },
  }),
  columnHelper.accessor("profile.first_name", {
    header: () => <TableColumnHeader title={t("page.users.columns.firstName")} />,
    cell: ({ row }) => <span>{row.original.profile.first_name}</span>,
  }),
  columnHelper.accessor("profile.last_name", {
    header: () => <TableColumnHeader title={t("page.users.columns.lastName")} />,
    cell: ({ row }) => <span>{row.original.profile.last_name}</span>,
  }),
  columnHelper.accessor("email", {
    header: () => <TableColumnHeader title={t("page.users.columns.email")} />,
    cell: ({ row }) => <span>{row.original.email}</span>,
  }),
  columnHelper.accessor("department_name", {
    header: (meta) => (
      <TableColumnHeader
        title={t("page.users.columns.department")}
        sortOrder={meta.table.options.meta?.currentSort}
        onChangeSorting={meta.table.options.meta?.onSort}
      />
    ),
    cell: ({ row }) => <span>{row.original.department_name}</span>,
  }),
  columnHelper.accessor("position_name", {
    header: () => <TableColumnHeader title={t("page.users.columns.position")} />,
    cell: ({ row }) => <span>{row.original.position_name}</span>,
  }),
  columnHelper.accessor("id", {
    header: () => null,
    size: 72,
    cell: ({ row, table }) => (
      <TableActions userId={row.original.id} actions={table.options.meta?.actions ?? []} />
    ),
  }),
];
