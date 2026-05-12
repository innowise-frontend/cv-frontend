import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Breadcrumbs, ROUTES, Table, TableSearch } from "@components/shared";
import { SortOrder, VIEW_OPTIONS } from "@root/constants";
import { useHandleSearch } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib";
import { getUsers } from "@services/users";
import { getUserColumns } from "./columns";

export const UsersPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearch({ from: "/_app/" });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentSort, setCurrentSort] = useState<SortOrder>(SortOrder.ASC);

  const location = useLocation();
  const { onSearch } = useHandleSearch({
    searchValue: searchParams.search ?? "",
    onSearchChange: (value) => {
      navigate({
        to: location.pathname,
        search: { search: value.length === 0 ? undefined : value },
        replace: true,
      });
      setCurrentPage(1);
    },
  });

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
      label: t("page.users.actions.viewProfile"),
      onClick: (userId: string) => {
        navigate({ to: ROUTES.USER_PAGE, params: { userId } });
      },
    },
    {
      label: t("page.users.actions.edit"),
      onClick: (userId: string) => {
        console.log(userId);
      },
    },
    {
      label: t("page.users.actions.delete"),
      onClick: (userId: string) => console.log(userId),
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname, t)]} className="pl-5" />
      <TableSearch action={null} searchValue={searchParams.search ?? ""} onSearch={onSearch} />
      <div className="min-h-0 flex-1">
        <Table
          columns={getUserColumns(t)}
          data={data?.items ?? []}
          pagesAmount={data?.total_pages ?? 0}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          onSort={() => {
            setCurrentSort((prev) => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
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
