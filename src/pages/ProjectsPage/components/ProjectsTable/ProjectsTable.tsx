import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Table, TableSearch } from "@components/shared";
import { SortOrder, VIEW_OPTIONS } from "@root/constants";
import { useHandleSearch } from "@root/hooks";
import { toggleSingleColumnSort } from "@root/lib";
import { useProjectsTableColumns } from "./useProjectsTableColumns";
import { useProjectsTableQuery } from "../../api";
import { CreateProjectModal } from "../CreateProjectModal/CreateProjectModal";

export const ProjectsTable = () => {
  const { t } = useTranslation();
  const searchParams = useSearch({ from: "/_app/projects" });
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

  const { columns } = useProjectsTableColumns();
  const { data, isLoading } = useProjectsTableQuery({
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

  const handleChangeViewOption = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TableSearch
        action={
          <Modal>
            <CreateProjectModal />
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
          pagesAmount={data?.total_pages ?? 0}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          onSort={handleSort}
          currentSort={currentSort}
          viewOptions={VIEW_OPTIONS}
          currentViewOption={currentLimit}
          onChangeViewOption={handleChangeViewOption}
          renderSubRow={(row) => (
            <div className="flex flex-col gap-3">
              <p className="text-base text-gray-5">{row.original.description}</p>
              <div className="flex max-h-[7rem] flex-wrap gap-2 overflow-hidden">
                {row.original.environment.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-5 px-3 py-1 text-sm text-gray-3 dark:text-gray-8"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
