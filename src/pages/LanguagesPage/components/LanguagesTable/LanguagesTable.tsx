import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Modal, Table, TableSearch } from "@components/shared";
import { VIEW_OPTIONS } from "@root/constants";
import { SortOptions } from "@root/constants/sortOptions";
import { useAuth, useHandleSearch } from "@root/hooks";
import { useLanguagesTableColumns } from "./useLanguagesTableColumns";
import { useLanguagesTableQuery } from "../../api";
import { CreateLanguageModal } from "../CreateLanguageModal/CreateLanguageModal";

export const LanguagesTable = () => {
  const { isAdmin } = useAuth();
  const searchParams = useSearch({ from: "/_app/languages" });
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentSort, setCurrentSort] = useState<SortOptions>(SortOptions.ASC);
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

  const { data } = useLanguagesTableQuery({
    search: searchParams.search ?? "",
    page: currentPage,
    limit: currentLimit,
    sortOrder: currentSort,
  });

  return (
    <>
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
          data={data?.items ?? []}
          columns={columns}
          pagesAmount={data?.total_pages ?? 0}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          onSort={() => {
            setCurrentSort((prev) =>
              prev === SortOptions.ASC ? SortOptions.DESC : SortOptions.ASC,
            );
            setCurrentPage(1);
          }}
          currentSort={currentSort}
          viewOptions={VIEW_OPTIONS}
          onChangeViewOption={(limit) => {
            setCurrentLimit(limit);
            setCurrentPage(1);
          }}
        />
      </div>
    </>
  );
};
