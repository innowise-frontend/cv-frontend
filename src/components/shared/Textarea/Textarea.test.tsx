import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  getFormFieldClassList,
  nativePlaceholderClassName,
} from "@components/shared/formFieldStyles";
import { Textarea } from "./Textarea";

vi.mock("@components/ui/textarea", () => ({
  Textarea: forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>((props, ref) => (
    <textarea ref={ref} {...props} />
  )),
}));

describe("TextareaWithLabel", () => {
  it("renders a textarea", () => {
    render(<Textarea />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call onChange when the user types", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Textarea onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "hi");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls.at(-1)?.[0].target.value).toBe("hi");
  });

  it("should show placeholder when it is provided", () => {
    render(<Textarea placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("should apply shared native placeholder styles", () => {
    render(<Textarea placeholder="Placeholder" />);

    getFormFieldClassList(nativePlaceholderClassName).forEach((className) => {
      expect(screen.getByRole("textbox")).toHaveClass(className);
    });
  });

  it("should show the value instead of placeholder text when value is non-empty", () => {
    render(<Textarea value="Value" placeholder="Placeholder" onChange={() => {}} />);

    const field = screen.getByRole("textbox");

    expect(field).toHaveDisplayValue("Value");
    expect(field).toHaveAttribute("placeholder", "Placeholder");
  });

  it("should render a floating label linked to the textarea when label is provided", () => {
    render(<Textarea label="Notes" placeholder="Notes" />);

    const field = screen.getByRole("textbox");
    const label = screen.getByText("Notes", { selector: "label" });

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", field.id);
  });

  it("should apply hidden label styles when value is empty and placeholder is shown", () => {
    render(<Textarea label="Notes" placeholder="Notes" value="" onChange={() => {}} />);

    const label = screen.getByText("Notes", { selector: "label" });

    expect(label).toHaveClass("peer-placeholder-shown:opacity-0");
  });

  it("should apply floated label styles when value is non-empty", () => {
    render(<Textarea label="Notes" placeholder="Notes" value="filled" onChange={() => {}} />);

    const label = screen.getByText("Notes", { selector: "label" });

    expect(label).toHaveClass("-translate-y-4");
    expect(label).toHaveClass("text-xs");
  });

  it("should hide placeholder on focus via shared placeholder styles", () => {
    render(<Textarea placeholder="Placeholder" />);

    expect(nativePlaceholderClassName).toContain("focus:placeholder:opacity-0");
    expect(screen.getByPlaceholderText("Placeholder")).toHaveClass("focus:placeholder:opacity-0");
  });

  it("should forward ref to the native textarea", () => {
    const ref = vi.fn<(el: HTMLTextAreaElement | null) => void>();
    render(<Textarea ref={ref} />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0]?.[0]).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("should merge className onto the textarea", () => {
    render(<Textarea className="textarea-extra" />);

    expect(screen.getByRole("textbox")).toHaveClass("textarea-extra");
  });
});
