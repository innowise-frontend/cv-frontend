import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Column } from "@tanstack/react-table";
import { useState } from "react";
import ArrowUpIcon from "@assets/icon/ArrowUpIcon.svg?react";
import { Button, Pagination } from "@components/shared";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { cn } from "@root/lib/utils";
import { TableProps } from "./types";

export const Table = <TData,>({ data, columns }: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
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
      />
    </>
  );
};

interface TableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  enableSorting?: boolean;
}

export const TableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: TableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={"flex items-center space-x-2"}>
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        <span className={cn(className)}>{title}</span>
        <ArrowUpIcon
          width={18}
          height={18}
          className={cn(column.getIsSorted() === "asc" ? "rotate-180" : "")}
        />
      </Button>
    </div>
  );
};
