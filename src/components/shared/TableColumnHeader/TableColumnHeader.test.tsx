import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TableColumnHeader } from "./TableColumnHeader";

vi.mock("@assets/icon/ArrowUpIcon.svg?react", () => ({
  default: ({ className }: { className?: string }) => (
    <svg data-testid="sort-icon" className={className} />
  ),
}));

vi.mock("@components/shared", () => ({
  Button: ({
    children,
    onClick,
    className,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: string;
  }) => (
    <button type="button" onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  ),
}));

describe("TableColumnHeader", () => {
  it("renders plain title when sortOrder is undefined", () => {
    render(<TableColumnHeader title="Department" />);

    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Department" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("sort-icon")).not.toBeInTheDocument();
  });

  it("renders sortable button and calls onChangeSorting", async () => {
    const user = userEvent.setup();
    const onChangeSorting = vi.fn();

    render(
      <TableColumnHeader title="Department" sortOrder="DESC" onChangeSorting={onChangeSorting} />,
    );

    const button = screen.getByRole("button", { name: "Department" });
    expect(button).toHaveAttribute("data-variant", "ghost");
    expect(screen.getByTestId("sort-icon")).not.toHaveClass("rotate-180");

    await user.click(button);

    expect(onChangeSorting).toHaveBeenCalledTimes(1);
  });

  it("rotates icon for ASC sort order", () => {
    render(<TableColumnHeader title="Department" sortOrder="ASC" onChangeSorting={vi.fn()} />);

    expect(screen.getByTestId("sort-icon")).toHaveClass("rotate-180");
  });
});
