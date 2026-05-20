import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@root/components/shared";
import { SortOrder, VIEW_OPTIONS } from "@root/constants";
import { useAuth, useHandleSearch } from "@root/hooks";
import { useCvsTableColumns } from "./useCvsTableColumns";
import { useCvsTableQuery } from "../../api";
import { CreateCvModal } from "../CreateCvModal/CreateCvModal";

export const CvsTable = () => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const searchParams = useSearch({ from: "/_app/cvs" });
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

  const { columns } = useCvsTableColumns();

  const { data, isLoading } = useCvsTableQuery({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sortOrder: currentSort,
    config: {
      enabled: !!userId,
    },
  });

  const tableData = data?.items ?? [];
  const hasActiveSearch = (searchParams.search ?? "").trim().length > 0;
  const emptyMessage = hasActiveSearch ? t("page.table.noResults") : t("page.cvs.noData");

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TableSearch
        action={
          <Modal>
            <CreateCvModal />
          </Modal>
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
          currentPage={currentPage}
          pagesAmount={data?.total_pages ?? 0}
          renderSubRow={(row) => (
            <div className="text-[16px] text-gray-5">{row.original.description}</div>
          )}
          onChangePage={setCurrentPage}
          onSort={() => {
            setCurrentSort((prev) => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
            setCurrentPage(1);
          }}
          currentSort={currentSort}
          onChangeViewOption={(limit) => {
            setCurrentLimit(limit);
            setCurrentPage(1);
          }}
          viewOptions={VIEW_OPTIONS}
        />
      </div>
    </div>
  );
};
