import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TableSearch } from "./TableSearch";

const searchInputMock = vi.fn(({ value }: { value: string }) => (
  <div data-testid="search-input">{value}</div>
));

vi.mock("@components/shared", () => ({
  SearchInput: (props: { value: string; onValueChange: (value: string) => void }) =>
    searchInputMock(props),
}));

describe("TableSearch", () => {
  beforeEach(() => {
    searchInputMock.mockClear();
  });

  it("should render action node", () => {
    render(
      <TableSearch
        action={<button type="button">Add user</button>}
        searchValue=""
        onSearch={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Add user" })).toBeInTheDocument();
  });

  it("should pass search query param as SearchInput value", () => {
    render(<TableSearch action={null} searchValue="anna" onSearch={vi.fn()} />);

    expect(searchInputMock).toHaveBeenCalledTimes(1);
    expect(searchInputMock).toHaveBeenCalledWith(expect.objectContaining({ value: "anna" }));
    expect(screen.getByTestId("search-input")).toHaveTextContent("anna");
  });

  it("should pass empty value when search query param is missing", () => {
    render(<TableSearch action={null} searchValue="" onSearch={vi.fn()} />);

    expect(searchInputMock).toHaveBeenCalledTimes(1);
    expect(searchInputMock).toHaveBeenCalledWith(expect.objectContaining({ value: "" }));
    expect(screen.getByTestId("search-input")).toBeEmptyDOMElement();
  });
});
