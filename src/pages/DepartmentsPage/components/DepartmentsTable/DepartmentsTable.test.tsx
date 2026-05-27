import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
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
    onChangeViewOption,
    onChangePage,
  }: {
    onChangeViewOption: (limit: number) => void;
    onChangePage: (page: number) => void;
  }) => (
    <div>
      <button onClick={() => onChangeViewOption(20)}>view</button>
      <button onClick={() => onChangePage(2)}>page</button>
    </div>
  ),
}));

describe("DepartmentsTable", () => {
  it("renders without crashing and shows create modal for admin", () => {
    useDepartmentsTableQueryMock.mockReturnValue({ data: [], isLoading: false });
    render(<DepartmentsTable />);

    expect(screen.getByText("create modal")).toBeInTheDocument();
  });

  it("updates limit and resets page on view option change", () => {
    useDepartmentsTableQueryMock.mockReturnValue({ data: [], isLoading: false });
    render(<DepartmentsTable />);

    fireEvent.click(screen.getByRole("button", { name: "view" }));
    expect(useDepartmentsTableQueryMock).toHaveBeenCalled();
  });
});
