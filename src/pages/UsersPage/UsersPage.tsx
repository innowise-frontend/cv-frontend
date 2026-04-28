import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs, ROUTES, Table, TableSearch } from "@components/shared";
import { getUsers } from "@services/users";
import { columns } from "./columns";

export const UsersPage = () => {
  const searchParams = useSearch({ from: "/_app/" });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentSort, setCurrentSort] = useState<"ASC" | "DESC">("ASC");

  const { data } = useQuery({
    queryKey: ["users", searchParams.search, currentPage, currentLimit, currentSort],
    queryFn: () =>
      getUsers({
        search: searchParams.search ?? "",
        page: currentPage,
        limit: currentLimit,
        sort_order: currentSort,
        sort_by: "department",
      }),
  });

  const adminActions = [
    {
      label: "View profile",
      onClick: (userId: string) => {
        navigate({ to: ROUTES.USER_PAGE, params: { userId: userId } });
      },
    },
    {
      label: "Edit",
      onClick: (userId: string) => {
        console.log(userId);
      },
    },
    {
      label: "Delete",
      onClick: (userId: string) => console.log(userId),
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Breadcrumbs items={[{ label: "Employees", href: "/" }]} className="pl-5" />
      <TableSearch action={null} />
      <div className="min-h-0 flex-1">
        <Table
          columns={columns}
          data={data?.items ?? []}
          pagesAmount={data?.total_pages ?? 0}
          currentPage={currentPage}
          onChangePage={(page) => {
            setCurrentPage(page);
          }}
          onSort={() => {
            setCurrentSort((prev) => (prev === "ASC" ? "DESC" : "ASC"));
          }}
          currentSort={currentSort}
          viewOptions={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
          ]}
          onChangeViewOption={(limit) => {
            setCurrentLimit(limit);
          }}
          actions={adminActions}
        />
      </div>
    </div>
  );
};
