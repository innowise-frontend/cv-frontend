import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SortOrder } from "@root/constants";
import { ProjectsTable } from "./ProjectsTable";

const useProjectsTableQueryMock = vi.hoisted(() => vi.fn());
const navigateMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useHandleSearch: ({ onSearchChange }: { onSearchChange: (value: string) => void }) => ({
    onSearch: (value: string) => onSearchChange(value),
  }),
}));

vi.mock("@tanstack/react-router", () => ({
  useSearch: () => ({ search: "" }),
  useLocation: () => ({ pathname: "/_app/projects" }),
  useNavigate: () => navigateMock,
}));

vi.mock("./useProjectsTableColumns", () => ({
  useProjectsTableColumns: () => ({ columns: [] }),
}));

vi.mock("../../api", () => ({
  useProjectsTableQuery: (...args: unknown[]) => useProjectsTableQueryMock(...args),
}));

vi.mock("../CreateProjectModal/CreateProjectModal", () => ({
  CreateProjectModal: () => <div>create modal</div>,
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TableSearch: ({
    action,
    onSearch,
  }: {
    action?: ReactNode;
    onSearch: (value: string) => void;
  }) => (
    <div>
      {action}
      <button onClick={() => onSearch("react")}>search</button>
    </div>
  ),
  Table: ({
    emptyMessage,
    onSort,
    onChangeViewOption,
    renderSubRow,
    data,
  }: {
    emptyMessage: string;
    onSort: () => void;
    onChangeViewOption: (limit: number) => void;
    renderSubRow?: (row: { original: { description: string; environment: string[] } }) => ReactNode;
    data: Array<{ description: string; environment: string[] }>;
  }) => (
    <div>
      <span>{emptyMessage}</span>
      <button onClick={onSort}>sort</button>
      <button onClick={() => onChangeViewOption(20)}>view</button>
      {data.length > 0 && renderSubRow?.({ original: data[0] })}
    </div>
  ),
}));

describe("ProjectsTable", () => {
  it("renders create modal", () => {
    useProjectsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 0 },
      isLoading: false,
    });
    render(<ProjectsTable />);

    expect(screen.getByText("create modal")).toBeInTheDocument();
  });

  it("passes query params and updates sort", () => {
    useProjectsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 1 },
      isLoading: false,
    });
    render(<ProjectsTable />);

    expect(useProjectsTableQueryMock).toHaveBeenCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.ASC,
    });

    fireEvent.click(screen.getByRole("button", { name: "sort" }));
    expect(useProjectsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 10,
      sortOrder: SortOrder.DESC,
    });
  });

  it("updates limit and resets page on view option change", () => {
    useProjectsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 1 },
      isLoading: false,
    });
    render(<ProjectsTable />);

    fireEvent.click(screen.getByRole("button", { name: "view" }));
    expect(useProjectsTableQueryMock).toHaveBeenLastCalledWith({
      search: "",
      page: 1,
      limit: 20,
      sortOrder: SortOrder.ASC,
    });
  });

  it("shows no data message when table is empty", () => {
    useProjectsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 0 },
      isLoading: false,
    });
    render(<ProjectsTable />);

    expect(screen.getByText("No projects yet")).toBeInTheDocument();
  });

  it("navigates with search and resets page", () => {
    useProjectsTableQueryMock.mockReturnValue({
      data: { items: [], total_pages: 0 },
      isLoading: false,
    });
    render(<ProjectsTable />);

    fireEvent.click(screen.getByRole("button", { name: "search" }));

    expect(navigateMock).toHaveBeenCalledWith({
      to: "/_app/projects",
      search: { search: "react" },
      replace: true,
    });
  });

  it("renders sub row description and environment tags", () => {
    useProjectsTableQueryMock.mockReturnValue({
      data: {
        items: [{ description: "CV platform", environment: ["React", "TypeScript"] }],
        total_pages: 1,
      },
      isLoading: false,
    });
    render(<ProjectsTable />);

    expect(screen.getByText("CV platform")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
