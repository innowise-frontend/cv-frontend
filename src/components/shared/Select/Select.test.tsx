import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
];

describe("Select", () => {
  it("should render select trigger", () => {
    render(<Select options={options} onValueChange={vi.fn()} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should show default selected option value", () => {
    render(<Select options={options} onValueChange={vi.fn()} />);

    expect(screen.getByRole("combobox")).toHaveTextContent("5");
  });

  it("should render options when opened", async () => {
    const user = userEvent.setup();

    render(<Select options={options} onValueChange={vi.fn()} />);

    await user.click(screen.getByRole("combobox"));

    expect(await screen.findByRole("option", { name: "5" })).toBeInTheDocument();
    expect(await screen.findByRole("option", { name: "10" })).toBeInTheDocument();
    expect(await screen.findByRole("option", { name: "20" })).toBeInTheDocument();
  });

  it("should call onValueChange when option is selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<Select options={options} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "10" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(10);
  });

  it("should update displayed value after selecting another option", async () => {
    const user = userEvent.setup();

    render(<Select options={options} onValueChange={vi.fn()} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "20" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("20");
  });
});
