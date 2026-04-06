import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef } from "react";
import { describe, expect, it, vi } from "vitest";
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

  it("should show the value instead of placeholder text when value is non-empty", () => {
    render(<Textarea value="Value" placeholder="Placeholder" onChange={() => {}} />);

    const field = screen.getByRole("textbox");

    expect(field).toHaveDisplayValue("Value");
    expect(field).toHaveAttribute("placeholder", "Placeholder");
  });

  it("should show the label when value is non-empty", () => {
    render(<Textarea label="Notes" value="filled" onChange={() => {}} />);

    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("should not show the label when value is empty", () => {
    render(<Textarea label="Notes" value="" onChange={() => {}} />);

    expect(screen.queryByText("Notes")).not.toBeInTheDocument();
  });

  it("should forward ref to the native textarea", () => {
    const ref = vi.fn<(el: HTMLTextAreaElement | null) => void>();
    render(<Textarea ref={ref} />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0]?.[0]).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("should merge className onto the outer wrapper", () => {
    render(<Textarea className="textarea-extra" />);

    expect(screen.getByRole("textbox")).toHaveClass("textarea-extra");
  });
});
