import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@components/shared";
import { VIEW_OPTIONS, SortOrder } from "@root/constants";
import { useAuth, useHandleSearch } from "@root/hooks";
import { usePositionsTableColumns } from "./usePositionsTableColumns";
import { usePositionsTableQuery } from "../../api";
import { CreatePositionModal } from "../CreatePositionModal/CreatePositionModal";

export const PositionsTable = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const searchParams = useSearch({ from: "/_app/positions" });
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentSort, setCurrentSort] = useState<SortOrder>(SortOrder.ASC);
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

  const { columns } = usePositionsTableColumns();

  const { data, isLoading } = usePositionsTableQuery({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sortOrder: currentSort,
  });

  const tableData = data?.items ?? [];
  const hasActiveSearch = (searchParams.search ?? "").trim();
  const emptyMessage = hasActiveSearch ? t("page.table.noResults") : t("page.positions.noData");

  const handleSort = () => {
    setCurrentSort((prev) => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TableSearch
        action={
          isAdmin && (
            <Modal>
              <CreatePositionModal />
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
