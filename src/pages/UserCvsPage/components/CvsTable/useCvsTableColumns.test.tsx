import { render } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useCvsTableColumns } from "./useCvsTableColumns";

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TableActions: ({ actions }: { actions: Array<{ label: ReactNode }> }) => (
    <div data-testid="actions-count">{actions.length}</div>
  ),
  TableColumnHeader: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock("..", () => ({
  UpdateCvModal: () => <div>update</div>,
  DeleteCvModal: () => <div>delete</div>,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("useCvsTableColumns", () => {
  it("returns four table columns with actions last", () => {
    const Harness = () => {
      const { columns } = useCvsTableColumns();

      return (
        <div>
          <span data-testid="count">{columns.length}</span>
          <span data-testid="last-id">{columns[columns.length - 1]?.id}</span>
        </div>
      );
    };

    const { getByTestId } = render(<Harness />);

    expect(getByTestId("count").textContent).toBe("4");
    expect(getByTestId("last-id").textContent).toBe("actions");
  });
});
