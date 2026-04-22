import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TableSearch } from "./TableSearch";

const searchInputMock = vi.fn(({ defaultValue }: { defaultValue?: string }) => (
  <div data-testid="search-input">{defaultValue}</div>
));

vi.mock("@components/shared", () => ({
  SearchInput: (props: { defaultValue?: string }) => searchInputMock(props),
}));

describe("TableSearch", () => {
  beforeEach(() => {
    searchInputMock.mockClear();
    window.history.pushState({}, "", "/");
  });

  it("should render action node", () => {
    render(<TableSearch action={<button type="button">Add user</button>} />);

    expect(screen.getByRole("button", { name: "Add user" })).toBeInTheDocument();
  });

  it("should pass search query param as SearchInput defaultValue", () => {
    window.history.pushState({}, "", "/users?search=anna");

    render(<TableSearch action={null} />);

    expect(searchInputMock).toHaveBeenCalledTimes(1);
    expect(searchInputMock).toHaveBeenCalledWith(expect.objectContaining({ defaultValue: "anna" }));
    expect(screen.getByTestId("search-input")).toHaveTextContent("anna");
  });

  it("should pass empty defaultValue when search query param is missing", () => {
    render(<TableSearch action={null} />);

    expect(searchInputMock).toHaveBeenCalledTimes(1);
    expect(searchInputMock).toHaveBeenCalledWith(expect.objectContaining({ defaultValue: "" }));
    expect(screen.getByTestId("search-input")).toBeEmptyDOMElement();
  });
});
