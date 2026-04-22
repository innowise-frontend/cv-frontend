import { SearchInput } from "@components/shared";
import { TableSearchProps } from "./types";

export const TableSearch = ({ action }: TableSearchProps) => {
  const params = new URLSearchParams(document.location.search);
  const search = params.get("search") ?? "";

  return (
    <div className="flex w-full items-center justify-between h-14 px-5">
      <SearchInput defaultValue={search} />
      {action}
    </div>
  );
};
