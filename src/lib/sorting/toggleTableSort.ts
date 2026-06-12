import { SortOrder } from "@root/constants";

export const buildSortParams = (
  sortOrder: SortOrder | undefined,
  sortBy: string,
): { sort_order?: SortOrder; sort_by?: string } => {
  if (!sortOrder) {
    return {};
  }

  return { sort_order: sortOrder, sort_by: sortBy };
};

export const toggleSingleColumnSort = (
  currentSort: SortOrder | undefined,
): SortOrder | undefined => {
  if (currentSort === undefined) {
    return SortOrder.ASC;
  }

  if (currentSort === SortOrder.ASC) {
    return SortOrder.DESC;
  }

  return undefined;
};

export const toggleMultiColumnSort = <T extends string>(
  sortBy: T,
  currentSortBy: T | undefined,
  currentSort: SortOrder | undefined,
): { sortBy: T | undefined; sortOrder: SortOrder | undefined } => {
  if (currentSortBy !== sortBy) {
    return { sortBy, sortOrder: SortOrder.ASC };
  }

  if (currentSort === SortOrder.ASC) {
    return { sortBy, sortOrder: SortOrder.DESC };
  }

  if (currentSort === SortOrder.DESC) {
    return { sortBy: undefined, sortOrder: undefined };
  }

  return { sortBy, sortOrder: SortOrder.ASC };
};
