import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@components/shared";
import { SortOrder, VIEW_OPTIONS } from "@root/constants";
import { useHandleSearch } from "@root/hooks";
import { toggleSingleColumnSort } from "@root/lib";
import { useCvsTableColumns } from "./useCvsTableColumns";
import { useCvsTableQuery } from "../../api";
import { CreateCvModal } from "../CreateCvModal/CreateCvModal";

export const CvsTable = () => {
  const { t } = useTranslation();
  const searchParams = useSearch({ strict: false });
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

  const { columns } = useCvsTableColumns();

  const { data, isLoading } = useCvsTableQuery({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sortOrder: currentSort,
  });

  const tableData = data?.items ?? [];
  const emptyMessage = t("page.table.noResults");

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
            <div className="line-clamp-4 wrap-break-word text-[16px] text-gray-5">
              {row.original.description}
            </div>
          )}
          onChangePage={setCurrentPage}
          onSort={() => {
            setCurrentSort((prev) => toggleSingleColumnSort(prev));
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
