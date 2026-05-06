import { useDebounce } from "../useDebounce/useDebounce";

interface UseHandleSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const useHandleSearch = ({ searchValue, onSearchChange }: UseHandleSearchProps) => {
  const handleSearchParams = (value: string) => {
    if (value === searchValue) return;
    onSearchChange(value);
  };

  const deboundedSearch = useDebounce(handleSearchParams);

  return { onSearch: deboundedSearch };
};
