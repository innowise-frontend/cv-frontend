import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UsersPage } from "./UsersPage";

const useSearchMock = vi.hoisted(() => vi.fn());
const useQueryMock = vi.hoisted(() => vi.fn());
const getUsersMock = vi.hoisted(() => vi.fn());
const tableMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
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
});
