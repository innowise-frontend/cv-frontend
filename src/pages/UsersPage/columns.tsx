import { createColumnHelper } from "@tanstack/react-table";
import { TableColumnHeader, Avatar, TableActions } from "@components/shared";
import { UsersQuery } from "@services/graphql/__generated__/graphql";

type UserTableRow = UsersQuery["users"]["items"][number];

const columnHelper = createColumnHelper<UserTableRow>();

export const columns = [
  columnHelper.accessor("profile.avatar", {
    header: () => null,
    size: 80,
    cell: ({ row }) => {
      return (
        <Avatar
          name={row.original.profile.first_name ?? ""}
          link={row.original.profile.avatar ?? ""}
          className="bg-gray-5 dark:bg-gray-4"
        />
      );
    },
  }),
  columnHelper.accessor("profile.first_name", {
    header: () => <TableColumnHeader title="First Name" />,
    cell: ({ row }) => {
      return <span>{row.original.profile.first_name}</span>;
    },
  }),
  columnHelper.accessor("profile.last_name", {
    header: () => <TableColumnHeader title="Last Name" />,
    cell: ({ row }) => {
      return <span>{row.original.profile.last_name}</span>;
    },
  }),
  columnHelper.accessor("email", {
    header: () => <TableColumnHeader title="Email" />,
    cell: ({ row }) => {
      return <span>{row.original.email}</span>;
    },
  }),
  columnHelper.accessor("department_name", {
    header: (meta) => (
      <TableColumnHeader
        title="Department"
        sortOrder={meta.table.options.meta?.currentSort}
        onChangeSorting={meta.table.options.meta?.onSort}
      />
    ),
    cell: ({ row }) => {
      return <span>{row.original.department_name}</span>;
    },
  }),
  columnHelper.accessor("position_name", {
    header: () => <TableColumnHeader title="Position" />,
    cell: ({ row }) => {
      return <span>{row.original.position_name}</span>;
    },
  }),
  columnHelper.accessor("id", {
    header: () => null,
    size: 72,
    cell: ({ row, table }) => {
      return <TableActions userId={row.original.id} actions={table.options.meta?.actions ?? []} />;
    },
  }),
];
