import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

const createProps = (overrides?: Partial<React.ComponentProps<typeof Pagination>>) => ({
  pagesCount: 3,
  currentPage: 1,
  onPageChange: vi.fn(),
  ...overrides,
});

describe("Pagination", () => {
  it("should render all page links", () => {
    render(<Pagination {...createProps({ pagesCount: 4 })} />);

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
  });

  it("should disable previous button on the first page", () => {
    render(<Pagination {...createProps({ currentPage: 1 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [previousButton, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  it("should disable next button on the last page", () => {
    render(<Pagination {...createProps({ currentPage: 3, pagesCount: 3 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [previousButton, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    expect(previousButton).toBeEnabled();
    expect(nextButton).toBeDisabled();
  });

  it("should call onPageChange with previous page when previous button is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination {...createProps({ onPageChange, currentPage: 2 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [previousButton] = nav.querySelectorAll('[data-slot="button"]');

    await user.click(previousButton);

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should call onPageChange with next page index", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination {...createProps({ onPageChange, currentPage: 1 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange with selected page index", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination {...createProps({ onPageChange })} />);

    await user.click(screen.getByRole("button", { name: "3" }));

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("should merge className onto pagination root", () => {
    render(<Pagination {...createProps({ className: "pagination-extra" })} />);

    expect(screen.getByRole("navigation", { name: "pagination" })).toHaveClass("pagination-extra");
  });
});
