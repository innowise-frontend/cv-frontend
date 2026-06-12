import ArrowUpIcon from "@assets/icon/ArrowUpIcon.svg?react";
import { Button } from "@components/shared";
import { cn } from "@root/lib";
import { TableColumnHeaderProps } from "./types";

export const TableColumnHeader = ({
  title,
  sortOrder,
  onChangeSorting,
  table,
}: TableColumnHeaderProps) => {
  const hasData = table ? table.getRowModel().rows.length > 0 : true;
  const canSort = Boolean(onChangeSorting) && hasData;

  if (!canSort) {
    return <span className="font-bold">{title}</span>;
  }

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-center gap-1 px-2 hover:dark:bg-gray-2 hover:bg-gray-8"
      onClick={onChangeSorting}
    >
      <span className="font-bold">{title}</span>
      <ArrowUpIcon
        width={18}
        height={18}
        className={cn(sortOrder === "ASC" && "rotate-180", !sortOrder && "opacity-40")}
      />
    </Button>
  );
};
