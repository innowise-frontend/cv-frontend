import { SortOrder } from "@root/constants";
import { useCvsTableQuery } from "../../api";

export interface CvsTableQueryParams {
  search: string;
  page: number;
  limit: number;
  sort_order: SortOrder;
}

export interface CvsTableProps {
  data: ReturnType<typeof useCvsTableQuery>["data"];
  isLoading: boolean;
  onParamsChange: (params: CvsTableQueryParams) => void;
}
