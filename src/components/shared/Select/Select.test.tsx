import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const list = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
];

describe("Select", () => {
  it("renders single select label and selected value", () => {
    render(
      <Select
        list={list}
        label="Department"
        placeholder="Choose department"
        value="frontend"
        onValueChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("calls onValueChange when a single value is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        list={list}
        label="Department"
        placeholder="Choose department"
        value={null}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Department" }));
    await user.click(await screen.findByText("Backend"));

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith("backend");
    });
  });

  it("calls onValueChange with selected values in multiselect mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        multiple
        list={list}
        label="Skills"
        placeholder="Choose skills"
        value={[]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Skills" }));
    await user.click(await screen.findByText("Frontend"));

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith(["frontend"]);
    });
  });
});
