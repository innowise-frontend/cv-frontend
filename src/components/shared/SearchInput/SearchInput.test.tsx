import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as useSearchParamsHook from "@root/hooks/useHandleSearch/useHandleSearch";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("should render the search input with placeholder", () => {
    vi.spyOn(useSearchParamsHook, "useHandleSearch").mockReturnValue({ onSearch: vi.fn() });

    render(<SearchInput />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter")).toBeInTheDocument();
  });

  it("should call onSearch when the input value changes", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    vi.spyOn(useSearchParamsHook, "useHandleSearch").mockReturnValue({ onSearch });

    render(<SearchInput />);

    await user.type(screen.getByRole("textbox"), "test");

    expect(onSearch).toHaveBeenCalled();
    expect(onSearch).toHaveBeenLastCalledWith("test");
  });

  it("should render provided defaultValue", () => {
    vi.spyOn(useSearchParamsHook, "useHandleSearch").mockReturnValue({ onSearch: vi.fn() });

    render(<SearchInput defaultValue="initial query" />);

    expect(screen.getByRole("textbox")).toHaveDisplayValue("initial query");
  });

  it("should render the search input", () => {
    vi.spyOn(useSearchParamsHook, "useHandleSearch").mockReturnValue({ onSearch: vi.fn() });

    render(<SearchInput />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
