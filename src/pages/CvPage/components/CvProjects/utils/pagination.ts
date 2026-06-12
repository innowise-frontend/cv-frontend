import type { ProjectsTableRow } from "@pages/ProjectsPage/components/ProjectsTable/types";
import { SortOrder } from "@root/constants";
import type { CvProjectsSortBy } from "../types";

const compareStrings = (left: string, right: string, sortOrder: SortOrder) => {
  const result = left.localeCompare(right, undefined, { sensitivity: "base" });

  return sortOrder === SortOrder.ASC ? result : -result;
};

export const filterAndPaginateCvProjects = ({
  projects,
  search,
  page,
  limit,
  sortOrder,
  sortBy,
}: {
  projects: (ProjectsTableRow & { responsibilities: string[] })[];
  search: string;
  page: number;
  limit: number;
  sortOrder?: SortOrder;
  sortBy?: CvProjectsSortBy;
}) => {
  const normalizedSearch = search.trim().toLowerCase();

  let filtered = projects;

  if (normalizedSearch) {
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.domain.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch),
    );
  }

  const sorted =
    sortOrder && sortBy
      ? [...filtered].sort((left, right) => {
          if (sortBy === "name") {
            return compareStrings(left.name, right.name, sortOrder);
          }

          if (sortBy === "domain") {
            return compareStrings(left.domain, right.domain, sortOrder);
          }

          const leftDate = left.end_date ?? "";
          const rightDate = right.end_date ?? "";

          if (leftDate === rightDate) return 0;

          if (sortOrder === SortOrder.ASC) {
            return leftDate.localeCompare(rightDate);
          }

          return rightDate.localeCompare(leftDate);
        })
      : filtered;

  const total = sorted.length;
  const total_pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    items: sorted.slice(start, start + limit),
    total,
    total_pages,
    page,
    limit,
  };
};
