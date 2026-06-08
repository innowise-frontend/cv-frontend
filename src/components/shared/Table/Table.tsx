import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Pagination, Spinner } from "@components/shared";
import { EmptyContent } from "@components/shared/EmptyContent/EmptyContent";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { TableProps } from "./types";

export const Table = <TData,>({
  data,
  actions,
  columns,
  viewOptions,
  currentViewOption,
  pagesAmount,
  currentPage,
  currentSort,
  currentSortBy,
  onSort,
  onChangePage,
  onChangeViewOption,
  isLoading = false,
  emptyMessage,
  renderSubRow,
}: TableProps<TData>) => {
  const { t } = useTranslation();

  const getRowId = (originalRow: TData, index: number) => {
    if (
      typeof originalRow === "object" &&
      originalRow !== null &&
      "id" in originalRow &&
      typeof (originalRow as { id?: unknown }).id === "string"
    ) {
      return (originalRow as { id: string }).id;
    }

    return String(index);
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getRowId,
    meta: {
      onSort: onSort,
      currentSort: currentSort,
      currentSortBy: currentSortBy,
      actions: actions,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-auto relative">
        <UITable className="w-full relative table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-gray-5 dark:border-b-gray-3">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="sticky top-0 z-10 bg-gray-8 font-medium whitespace-normal wrap-break-word dark:bg-gray-2"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {table.getRowModel().rows?.length ? (
            renderSubRow ? (
              table.getRowModel().rows.map((row) => (
                <TableBody
                  key={row.id}
                  className="group border-b border-b-gray-5 font-normal dark:border-b-gray-3 [&_tr]:border-0"
                >
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-transparent group-hover:bg-gray-7/50 dark:group-hover:bg-gray-3/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="p-4 text-left whitespace-normal wrap-break-word"
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="hover:bg-transparent group-hover:bg-gray-7/50 dark:group-hover:bg-gray-3/50">
                    <TableCell
                      colSpan={row.getVisibleCells().length}
                      className="p-4 pt-0 text-left whitespace-normal wrap-break-word"
                    >
                      {renderSubRow(row)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            ) : (
              <TableBody className="font-normal">
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b-gray-5 hover:bg-gray-7/50 dark:border-b-gray-3 dark:hover:bg-gray-3/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="p-4 text-left whitespace-normal wrap-break-word"
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )
          ) : (
            <TableBody className="font-normal">
              <TableRow className="border-b! border-b-gray-5 hover:bg-transparent dark:border-b-gray-3">
                <TableCell colSpan={columns.length}>
                  <EmptyContent message={emptyMessage ?? t("page.table.noResults")} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </UITable>
      </div>
      {data.length > 0 && (
        <Pagination
          className="justify-start shrink-0"
          pagesCount={pagesAmount}
          currentPage={currentPage}
          onPageChange={onChangePage}
          viewOptions={viewOptions}
          viewOptionValue={currentViewOption}
          onChangeViewOption={onChangeViewOption}
        />
      )}
    </div>
  );
};
