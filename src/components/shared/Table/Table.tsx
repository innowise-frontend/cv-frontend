import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
  columns,
  viewOptions,
  onChangeViewOption,
}: TableProps<TData>) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <UITable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b-gray-5 dark:border-b-gray-3">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-medium">
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
                  <TableCell key={cell.id} className="p-4 text-left">
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
      <Pagination
        className="justify-start fixed bottom-0"
        pagesCount={table.getPageCount()}
        currentPage={table.getState().pagination.pageIndex}
        onPreviousPage={table.previousPage}
        onNextPage={table.nextPage}
        onPageChange={table.setPageIndex}
        viewOptions={viewOptions}
        onChangeViewOption={onChangeViewOption}
      />
    </>
  );
};
