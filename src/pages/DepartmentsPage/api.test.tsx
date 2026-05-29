import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { SortOrder } from "@root/constants";
import { useDepartmentsTableQuery } from "./api";

const getDepartmentsMock = vi.hoisted(() => vi.fn());

vi.mock("@services/departments", () => ({
  getDepartments: (...args: unknown[]) => getDepartmentsMock(...args),
  createDepartment: vi.fn(),
  updateDepartment: vi.fn(),
  deleteDepartment: vi.fn(),
}));

const queryParams = {
  search: "eng",
  page: 2,
  limit: 20,
  sortOrder: SortOrder.DESC,
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
      })
    }
  >
    {children}
  </QueryClientProvider>
);

describe("useDepartmentsTableQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getDepartmentsMock.mockResolvedValue({ items: [], total_pages: 0 });
  });

  it("fetches departments with search, pagination, and sort params", async () => {
    renderHook(() => useDepartmentsTableQuery(queryParams), { wrapper });

    await waitFor(() => expect(getDepartmentsMock).toHaveBeenCalled());

    expect(getDepartmentsMock).toHaveBeenCalledWith({
      search: "eng",
      page: 2,
      limit: 20,
      sort_order: SortOrder.DESC,
      sort_by: "name",
    });
  });
});
