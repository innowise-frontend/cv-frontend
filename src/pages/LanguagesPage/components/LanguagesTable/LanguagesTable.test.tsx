import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SortOrder } from "@root/constants";
import { LanguagesTable } from "./LanguagesTable";

const useLanguagesTableQueryMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ isAdmin: true }),
  useHandleSearch: () => ({ onSearch: vi.fn() }),
}));

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => ({ search: "" }),
  useLocation: () => ({ pathname: "/_app/languages" }),
  useNavigate: () => vi.fn(),
}));

vi.mock("./useLanguagesTableColumns", () => ({
  useLanguagesTableColumns: () => ({ columns: [] }),
}));

vi.mock("../../api", () => ({
  useLanguagesTableQuery: (...args: unknown[]) => useLanguagesTableQueryMock(...args),
}));

vi.mock("../CreateLanguageModal/CreateLanguageModal", () => ({
  CreateLanguageModal: () => <div>create modal</div>,
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

describe("LanguagesTable", () => {
  it("passes query params and updates sort", () => {
    useLanguagesTableQueryMock.mockReturnValue({ data: { items: [], total_pages: 1 } });
    render(<LanguagesTable />);

    expect(useLanguagesTableQueryMock).toHaveBeenCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.ASC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(useLanguagesTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.DESC,
    });
  });
});
