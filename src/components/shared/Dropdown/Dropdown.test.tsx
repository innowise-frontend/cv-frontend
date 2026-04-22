import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  it("should render the trigger button", () => {
    render(<Dropdown options={[]} />);

    expect(screen.getByRole("button", { name: "open dropdown" })).toBeInTheDocument();
  });

  it("should render all options when menu is opened", async () => {
    const user = userEvent.setup();
    const options = [
      { label: "Edit", onClick: vi.fn() },
      { label: "Delete", onClick: vi.fn() },
    ];

    render(<Dropdown options={options} />);

    await user.tab();
    await user.keyboard("{Enter}");

    expect(await screen.findByText("Edit")).toBeInTheDocument();
    expect(await screen.findByText("Delete")).toBeInTheDocument();
  });

  it("should call option onClick when item is clicked", async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();

    render(<Dropdown options={[{ label: "Edit", onClick: handleEdit }]} />);

    await user.tab();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByText("Edit"));

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it("should render option icon when provided", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        options={[
          {
            label: "Edit",
            onClick: vi.fn(),
            icon: <span data-testid="edit-icon">icon</span>,
          },
        ]}
      />,
    );

    await user.tab();
    await user.keyboard("{Enter}");

    expect(await screen.findByTestId("edit-icon")).toBeInTheDocument();
  });
});
