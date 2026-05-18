import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Pagination } from "@components/shared";
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
  pagesAmount,
  currentPage,
  currentSort,
  onSort,
  onChangePage,
  onChangeViewOption,
  isLoading = false,
  emptyMessage,
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
      actions: actions,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

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
          <TableBody className="font-normal">
            {isLoading ? (
              <TableRow className="!border-b border-b-gray-5 hover:bg-transparent dark:border-b-gray-3">
                <TableCell colSpan={columns.length} className="h-48 p-0" />
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b-gray-5 dark:border-b-gray-3"
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
              ))
            ) : (
              <TableRow className="!border-b border-b-gray-5 hover:bg-transparent dark:border-b-gray-3">
                <TableCell colSpan={columns.length}>
                  <EmptyContent message={emptyMessage ?? t("page.table.noResults")} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
      {data.length > 0 && (
        <Pagination
          className="justify-start shrink-0"
          pagesCount={pagesAmount}
          currentPage={currentPage}
          onPageChange={onChangePage}
          viewOptions={viewOptions}
          onChangeViewOption={onChangeViewOption}
        />
      )}
    </div>
  );
};
