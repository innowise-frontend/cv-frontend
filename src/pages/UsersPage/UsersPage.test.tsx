import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UsersPage } from "./UsersPage";

const useSearchMock = vi.hoisted(() => vi.fn());
const useQueryMock = vi.hoisted(() => vi.fn());
const getUsersMock = vi.hoisted(() => vi.fn());
const tableMock = vi.hoisted(() => vi.fn());
const navigateMock = vi.hoisted(() => vi.fn());
const consoleLogMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
  useSearch: () => useSearchMock(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: (options: unknown) => useQueryMock(options),
}));

vi.mock("@services/users", () => ({
  getUsers: (params: unknown) => getUsersMock(params),
}));

vi.mock("@root/components/shared", () => ({
  Breadcrumbs: ({ items }: { items: Array<{ label: string }> }) => (
    <div data-testid="breadcrumbs">{items.map((item) => item.label).join(",")}</div>
  ),
  TableSearch: ({ action }: { action: React.ReactNode }) => (
    <div data-testid="table-search">{action}</div>
  ),
  Table: (props: unknown) => {
    tableMock(props);

    return <div data-testid="users-table" />;
  },
  ROUTES: {
    USER_PAGE: "/users/$userId",
  },
}));

vi.mock("./columns", () => ({
  columns: [{ accessorKey: "department", header: "Department" }],
}));

describe("UsersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSearchMock.mockReturnValue({ search: "" });
    useQueryMock.mockReturnValue({ data: undefined });
    vi.spyOn(console, "log").mockImplementation(consoleLogMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders layout parts and passes fetched users into Table", () => {
    useSearchMock.mockReturnValue({ search: "john" });
    useQueryMock.mockReturnValue({
      data: {
        items: [{ id: "1", name: "John" }],
        total_pages: 7,
      },
    });

    render(<UsersPage />);

    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("Employees");
    expect(screen.getByTestId("table-search")).toBeInTheDocument();
    expect(screen.getByTestId("users-table")).toBeInTheDocument();
    expect(tableMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [{ id: "1", name: "John" }],
        pagesAmount: 7,
        currentPage: 1,
        currentSort: "ASC",
      }),
    );
  });

  it("requests users with search params and default paging/sorting", () => {
    useSearchMock.mockReturnValue({ search: "anna" });
    useQueryMock.mockImplementation(({ queryFn }: { queryFn: () => unknown }) => {
      queryFn();

      return { data: undefined };
    });

    render(<UsersPage />);

    expect(getUsersMock).toHaveBeenCalledWith({
      search: "anna",
      page: 1,
      limit: 10,
      sort_order: "ASC",
      sort_by: "department",
    });
  });

  it("falls back to empty data when query result is missing", () => {
    useSearchMock.mockReturnValue({});
    useQueryMock.mockReturnValue({ data: undefined });

    render(<UsersPage />);

    expect(tableMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
        pagesAmount: 0,
      }),
    );
  });

  it("toggles sort and resets page when table sort callback is triggered", () => {
    useSearchMock.mockReturnValue({ search: "anna" });
    useQueryMock.mockImplementation(({ queryFn }: { queryFn: () => unknown }) => {
      queryFn();

      return { data: undefined };
    });

    render(<UsersPage />);

    const firstCall = tableMock.mock.calls[0][0];
    act(() => {
      firstCall.onChangePage(5);
      firstCall.onSort();
    });

    return waitFor(() => {
      expect(getUsersMock).toHaveBeenLastCalledWith({
        search: "anna",
        page: 1,
        limit: 10,
        sort_order: "DESC",
        sort_by: "department",
      });
    });
  });

  it("changes page size and resets page when view option callback is triggered", () => {
    useSearchMock.mockReturnValue({ search: "max" });
    useQueryMock.mockImplementation(({ queryFn }: { queryFn: () => unknown }) => {
      queryFn();

      return { data: undefined };
    });

    render(<UsersPage />);

    const firstCall = tableMock.mock.calls[0][0];
    act(() => {
      firstCall.onChangePage(4);
      firstCall.onChangeViewOption(25);
    });

    return waitFor(() => {
      expect(getUsersMock).toHaveBeenLastCalledWith({
        search: "max",
        page: 1,
        limit: 25,
        sort_order: "ASC",
        sort_by: "department",
      });
    });
  });

  it("passes admin actions to table and wires action callbacks", () => {
    useSearchMock.mockReturnValue({ search: "kate" });

    render(<UsersPage />);

    const tableProps = tableMock.mock.calls[0][0];
    expect(tableProps.actions).toHaveLength(3);

    tableProps.actions[0].onClick("u-10");
    expect(navigateMock).toHaveBeenCalledWith({
      to: "/users/$userId",
      params: { userId: "u-10" },
    });

    tableProps.actions[1].onClick("u-11");
    tableProps.actions[2].onClick("u-12");
    expect(consoleLogMock).toHaveBeenCalledWith("u-11");
    expect(consoleLogMock).toHaveBeenCalledWith("u-12");
  });
});
