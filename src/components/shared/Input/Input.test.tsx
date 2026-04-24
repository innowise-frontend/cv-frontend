import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import i18n from "@root/i18n/i18n";
import { Input } from "./Input";

describe("InputWithLabel", () => {
  it("should render an input", () => {
    render(<Input />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call onChange when the user types", async () => {
    const user = UserEvent.setup();
    const handleChange = vi.fn();

    render(<Input onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "hi");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls.at(-1)?.[0].target.value).toBe("hi");
  });

  it("should show placeholder when it is provided", () => {
    render(<Input placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("should show the value instead of placeholder text when value is non-empty", () => {
    render(<Input value="Value" placeholder="Placeholder" onChange={() => {}} />);

    const field = screen.getByRole("textbox");

    expect(field).toHaveDisplayValue("Value");
    expect(field).toHaveAttribute("placeholder", "Placeholder");
  });

  it("should show the label when value is non-empty", () => {
    render(<Input label="Label" value="Value" onChange={() => {}} />);

    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("should not show the label when value is empty", () => {
    render(<Input label="Label" value="" onChange={() => {}} />);

    expect(screen.queryByText("Label")).not.toBeInTheDocument();
  });

  it("should forward ref to the native input", () => {
    const ref = vi.fn<(el: HTMLInputElement | null) => void>();
    render(<Input ref={ref} />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0]?.[0]).toBeInstanceOf(HTMLInputElement);
  });

  it("should merge className onto the input", () => {
    render(<Input className="input-extra" />);

    expect(screen.getByRole("textbox")).toHaveClass("input-extra");
  });

  it("should show the error message when error is provided", () => {
    render(<Input error="Error" />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("should show the password visibility toggle when type is password", () => {
    render(<Input type="password" />);

    expect(
      screen.getByRole("button", { name: i18n.t("page.setting.togglePasswordVisibility") }),
    ).toBeInTheDocument();
  });

  it("should toggle password visibility when the button is clicked", async () => {
    const user = UserEvent.setup();
    const { container } = render(<Input type="password" />);
    const field = container.querySelector("input");

    expect(field).toHaveAttribute("type", "password");

    await user.click(
      screen.getByRole("button", { name: i18n.t("page.setting.togglePasswordVisibility") }),
    );

    expect(field).toHaveAttribute("type", "text");

    await user.click(
      screen.getByRole("button", { name: i18n.t("page.setting.togglePasswordVisibility") }),
    );

    expect(field).toHaveAttribute("type", "password");
  });
});
