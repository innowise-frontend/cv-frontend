import { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Table } from "./Table";

interface Person {
  id: number;
  name: string;
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
];

const createPeople = (count: number): Person[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
  }));

const viewOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
];

describe("Table", () => {
  it("should render table headers and rows", () => {
    render(
      <Table
        data={[
          { id: 1, name: "John" },
          { id: 2, name: "Jane" },
        ]}
        columns={columns}
        pagesAmount={1}
        currentPage={1}
        currentSort="ASC"
        onChangePage={vi.fn()}
        viewOptions={viewOptions}
        onChangeViewOption={vi.fn()}
      />,
    );

    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("should render no data state when rows are empty", () => {
    render(
      <Table
        data={[]}
        columns={columns}
        pagesAmount={1}
        currentPage={1}
        currentSort="ASC"
        onChangePage={vi.fn()}
        viewOptions={viewOptions}
        onChangeViewOption={vi.fn()}
      />,
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("should render all rows from provided data", () => {
    render(
      <Table
        data={createPeople(10)}
        columns={columns}
        pagesAmount={1}
        currentPage={1}
        currentSort="ASC"
        onChangePage={vi.fn()}
        viewOptions={viewOptions}
        onChangeViewOption={vi.fn()}
      />,
    );

    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 8")).toBeInTheDocument();
    expect(screen.getByText("User 9")).toBeInTheDocument();
    expect(screen.getByText("User 10")).toBeInTheDocument();
  });

  it("should call onChangePage when next pagination button is clicked", async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn();

    render(
      <Table
        data={createPeople(10)}
        columns={columns}
        pagesAmount={3}
        currentPage={1}
        currentSort="ASC"
        onChangePage={onChangePage}
        viewOptions={viewOptions}
        onChangeViewOption={vi.fn()}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    await user.click(nextButton);

    expect(onChangePage).toHaveBeenCalledTimes(1);
    expect(onChangePage).toHaveBeenCalledWith(2);
  });

  it("should render view option select and call onChangeViewOption", async () => {
    const user = userEvent.setup();
    const onChangeViewOption = vi.fn();

    render(
      <Table
        data={createPeople(3)}
        columns={columns}
        pagesAmount={1}
        currentPage={1}
        currentSort="ASC"
        onChangePage={vi.fn()}
        viewOptions={viewOptions}
        onChangeViewOption={onChangeViewOption}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("5");

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("10"));

    expect(onChangeViewOption).toHaveBeenCalledTimes(1);
    expect(onChangeViewOption).toHaveBeenCalledWith(10);
    expect(screen.getByRole("combobox")).toHaveTextContent("10");
  });
});
