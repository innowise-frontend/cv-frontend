import { useNavigate } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { TableColumnHeader, Avatar, TableActions, ROUTES, Modal } from "@components/shared";
import { UsersQuery } from "@services/graphql/__generated__/graphql";
import { DeleteUserModal } from "./components/DeleteUserModal/DeleteUserModal";
import { UpdateUserModal } from "./components/UpdateUserModal/UpdateUserModal";

type UserTableRow = UsersQuery["users"]["items"][number];

export const useUserTableColumns = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<UserTableRow>();

  const columns = [
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
      header: () => <TableColumnHeader title={t("page.users.firstName")} />,
      cell: ({ row }) => {
        return <span>{row.original.profile.first_name}</span>;
      },
    }),
    columnHelper.accessor("profile.last_name", {
      header: () => <TableColumnHeader title={t("page.users.lastName")} />,
      cell: ({ row }) => {
        return <span>{row.original.profile.last_name}</span>;
      },
    }),
    columnHelper.accessor("email", {
      header: () => <TableColumnHeader title={t("page.users.email")} />,
      cell: ({ row }) => {
        return <span>{row.original.email}</span>;
      },
    }),
    columnHelper.accessor("department.name", {
      header: (meta) => (
        <TableColumnHeader
          title={t("page.users.department")}
          sortOrder={meta.table.options.meta?.currentSort}
          onChangeSorting={meta.table.options.meta?.onSort}
        />
      ),
      cell: ({ row }) => {
        return <span>{row.original.department?.name}</span>;
      },
    }),
    columnHelper.accessor("position.name", {
      header: () => <TableColumnHeader title={t("page.users.position")} />,
      cell: ({ row }) => {
        return <span>{row.original.position?.name}</span>;
      },
    }),
    columnHelper.display({
      id: "actions",
      header: () => null,
      size: 72,
      cell: ({ row }) => {
        const actions = [
          {
            label: <span className="p-px">{t("page.users.viewProfile")}</span>,
            onClick: (userId: string) => {
              navigate({ to: ROUTES.USER_PAGE, params: { userId } });
            },
          },
          {
            label: (
              <Modal>
                <UpdateUserModal
                  userId={row.original.id}
                  firstName={row.original.profile.first_name ?? ""}
                  lastName={row.original.profile.last_name ?? ""}
                  departmentId={row.original.department?.id ?? ""}
                  positionId={row.original.position?.id ?? ""}
                  email={row.original.email ?? ""}
                  role={row.original.role}
                />
              </Modal>
            ),
          },
        ];

        if (!row.original.is_verified) {
          actions.push({
            label: (
              <Modal>
                <DeleteUserModal
                  userId={row.original.id}
                  firstName={row.original.profile.first_name ?? ""}
                  lastName={row.original.profile.last_name ?? ""}
                />
              </Modal>
            ),
          });
        }

        return <TableActions dropdownKeepMounted userId={row.original.id} actions={actions} />;
      },
    }),
  ];

  return { columns };
};
