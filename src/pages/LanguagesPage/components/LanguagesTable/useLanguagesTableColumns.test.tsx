import { render } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useLanguagesTableColumns } from "./useLanguagesTableColumns";

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TableActions: ({ actions }: { actions: Array<{ label: ReactNode }> }) => (
    <div>{actions.length}</div>
  ),
  TableColumnHeader: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock("..", () => ({
  UpdateLanguageModal: () => <div>update</div>,
  DeleteLanguageModal: () => <div>delete</div>,
}));

describe("useLanguagesTableColumns", () => {
  it("returns table columns", () => {
    const Harness = () => {
      const { columns } = useLanguagesTableColumns();

      return <div data-testid="count">{columns.length}</div>;
    };

    const { getByTestId } = render(<Harness />);
    expect(getByTestId("count").textContent).toBe("4");
  });
});
