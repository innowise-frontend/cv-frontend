import { render } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useProjectsTableColumns } from "./useProjectsTableColumns";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@components/shared", () => ({
  formatProjectDateDisplay: (value?: string) => (value === "2025-06-15" ? "15/06/2025" : ""),
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TableActions: ({ actions }: { actions: Array<{ label: ReactNode }> }) => (
    <div>{actions.length}</div>
  ),
  TableColumnHeader: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock("..", () => ({
  UpdateProjectModal: () => <div>update</div>,
  DeleteProjectModal: () => <div>delete</div>,
}));

describe("useProjectsTableColumns", () => {
  it("returns 5 columns: name, domain, dates, and actions", () => {
    const Harness = () => {
      const { columns } = useProjectsTableColumns();

      return <div data-testid="count">{columns.length}</div>;
    };

    const { getByTestId } = render(<Harness />);
    expect(getByTestId("count").textContent).toBe("5");
  });
});
