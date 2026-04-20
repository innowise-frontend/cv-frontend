import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import ChevronRightIcon from "@assets/icon/ChevronRightIcon.svg?react";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Table, TableColumnHeader } from "./Table";
import { defaultData, Person } from "./users";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { TableSearch } from "../TableSearch/TableSearch";

const columnHelper = createColumnHelper<Person>();

const isAdmin = true;

const columns = [
  columnHelper.accessor("avatar", {
    header: () => null,
    cell: ({ row }) => {
      return (
        <Avatar
          name={row.original.firstName}
          link={row.original.avatar}
          className="bg-gray-5 dark:bg-gray-4"
        />
      );
    },
  }),
  columnHelper.accessor("firstName", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title="First Name" className="font-bold" />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("lastName", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Last Name" className="font-bold" />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Email" className="font-bold" />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("department", {
    header: ({ column }) => (
      <TableColumnHeader enableSorting column={column} title="Department" className="font-bold" />
    ),
    enableSorting: true,
  }),
  columnHelper.accessor("position", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Position" className="font-bold" />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("actions", {
    header: () => null,
    cell: ({ row }) => {
      return isAdmin ? (
        <Dropdown options={row.original.actions ?? []} />
      ) : (
        <Button className="flex items-center justify-center w-10 h-10">
          <Link
            to={row.original.link}
            inactiveProps={{ className: "text-gray-3 dark:text-gray-5" }}
          >
            <ChevronRightIcon width={24} height={24} />
          </Link>
        </Button>
      );
    },
  }),
];

export const TestTable = () => {
  return (
    <div>
      <TableSearch
        action={
          isAdmin && (
            <Button variant="default" className="font-medium text-red h-10 ml-5 dark:text-red">
              <PlusIcon width={24} height={24} />
              Create User
            </Button>
          )
        }
      />
      <Table columns={columns} data={defaultData} />
    </div>
  );
};
