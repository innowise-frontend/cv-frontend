import { toApiProjectDate } from "@components/shared";
import type { ProjectsTableRow } from "@pages/ProjectsPage/components/ProjectsTable/types";
import type { ProjectFormValues } from "@pages/ProjectsPage/components/types";
import { SortOrder } from "@root/constants";
import type { CvProjectsSortBy } from "./types";

export const parseResponsibilities = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const formatResponsibilities = (items: string[]): string => items.join(", ");

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
  sortOrder: SortOrder;
  sortBy: CvProjectsSortBy;
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

  const sorted = [...filtered].sort((left, right) => {
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
  });

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

export const buildAddCvProjectPayload = (cvId: string, data: ProjectFormValues) => {
  const startDate = toApiProjectDate(data.startDate);

  if (!startDate) return null;

  return {
    cvId,
    projectId: data.name,
    start_date: startDate,
    end_date: toApiProjectDate(data.endDate) ?? null,
    roles: [] as string[],
    responsibilities: parseResponsibilities(data.responsibilities ?? ""),
  };
};

type AddCvProjectPayload = NonNullable<ReturnType<typeof buildAddCvProjectPayload>>;

type ProjectModalSubmitHelpers = { close: () => void; reset: () => void };

export const createAddCvProjectSubmitHandler =
  (
    cvId: string,
    addCvProject: (payload: AddCvProjectPayload, options?: { onSuccess?: () => void }) => void,
  ) =>
  (data: ProjectFormValues, { close, reset }: ProjectModalSubmitHelpers) => {
    const payload = buildAddCvProjectPayload(cvId, data);

    if (!payload) return;

    addCvProject(payload, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

export const buildUpdateCvProjectPayload = (
  cvId: string,
  projectId: string,
  data: ProjectFormValues,
) => {
  const startDate = toApiProjectDate(data.startDate);

  if (!startDate) return null;

  return {
    cvId,
    projectId,
    start_date: startDate,
    end_date: toApiProjectDate(data.endDate) ?? null,
    roles: [] as string[],
    responsibilities: parseResponsibilities(data.responsibilities ?? ""),
  };
};

type UpdateCvProjectPayload = NonNullable<ReturnType<typeof buildUpdateCvProjectPayload>>;

export const createUpdateCvProjectSubmitHandler =
  (
    cvId: string,
    projectId: string,
    updateCvProject: (
      payload: UpdateCvProjectPayload,
      options?: { onSuccess?: () => void },
    ) => void,
  ) =>
  (data: ProjectFormValues, { close, reset }: ProjectModalSubmitHelpers) => {
    const payload = buildUpdateCvProjectPayload(cvId, projectId, data);

    if (!payload) return;

    updateCvProject(payload, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };
