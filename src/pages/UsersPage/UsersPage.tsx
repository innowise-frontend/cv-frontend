import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs, ROUTES, Table, TableSearch } from "@components/shared";
import { VIEW_OPTIONS } from "@root/constants";
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
        navigate({ to: ROUTES.USER_PAGE, params: { userId } });
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
          onChangePage={setCurrentPage}
          onSort={() => {
            setCurrentSort((prev) => (prev === "ASC" ? "DESC" : "ASC"));
            setCurrentPage(1);
          }}
          currentSort={currentSort}
          viewOptions={VIEW_OPTIONS}
          onChangeViewOption={(limit) => {
            setCurrentLimit(limit);
            setCurrentPage(1);
          }}
          actions={adminActions}
        />
      </div>
    </div>
  );
};
