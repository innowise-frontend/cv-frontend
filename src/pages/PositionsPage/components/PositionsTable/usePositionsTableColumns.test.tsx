import { render } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { usePositionsTableColumns } from "./usePositionsTableColumns";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TableActions: ({ actions }: { actions: Array<{ label: ReactNode }> }) => (
    <div>{actions.length}</div>
  ),
  TableColumnHeader: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock("..", () => ({
  UpdatePositionModal: () => <div>update</div>,
  DeletePositionModal: () => <div>delete</div>,
}));

describe("usePositionsTableColumns", () => {
  it("returns 2 columns: name and actions", () => {
    const Harness = () => {
      const { columns } = usePositionsTableColumns();

      return <div data-testid="count">{columns.length}</div>;
    };

    const { getByTestId } = render(<Harness />);
    expect(getByTestId("count").textContent).toBe("2");
  });
});
