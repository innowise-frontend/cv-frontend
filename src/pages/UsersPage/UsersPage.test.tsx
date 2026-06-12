import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VIEW_OPTIONS } from "@root/constants";
import { UsersPage } from "./UsersPage";

const useSearchMock = vi.hoisted(() => vi.fn());
const navigateMock = vi.hoisted(() => vi.fn());
const useUsersApiMock = vi.hoisted(() => vi.fn());
const tableMock = vi.hoisted(() => vi.fn());
const useUserTableColumnsMock = vi.hoisted(() =>
  vi.fn().mockReturnValue({ columns: [{ id: "mock-column" }] as const }),
);

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
  useSearch: () => useSearchMock(),
  useLocation: () => ({ pathname: "/employees" }),
}));

vi.mock("./api", () => ({
  useUsersApi: (params: unknown) => useUsersApiMock(params),
}));

vi.mock("./useUserTableColumns", () => ({
  useUserTableColumns: (options: unknown) => useUserTableColumnsMock(options),
}));

vi.mock("./components", () => ({
  CreateUserModal: () => <div data-testid="create-user-modal" />,
}));

const useAuthMock = vi.hoisted(() => vi.fn(() => ({ isAdmin: true })));

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
  useHandleSearch: () => ({
    onSearch: vi.fn(),
  }),
}));

vi.mock("@root/lib", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@root/lib")>();

  return {
    ...actual,
    getBreadcrumbsLink: (pathname: string, t: (key: string) => string) => ({
      label: t("page.sidebar.employees"),
      href: pathname,
    }),
  };
});

vi.mock("@components/shared", () => ({
  Breadcrumbs: ({ items }: { items: Array<{ label: string }> }) => (
    <div data-testid="breadcrumbs">{items.map((item) => item.label).join(",")}</div>
  ),
  TableSearch: ({ action, searchValue }: { action: React.ReactNode; searchValue: string }) => (
    <div data-testid="table-search" data-search={searchValue}>
      {action}
    </div>
  ),
  Table: (props: Record<string, unknown>) => {
    tableMock(props);

    return <div data-testid="users-table" />;
  },
  Modal: ({ children }: { children: React.ReactNode }) => <div data-testid="modal">{children}</div>,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        "page.sidebar.employees": "Employees",
      })[key] ?? key,
  }),
}));

describe("UsersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthMock.mockReturnValue({ isAdmin: true });
    useSearchMock.mockReturnValue({ search: "" });
    useUsersApiMock.mockReturnValue({ data: undefined });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not render create user modal for non-admin", () => {
    useAuthMock.mockReturnValue({ isAdmin: false });

    render(<UsersPage />);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("renders layout parts and passes fetched users into Table", () => {
    useSearchMock.mockReturnValue({ search: "john" });
    useUsersApiMock.mockReturnValue({
      data: {
        items: [{ id: "1", name: "John" }],
        total_pages: 7,
      },
    });

    render(<UsersPage />);

    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("Employees");
    expect(screen.getByTestId("table-search")).toHaveAttribute("data-search", "john");
    expect(screen.getByTestId("modal")).toContainElement(screen.getByTestId("create-user-modal"));
    expect(screen.getByTestId("users-table")).toBeInTheDocument();
    expect(useUserTableColumnsMock).toHaveBeenCalled();
    expect(tableMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [{ id: "1", name: "John" }],
        pagesAmount: 7,
        currentPage: 1,
        currentSort: undefined,
        currentSortBy: undefined,
        currentViewOption: 10,
        emptyMessage: "page.table.noResults",
        viewOptions: VIEW_OPTIONS,
        columns: [{ id: "mock-column" }],
      }),
    );
  });

  it("requests users with search params and default paging/sorting", () => {
    useSearchMock.mockReturnValue({ search: "anna" });

    render(<UsersPage />);

    expect(useUsersApiMock).toHaveBeenCalledWith({
      search: "anna",
      page: 1,
      limit: 10,
      sort_order: undefined,
      sort_by: undefined,
    });
  });

  it("passes sort state into useUserTableColumns", () => {
    render(<UsersPage />);

    expect(useUserTableColumnsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        currentSort: undefined,
        currentSortBy: undefined,
        onSort: expect.any(Function),
      }),
    );
  });

  it("falls back to empty data when query result is missing", () => {
    useSearchMock.mockReturnValue({});
    useUsersApiMock.mockReturnValue({ data: undefined });

    render(<UsersPage />);

    expect(tableMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [],
        pagesAmount: 0,
      }),
    );
  });

  it("toggles sort order and resets page when sorting the same column", async () => {
    useSearchMock.mockReturnValue({ search: "anna" });

    render(<UsersPage />);

    const getLatestColumnsOptions = () =>
      useUserTableColumnsMock.mock.calls.at(-1)?.[0] as {
        onSort: (sortBy: "first_name" | "last_name" | "department") => void;
      };

    act(() => {
      getLatestColumnsOptions().onSort("department");
    });

    await waitFor(() => {
      expect(useUsersApiMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          sort_order: "ASC",
          sort_by: "department",
        }),
      );
    });

    const latestTableProps = tableMock.mock.calls.at(-1)?.[0] as {
      onChangePage: (p: number) => void;
    };

    act(() => {
      latestTableProps.onChangePage(5);
      getLatestColumnsOptions().onSort("department");
    });

    await waitFor(() => {
      expect(useUsersApiMock).toHaveBeenLastCalledWith({
        search: "anna",
        page: 1,
        limit: 10,
        sort_order: "DESC",
        sort_by: "department",
      });
    });

    act(() => {
      getLatestColumnsOptions().onSort("department");
    });

    await waitFor(() => {
      expect(useUsersApiMock).toHaveBeenLastCalledWith({
        search: "anna",
        page: 1,
        limit: 10,
        sort_order: undefined,
        sort_by: undefined,
      });
    });
  });

  it("switches sort column and resets order to ASC", async () => {
    useSearchMock.mockReturnValue({ search: "anna" });

    render(<UsersPage />);

    const columnsOptions = useUserTableColumnsMock.mock.calls[0][0] as {
      onSort: (sortBy: "first_name" | "last_name" | "department") => void;
    };

    act(() => {
      columnsOptions.onSort("first_name");
    });

    await waitFor(() => {
      expect(useUsersApiMock).toHaveBeenLastCalledWith({
        search: "anna",
        page: 1,
        limit: 10,
        sort_order: "ASC",
        sort_by: "first_name",
      });
    });
  });

  it("changes page size and resets page when view option callback is triggered", async () => {
    useSearchMock.mockReturnValue({ search: "max" });

    render(<UsersPage />);

    const firstCall = tableMock.mock.calls[0][0] as {
      onChangePage: (p: number) => void;
      onChangeViewOption: (limit: number) => void;
    };
    act(() => {
      firstCall.onChangePage(4);
      firstCall.onChangeViewOption(25);
    });

    await waitFor(() => {
      expect(useUsersApiMock).toHaveBeenLastCalledWith({
        search: "max",
        page: 1,
        limit: 25,
        sort_order: undefined,
        sort_by: undefined,
      });
    });
  });

  it("does not pass legacy row actions to Table", () => {
    render(<UsersPage />);

    const tableProps = tableMock.mock.calls[0][0] as Record<string, unknown>;
    expect(tableProps.actions).toBeUndefined();
  });
});
