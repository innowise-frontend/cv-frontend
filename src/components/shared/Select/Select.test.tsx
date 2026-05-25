import { render, screen, waitFor } from "@testing-library/react";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  getFormFieldClassList,
  selectPlaceholderClassName,
} from "@components/shared/formFieldStyles";
import { Select } from "./Select";

describe("Select", () => {
  it("shows placeholder when closed and empty, floats label when open, and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    function Controlled() {
      const [value, setValue] = useState("");

      return (
        <Select
          label="Language"
          placeholder="Choose a language"
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            setValue(next);
          }}
          list={[
            { value: "en", label: "English" },
            { value: "uk", label: "Ukrainian" },
          ]}
        />
      );
    }

    render(<Controlled />);

    const combobox = screen.getByRole("combobox");
    const placeholder = within(combobox).getByText("Choose a language");
    const floatingLabel = screen.getByText("Language", { selector: "label" });

    expect(placeholder).toBeVisible();
    getFormFieldClassList(selectPlaceholderClassName).forEach((className) => {
      expect(combobox).toHaveClass(className);
    });
    expect(floatingLabel).toHaveClass("opacity-0");
    expect(floatingLabel).toHaveClass("top-1/2");

    await user.click(combobox);

    await waitFor(() => expect(combobox).toHaveAttribute("aria-expanded", "true"));
    await waitFor(() => expect(placeholder).toHaveClass("opacity-0"));
    await waitFor(() => {
      expect(floatingLabel).toHaveClass("opacity-100");
      expect(floatingLabel).toHaveClass("-translate-y-4");
    });

    await user.click(await screen.findByRole("option", { name: "English" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("en");
    expect(floatingLabel).toHaveClass("opacity-100");
    expect(floatingLabel).toHaveClass("-translate-y-4");
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
    const floatingLabel = screen.getByText("Language", { selector: "label" });

    expect(within(combobox).getByText("Choose a language")).toBeVisible();
    expect(floatingLabel).toHaveClass("opacity-0");

    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "English" }));

    expect(onValueChange).toHaveBeenCalledWith("en");
    expect(within(combobox).getByText("English")).toBeVisible();
    expect(floatingLabel).toHaveClass("opacity-100");
    expect(floatingLabel).toHaveClass("-translate-y-4");

    await user.click(combobox);
    await user.click(await screen.findByRole("option", { name: "Ukrainian" }));

    expect(onValueChange).toHaveBeenCalledWith("uk");
    expect(within(combobox).getByText("Ukrainian")).toBeVisible();
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });
});
