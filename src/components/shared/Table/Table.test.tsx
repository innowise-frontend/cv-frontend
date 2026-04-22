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
      <Table data={[]} columns={columns} viewOptions={viewOptions} onChangeViewOption={vi.fn()} />,
    );

    expect(screen.getByText("No data results")).toBeInTheDocument();
  });

  it("should render first page with 8 rows by default", () => {
    render(
      <Table
        data={createPeople(10)}
        columns={columns}
        viewOptions={viewOptions}
        onChangeViewOption={vi.fn()}
      />,
    );

    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 8")).toBeInTheDocument();
    expect(screen.queryByText("User 9")).not.toBeInTheDocument();
  });

  it("should navigate to next page when next button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Table
        data={createPeople(10)}
        columns={columns}
        viewOptions={viewOptions}
        onChangeViewOption={vi.fn()}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "pagination" });
    const [, nextButton] = nav.querySelectorAll('[data-slot="button"]');

    await user.click(nextButton);

    expect(await screen.findByText("User 9")).toBeInTheDocument();
    expect(screen.queryByText("User 1")).not.toBeInTheDocument();
  });

  it("does not render view option select (no combobox)", async () => {
    const onChangeViewOption = vi.fn();

    render(
      <Table
        data={createPeople(3)}
        columns={columns}
        viewOptions={viewOptions}
        onChangeViewOption={onChangeViewOption}
      />,
    );

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(onChangeViewOption).not.toHaveBeenCalled();
  });
});
