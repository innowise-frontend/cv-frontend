import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { SortOrder } from "@root/constants";
import { usePositionsTableQuery } from "./api";

const getPositionsMock = vi.hoisted(() => vi.fn());

vi.mock("@services/positions", () => ({
  getPositions: (...args: unknown[]) => getPositionsMock(...args),
  createPosition: vi.fn(),
  updatePosition: vi.fn(),
  deletePosition: vi.fn(),
}));

const queryParams = {
  search: "dev",
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

describe("usePositionsTableQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPositionsMock.mockResolvedValue({ items: [], total_pages: 0 });
  });

  it("fetches positions with search, pagination, and sort params", async () => {
    renderHook(() => usePositionsTableQuery(queryParams), { wrapper });

    await waitFor(() => expect(getPositionsMock).toHaveBeenCalled());

    expect(getPositionsMock).toHaveBeenCalledWith({
      search: "dev",
      page: 2,
      limit: 20,
      sort_order: SortOrder.DESC,
      sort_by: "name",
    });
  });
});
