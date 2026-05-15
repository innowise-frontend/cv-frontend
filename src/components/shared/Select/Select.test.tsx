import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  it("base case: shows placeholder without label when empty, opens and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        label="Language"
        placeholder="Choose a language"
        value=""
        onValueChange={onValueChange}
        list={[
          { value: "en", label: "English" },
          { value: "uk", label: "Ukrainian" },
        ]}
      />,
    );

    const combobox = screen.getByRole("combobox");
    expect(within(combobox).getByText("Choose a language")).toBeInTheDocument();
    expect(screen.queryByText("Language")).not.toBeInTheDocument();

    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "English" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("en");
  });

  it("should allow changing selection to another option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    const list = [
      { value: "en", label: "English" },
      { value: "uk", label: "Ukrainian" },
    ] as const;

    function Controlled() {
      const [value, setValue] = useState<string>("");

      return (
        <Select
          label="Language"
          placeholder="Choose a language"
          value={value}
          list={[...list]}
          onValueChange={(next) => {
            onValueChange(next);
            setValue(next);
          }}
        />
      );
    }

    render(<Controlled />);

    const combobox = screen.getByRole("combobox");
    expect(within(combobox).getByText("Choose a language")).toBeInTheDocument();

    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "English" }));

    expect(onValueChange).toHaveBeenCalledWith("en");
    expect(within(combobox).getByText("English")).toBeInTheDocument();

    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Ukrainian" }));

    expect(onValueChange).toHaveBeenCalledWith("uk");
    expect(within(combobox).getByText("Ukrainian")).toBeInTheDocument();
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });
});
