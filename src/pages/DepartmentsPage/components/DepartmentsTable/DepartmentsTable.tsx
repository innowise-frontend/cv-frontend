import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@components/shared";
import { SortOrder, VIEW_OPTIONS } from "@root/constants";
import { useAuth, useHandleSearch } from "@root/hooks";
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
  const currentSort = SortOrder.ASC;

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

  const { data: departments, isLoading } = useDepartmentsTableQuery();
  const { columns } = useDepartmentsTableColumns();

  const normalizedSearch = (searchParams.search ?? "").trim().toLowerCase();
  const filteredDepartments = useMemo(() => {
    if (!normalizedSearch) return departments ?? [];

    return (departments ?? []).filter((d) => d.name.toLowerCase().includes(normalizedSearch));
  }, [departments, normalizedSearch]);

  const safePagesAmount = Math.max(0, Math.ceil(filteredDepartments.length / currentLimit));
  const safePage = safePagesAmount > 0 ? Math.min(currentPage, safePagesAmount) : 1;

  const tableData = filteredDepartments.slice(
    (safePage - 1) * currentLimit,
    safePage * currentLimit,
  );

  const hasActiveSearch = (searchParams.search ?? "").trim().length > 0;
  const emptyMessage = hasActiveSearch ? t("page.table.noResults") : t("page.table.noDataResults");

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
          pagesAmount={safePagesAmount}
          currentPage={safePage}
          onChangePage={setCurrentPage}
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
