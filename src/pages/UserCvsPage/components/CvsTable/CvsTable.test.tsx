import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SortOrder } from "@root/constants";
import { CvsTable } from "./CvsTable";

const useCvsTableQueryMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useHandleSearch: () => ({ onSearch: vi.fn() }),
}));

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => ({ search: "" }),
  useLocation: () => ({ pathname: "/cvs" }),
  useNavigate: () => vi.fn(),
}));

vi.mock("./useCvsTableColumns", () => ({
  useCvsTableColumns: () => ({ columns: [] }),
}));

vi.mock("../../api", () => ({
  useCvsTableQuery: (...args: unknown[]) => useCvsTableQueryMock(...args),
}));

vi.mock("../CreateCvModal/CreateCvModal", () => ({
  CreateCvModal: () => <div>create-cv-modal</div>,
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TableSearch: ({ action }: { action?: ReactNode }) => <div>{action}</div>,
  Table: ({
    onSort,
    onChangeViewOption,
    emptyMessage,
  }: {
    onSort: () => void;
    onChangeViewOption: (limit: number) => void;
    emptyMessage: string;
  }) => (
    <div>
      <span>{emptyMessage}</span>
      <button onClick={onSort}>sort</button>
      <button onClick={() => onChangeViewOption(20)}>view</button>
    </div>
  ),
}));

describe("CvsTable", () => {
  it("passes query params and toggles sort order", () => {
    useCvsTableQueryMock.mockReturnValue({ data: { items: [], total_pages: 1 }, isLoading: false });

    render(<CvsTable />);

    expect(useCvsTableQueryMock).toHaveBeenCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: undefined,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));

    expect(useCvsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.ASC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));

    expect(useCvsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.DESC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));

    expect(useCvsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: undefined,
    });
  });

  it("shows no data message when search is empty", () => {
    useCvsTableQueryMock.mockReturnValue({ data: { items: [], total_pages: 0 }, isLoading: false });

    render(<CvsTable />);

    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});
