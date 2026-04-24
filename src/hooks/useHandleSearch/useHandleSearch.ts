import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounce } from "../useDebounce/useDebounce";

export const useHandleSearch = () => {
  const { search: searchParams } = useSearch({ from: "/_app/" });
  const navigate = useNavigate({ from: "/" });

  const handleSearchParams = (value: string) => {
    if (value === searchParams) return;

    if (value.length === 0) {
      navigate({ search: (prev) => ({ ...prev, search: undefined }), replace: true });
    } else {
      navigate({ search: (prev) => ({ ...prev, search: value }), replace: true });
    }
  };

  const deboundedSearch = useDebounce(handleSearchParams);

  return { onSearch: deboundedSearch };
};
