import { useEffect, useState } from "react";
import { SearchInput } from "@components/shared";
import { TableSearchProps } from "./types";

export const TableSearch = ({ action, searchValue, onSearch }: TableSearchProps) => {
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  return (
    <div className="flex w-full relative items-center justify-between h-14 px-5">
      <SearchInput
        value={inputValue}
        onValueChange={(value) => {
          setInputValue(value);
          onSearch(value);
        }}
      />
      {action}
    </div>
  );
};
