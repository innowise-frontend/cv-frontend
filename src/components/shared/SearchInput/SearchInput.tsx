import SearchIcon from "@assets/icon/SearchIcon.svg?react";
import { Input } from "@components/shared";
import { useHandleSearch } from "@hooks/useSearchParams";

export const SearchInput = ({ defaultValue }: { defaultValue?: string }) => {
  const { onSearch } = useHandleSearch();

  return (
    <div className="relative *:flex">
      <Input
        placeholder="Filter"
        defaultValue={defaultValue}
        onChange={(event) => {
          onSearch(event.target.value);
        }}
        className="h-10 w-80 rounded-40 border border-gray-5 pl-10"
      />
      <SearchIcon className="absolute top-2 left-3 text-gray-3 dark:text-gray-5" />
    </div>
  );
};
