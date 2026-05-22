import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { SortOrder } from "@root/constants";
import { useCvsTableQuery } from "./api";

const getCvsMock = vi.hoisted(() => vi.fn());
const getUserCvsMock = vi.hoisted(() => vi.fn());
const useParamsMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("@services/cvs", () => ({
  getCvs: (...args: unknown[]) => getCvsMock(...args),
  getUserCvs: (...args: unknown[]) => getUserCvsMock(...args),
}));

const queryParams = {
  search: "",
  page: 1,
  limit: 10,
  sortOrder: SortOrder.ASC,
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

describe("useCvsTableQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches cvs by route user id when userId param is present", async () => {
    useParamsMock.mockReturnValue({ userId: "route-user" });
    useAuthMock.mockReturnValue({ isAdmin: true, userId: "auth-user", isFirstLoad: false });
    getUserCvsMock.mockResolvedValue({ items: [] });

    renderHook(() => useCvsTableQuery(queryParams), { wrapper });

    await waitFor(() => expect(getUserCvsMock).toHaveBeenCalled());

    expect(getCvsMock).not.toHaveBeenCalled();
    expect(getUserCvsMock).toHaveBeenCalledWith(
      "route-user",
      expect.objectContaining({ page: 1, limit: 10, sort_order: SortOrder.ASC }),
    );
  });

  it("fetches all cvs for admin without route user id", async () => {
    useParamsMock.mockReturnValue({});
    useAuthMock.mockReturnValue({ isAdmin: true, userId: "auth-user", isFirstLoad: false });
    getCvsMock.mockResolvedValue({ items: [] });

    renderHook(() => useCvsTableQuery(queryParams), { wrapper });

    await waitFor(() => expect(getCvsMock).toHaveBeenCalled());

    expect(getUserCvsMock).not.toHaveBeenCalled();
    expect(getCvsMock).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, limit: 10, sort_order: SortOrder.ASC }),
    );
  });

  it("fetches current user cvs for non-admin without route user id", async () => {
    useParamsMock.mockReturnValue({});
    useAuthMock.mockReturnValue({ isAdmin: false, userId: "auth-user", isFirstLoad: false });
    getUserCvsMock.mockResolvedValue({ items: [] });

    renderHook(() => useCvsTableQuery(queryParams), { wrapper });

    await waitFor(() => expect(getUserCvsMock).toHaveBeenCalled());

    expect(getCvsMock).not.toHaveBeenCalled();
    expect(getUserCvsMock).toHaveBeenCalledWith(
      "auth-user",
      expect.objectContaining({ page: 1, limit: 10, sort_order: SortOrder.ASC }),
    );
  });
});
