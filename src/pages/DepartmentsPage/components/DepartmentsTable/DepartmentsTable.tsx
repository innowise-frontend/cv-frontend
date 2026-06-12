import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@components/shared";
import { VIEW_OPTIONS, SortOrder } from "@root/constants";
import { useAuth, useHandleSearch } from "@root/hooks";
import { toggleSingleColumnSort } from "@root/lib";
import { useDepartmentsTableColumns } from "./useDepartmentsTableColumns";
import { useDepartmentsTableQuery } from "../../api";
import { CreateDepartmentModal } from "../CreateDepartmentModal/CreateDepartmentModal";

export const DepartmentsTable = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const searchParams = useSearch({ from: "/_app/departments" });
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentSort, setCurrentSort] = useState<SortOrder>();
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

  const { columns } = useDepartmentsTableColumns();

  const { data, isLoading } = useDepartmentsTableQuery({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sortOrder: currentSort,
  });

  const tableData = data?.items ?? [];
  const emptyMessage = t("page.table.noResults");

  const handleSort = () => {
    setCurrentSort((prev) => toggleSingleColumnSort(prev));
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TableSearch
        action={
          isAdmin && (
            <Modal>
              <CreateDepartmentModal />
            </Modal>
          )
        }
        searchValue={searchParams.search ?? ""}
        onSearch={onSearch}
      />
      <div className="min-h-0 flex-1">
        <Table
          data={tableData}
          columns={columns}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
          pagesAmount={data?.total_pages ?? 0}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          onSort={handleSort}
          currentSort={currentSort}
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
