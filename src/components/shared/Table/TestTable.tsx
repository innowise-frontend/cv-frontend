import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import ChevronRightIcon from "@assets/icon/ChevronRightIcon.svg?react";
import { Table, TableColumnHeader } from "./Table";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";

interface Person {
  id: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
  link: string;
}

const defaultData: Person[] = [
  {
    id: 1,
    avatar: "https://picsum.photos/200/700",
    firstName: "tanner",
    lastName: "linsley",
    email: "tanner@example.com",
    department: "Engineering",
    position: "Software Engineer",
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Edit"),
      },
      {
        label: "Delete",
        onClick: () => console.log("Delete"),
      },
    ],
    link: "/people/1",
  },
  {
    id: 2,
    avatar: "https://picsum.photos/200/350",
    firstName: "tandy",
    lastName: "miller",
    email: "tandy@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Edit"),
      },
      {
        label: "Delete",
        onClick: () => console.log("Delete"),
      },
    ],
    link: "/people/2",
  },
  {
    id: 3,
    firstName: "joe",
    lastName: "dirte",
    email: "joe@example.com",
    department: "Sales",
    position: "Sales Manager",
    actions: [
      {
        label: "Edit",
        onClick: () => console.log("Edit"),
      },
      {
        label: "Delete",
        onClick: () => console.log("Delete"),
      },
    ],
    link: "/people/3",
  },
];

const columnHelper = createColumnHelper<Person>();

const isAdmin = true;

const columns = [
  columnHelper.accessor("avatar", {
    header: () => null,
    cell: ({ row }) => {
      return row.original.avatar ? (
        <img
          src={row.original.avatar}
          alt={row.original.firstName}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-5"></div>
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
      <Table data={defaultData} columns={columns} />
    </div>
  );
};
