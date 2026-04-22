import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";

const createProps = (overrides?: Partial<React.ComponentProps<typeof Pagination>>) => ({
  pagesCount: 3,
  currentPage: 1,
  onPreviousPage: vi.fn(),
  onNextPage: vi.fn(),
  onPageChange: vi.fn(),
  viewOptions: [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
  ],
  onChangeViewOption: vi.fn(),
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
    render(<Pagination {...createProps({ currentPage: 0 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [previousButton, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  it("should disable next button on the last page", () => {
    render(<Pagination {...createProps({ currentPage: 2, pagesCount: 3 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [previousButton, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    expect(previousButton).toBeEnabled();
    expect(nextButton).toBeDisabled();
  });

  it("should call onPreviousPage when previous button is clicked", async () => {
    const user = userEvent.setup();
    const onPreviousPage = vi.fn();

    render(<Pagination {...createProps({ onPreviousPage, currentPage: 1 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [previousButton] = nav.querySelectorAll('[data-slot="button"]');

    await user.click(previousButton);

    expect(onPreviousPage).toHaveBeenCalledTimes(1);
  });

  it("should call onNextPage with next page index", async () => {
    const user = userEvent.setup();
    const onNextPage = vi.fn();

    render(<Pagination {...createProps({ onNextPage, currentPage: 1 })} />);
    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    await user.click(nextButton);

    expect(onNextPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange with selected page index", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination {...createProps({ onPageChange })} />);

    await user.click(screen.getByRole("button", { name: "3" }));

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should merge className onto pagination root", () => {
    render(<Pagination {...createProps({ className: "pagination-extra" })} />);

    expect(screen.getByRole("navigation", { name: "pagination" })).toHaveClass("pagination-extra");
  });
});
