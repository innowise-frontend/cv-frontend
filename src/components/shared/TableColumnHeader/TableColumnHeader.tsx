import ArrowUpIcon from "@assets/icon/ArrowUpIcon.svg?react";
import { Button } from "@components/shared";
import { cn } from "@root/lib";
import { TableColumnHeaderProps } from "./types";

export const TableColumnHeader = ({
  title,
  sortOrder,
  onChangeSorting,
}: TableColumnHeaderProps) => {
  if (!onChangeSorting) {
    return <span className="font-bold">{title}</span>;
  }

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-center gap-1 px-2"
      onClick={onChangeSorting}
    >
      <span className="font-bold">{title}</span>
      {sortOrder && (
        <ArrowUpIcon
          width={18}
          height={18}
          className={cn(sortOrder === "ASC" ? "rotate-180" : "")}
        />
      )}
    </Button>
  );
};
