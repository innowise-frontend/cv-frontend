import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("should render the search input with placeholder", () => {
    render(<SearchInput value="" onValueChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("should call onSearch when the input value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    const SearchInputWrapper = () => {
      const [value, setValue] = useState("");

      return (
        <SearchInput
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue);
            onValueChange(nextValue);
          }}
        />
      );
    };

    render(<SearchInputWrapper />);

    await user.type(screen.getByRole("textbox"), "test");

    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenLastCalledWith("test");
  });

  it("should render provided defaultValue", () => {
    render(<SearchInput value="initial query" onValueChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toHaveDisplayValue("initial query");
  });

  it("should render the search input", () => {
    render(<SearchInput value="" onValueChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
