export interface Person {
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

export const defaultData: Person[] = [
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
  {
    id: 4,
    avatar: "https://picsum.photos/200/700",
    firstName: "jane",
    lastName: "doe",
    email: "jane@example.com",
    department: "HR",
    position: "HR Manager",
    link: "/people/4",
  },
  {
    id: 5,
    firstName: "john",
    lastName: "doe",
    email: "john@example.com",
    department: "IT",
    position: "IT Manager",
    link: "/people/5",
  },
  {
    id: 6,
    firstName: "jane",
    lastName: "doe",
    email: "jane@example.com",
    department: "HR",
    position: "HR Manager",
    link: "/people/6",
  },
  {
    id: 7,
    firstName: "john",
    lastName: "doe",
    avatar: "https://picsum.photos/200/777",
    email: "john@example.com",
    department: "IT",
    position: "IT Manager",
    link: "/people/7",
  },
  {
    id: 8,
    firstName: "jane",
    lastName: "doe",
    email: "jane@example.com",
    department: "HR",
    position: "HR Manager",
    link: "/people/8",
  },
  {
    id: 9,
    firstName: "john",
    lastName: "doe",
    email: "john@example.com",
    department: "IT",
    position: "IT Manager",
    link: "/people/9",
  },
  {
    id: 10,
    firstName: "jane",
    lastName: "doe",
    email: "jane@example.com",
    department: "HR",
    position: "HR Manager",
    link: "/people/10",
  },
  {
    id: 11,
    firstName: "jane",
    lastName: "doe",
    avatar: "https://picsum.photos/200/777",
    email: "jane@example.com",
    department: "HR",
    position: "HR Manager",
    link: "/people/11",
  },
  {
    id: 12,
    firstName: "jane",
    lastName: "doe",
    email: "jane@example.com",
    department: "HR",
    position: "HR Manager",
    link: "/people/12",
  },
];
