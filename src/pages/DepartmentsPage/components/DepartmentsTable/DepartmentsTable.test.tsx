import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SortOrder } from "@root/constants";
import { DepartmentsTable } from "./DepartmentsTable";

const useDepartmentsTableQueryMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ isAdmin: true }),
  useHandleSearch: () => ({ onSearch: vi.fn() }),
}));

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => ({ search: "" }),
  useLocation: () => ({ pathname: "/_app/departments" }),
  useNavigate: () => vi.fn(),
}));

vi.mock("./useDepartmentsTableColumns", () => ({
  useDepartmentsTableColumns: () => ({ columns: [] }),
}));

vi.mock("../../api", () => ({
  useDepartmentsTableQuery: (...args: unknown[]) => useDepartmentsTableQueryMock(...args),
}));

vi.mock("../CreateDepartmentModal/CreateDepartmentModal", () => ({
  CreateDepartmentModal: () => <div>create modal</div>,
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TableSearch: ({ action }: { action?: ReactNode }) => <div>{action}</div>,
  Table: ({
    onSort,
    onChangeViewOption,
  }: {
    onSort: () => void;
    onChangeViewOption: (limit: number) => void;
  }) => (
    <div>
      <button onClick={onSort}>sort</button>
      <button onClick={() => onChangeViewOption(20)}>view</button>
    </div>
  ),
}));

describe("DepartmentsTable", () => {
  it("renders create modal for admin", () => {
    useDepartmentsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 0 },
      isLoading: false,
    });
    render(<DepartmentsTable />);

    expect(screen.getByText("create modal")).toBeInTheDocument();
  });

  it("passes query params and updates sort", () => {
    useDepartmentsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 1 },
      isLoading: false,
    });
    render(<DepartmentsTable />);

    expect(useDepartmentsTableQueryMock).toHaveBeenCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: undefined,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(useDepartmentsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.ASC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(useDepartmentsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.DESC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(useDepartmentsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: undefined,
    });
  });

  it("updates limit and resets page on view option change", () => {
    useDepartmentsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 1 },
      isLoading: false,
    });
    render(<DepartmentsTable />);

    fireEvent.click(screen.getByRole("button", { name: "view" }));
    expect(useDepartmentsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 20,
      sortOrder: undefined,
    });
  });
});
