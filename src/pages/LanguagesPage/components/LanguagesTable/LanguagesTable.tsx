import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@components/shared";
import { VIEW_OPTIONS, SortOrder } from "@root/constants";
import { useAuth, useHandleSearch } from "@root/hooks";
import { toggleSingleColumnSort } from "@root/lib";
import { useLanguagesTableColumns } from "./useLanguagesTableColumns";
import { useLanguagesTableQuery } from "../../api";
import { CreateLanguageModal } from "../CreateLanguageModal/CreateLanguageModal";

export const LanguagesTable = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const searchParams = useSearch({ from: "/_app/languages" });
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

  const { columns } = useLanguagesTableColumns();

  const { data, isLoading } = useLanguagesTableQuery({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sortOrder: currentSort,
  });

  const tableData = data?.items ?? [];
  const hasActiveSearch = (searchParams.search ?? "").trim().length > 0;
  const emptyMessage = hasActiveSearch ? t("page.table.noResults") : t("page.table.noDataResults");

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TableSearch
        action={
          isAdmin && (
            <Modal>
              <CreateLanguageModal />
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
          onSort={() => {
            setCurrentSort((prev) => toggleSingleColumnSort(prev));
            setCurrentPage(1);
          }}
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
