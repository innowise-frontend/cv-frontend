import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Pagination } from "@components/shared";
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
}: TableProps<TData>) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
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
            {table.getRowModel().rows?.length ? (
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
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {"No data results"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
      <Pagination
        className="justify-start shrink-0"
        pagesCount={pagesAmount}
        currentPage={currentPage}
        onPageChange={onChangePage}
        viewOptions={viewOptions}
        onChangeViewOption={onChangeViewOption}
      />
    </div>
  );
};
