import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Breadcrumbs, Modal, Spinner, Table, TableSearch } from "@components/shared";
import { SortOrder, VIEW_OPTIONS, ROUTES } from "@root/constants";
import { useAuth, useHandleSearch } from "@root/hooks";
import { getBreadcrumbsLink, toggleMultiColumnSort } from "@root/lib";
import { useUsersApi } from "./api";
import { CreateUserModal } from "./components";
import { useUserTableColumns } from "./useUserTableColumns";
import type { UsersSortBy } from "./types";

export const UsersPage = () => {
  const { isAdmin } = useAuth();
  const { t } = useTranslation();
  const searchParams = useSearch({ from: "/_app/" });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentSort, setCurrentSort] = useState<SortOrder>();
  const [currentSortBy, setCurrentSortBy] = useState<UsersSortBy>();

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

  const handleSort = (sortBy: UsersSortBy) => {
    const next = toggleMultiColumnSort(sortBy, currentSortBy, currentSort);

    setCurrentSortBy(next.sortBy);
    setCurrentSort(next.sortOrder);
    setCurrentPage(1);
  };

  const { columns } = useUserTableColumns({
    currentSort,
    currentSortBy,
    onSort: handleSort,
  });

  const { data, isLoading } = useUsersApi({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sort_order: currentSort,
    sort_by: currentSortBy,
  });

  const tableData = data?.items ?? [];
  const hasActiveSearch = (searchParams.search ?? "").trim().length > 0;
  const emptyMessage = hasActiveSearch ? t("page.table.noResults") : t("page.users.noData");

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col ml-5">
      <Breadcrumbs items={[getBreadcrumbsLink(ROUTES.ROOT, t)]} className="pl-5 pb-4" />
      <TableSearch
        action={
          isAdmin && (
            <Modal>
              <CreateUserModal />
            </Modal>
          )
        }
        searchValue={searchParams.search ?? ""}
        onSearch={onSearch}
      />
      <div className="min-h-0 flex-1">
        <Table
          columns={columns}
          data={tableData}
          emptyMessage={emptyMessage}
          pagesAmount={data?.total_pages ?? 0}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          currentSort={currentSort}
          currentSortBy={currentSortBy}
          viewOptions={VIEW_OPTIONS}
          currentViewOption={currentLimit}
          onChangeViewOption={(limit) => {
            setCurrentLimit(limit);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};
