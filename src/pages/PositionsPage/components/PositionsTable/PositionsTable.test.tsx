import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SortOrder } from "@root/constants";
import { PositionsTable } from "./PositionsTable";

const usePositionsTableQueryMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ isAdmin: true }),
  useHandleSearch: () => ({ onSearch: vi.fn() }),
}));

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => ({ search: "" }),
  useLocation: () => ({ pathname: "/_app/positions" }),
  useNavigate: () => vi.fn(),
}));

vi.mock("./usePositionsTableColumns", () => ({
  usePositionsTableColumns: () => ({ columns: [] }),
}));

vi.mock("../../api", () => ({
  usePositionsTableQuery: (...args: unknown[]) => usePositionsTableQueryMock(...args),
}));

vi.mock("../CreatePositionModal/CreatePositionModal", () => ({
  CreatePositionModal: () => <div>create modal</div>,
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

describe("PositionsTable", () => {
  it("renders create modal for admin", () => {
    usePositionsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 0 },
      isLoading: false,
    });
    render(<PositionsTable />);

    expect(screen.getByText("create modal")).toBeInTheDocument();
  });

  it("passes query params and updates sort", () => {
    usePositionsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 1 },
      isLoading: false,
    });
    render(<PositionsTable />);

    expect(usePositionsTableQueryMock).toHaveBeenCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: undefined,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(usePositionsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.ASC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(usePositionsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.DESC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(usePositionsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: undefined,
    });
  });

  it("updates limit and resets page on view option change", () => {
    usePositionsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 1 },
      isLoading: false,
    });
    render(<PositionsTable />);

    fireEvent.click(screen.getByRole("button", { name: "view" }));
    expect(usePositionsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 20,
      sortOrder: undefined,
    });
  });
});
