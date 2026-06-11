import type { SortOrder } from "@root/constants";

export type UsersSortBy = "first_name" | "last_name" | "department" | undefined;

export interface UsersTableColumnsOptions {
  currentSort: SortOrder;
  currentSortBy: UsersSortBy;
  onSort: (sortBy: UsersSortBy) => void;
}
