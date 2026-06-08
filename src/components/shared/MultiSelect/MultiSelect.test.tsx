import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  customPlaceholderClassName,
  getFormFieldClassList,
} from "@components/shared/formFieldStyles";
import { MultiSelect } from "./MultiSelect";

vi.mock("@root/components/ui/command", async () => {
  const React = await import("react");

  return {
    Command: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", null, children),
    CommandList: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", null, children),
    CommandGroup: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", null, children),
    CommandItem: ({ children, onSelect }: { children: React.ReactNode; onSelect?: () => void }) =>
      React.createElement("div", { role: "option", onClick: () => onSelect?.() }, children),
  };
});

const languageOptions = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "py", label: "Python" },
] as const;

type LanguageValue = (typeof languageOptions)[number]["value"];

const defaultProps = {
  label: "Programming languages",
  placeholder: "Choose languages",
  options: [...languageOptions],
  disablePortal: true,
};

const getTriggerButton = () => {
  const trigger = screen.getByText(defaultProps.placeholder).closest("button");
  expect(trigger).toBeTruthy();

  return trigger!;
};

describe("MultiSelect", () => {
  it("base case: can add and remove selected programming languages", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [data, setData] = useState<LanguageValue[]>([]);

      return (
        <MultiSelect
          {...defaultProps}
          data={data}
          onChange={(next) => {
            onChange(next);
            setData(next);
          }}
        />
      );
    }

    render(<Controlled />);

    const floatingLabel = screen.getByText(defaultProps.label, { selector: "label" });
    expect(floatingLabel).toHaveClass("opacity-0");

    const placeholder = screen.getByText(defaultProps.placeholder);
    getFormFieldClassList(customPlaceholderClassName).forEach((className) => {
      expect(placeholder).toHaveClass(className);
    });

    const triggerButton = getTriggerButton();

    await user.click(triggerButton);
    expect(floatingLabel).toHaveClass("opacity-100");
    await user.click(await screen.findByRole("option", { name: "TypeScript" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(floatingLabel).toHaveClass("-translate-y-4");
    expect(onChange).toHaveBeenCalledWith(["ts"]);
    expect(within(triggerButton).getByText("TypeScript")).toBeInTheDocument();

    const chip = within(triggerButton).getByText("TypeScript").closest("div");
    expect(chip).toBeTruthy();

    const removeButton = within(chip!).getByRole("button");
    await user.click(removeButton);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(screen.getByText(defaultProps.placeholder)).toBeInTheDocument();
    expect(triggerButton.querySelector('span[role="button"]')).toBeNull();
  });

  it("should allow selecting two or more values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [data, setData] = useState<LanguageValue[]>([]);

      return (
        <MultiSelect
          {...defaultProps}
          data={data}
          onChange={(next) => {
            onChange(next);
            setData(next);
          }}
        />
      );
    }

    render(<Controlled />);

    const triggerButton = getTriggerButton();

    await user.click(triggerButton);
    await user.click(await screen.findByRole("option", { name: "TypeScript" }));
    await user.click(await screen.findByRole("option", { name: "Python" }));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, ["ts"]);
    expect(onChange).toHaveBeenNthCalledWith(2, ["ts", "py"]);

    expect(within(triggerButton).getByText("TypeScript")).toBeInTheDocument();
    expect(within(triggerButton).getByText("Python")).toBeInTheDocument();
  });

  it("should not allow changes when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <MultiSelect
        {...defaultProps}
        data={["ts"] as LanguageValue[]}
        disabled
        onChange={onChange}
      />,
    );

    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    const trigger = screen.getByText("TypeScript").closest("button");
    expect(trigger).toBeTruthy();

    await user.click(trigger!);
    expect(screen.queryByRole("option", { name: "JavaScript" })).not.toBeInTheDocument();

    const chip = screen.getByText("TypeScript").closest("div");
    expect(chip).toBeTruthy();
    expect(within(chip!).queryByRole("button")).not.toBeInTheDocument();

    expect(onChange).not.toHaveBeenCalled();
  });
});
