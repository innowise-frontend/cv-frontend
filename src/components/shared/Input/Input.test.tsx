import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  getFormFieldClassList,
  nativePlaceholderClassName,
} from "@components/shared/formFieldStyles";
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

  it("should apply shared native placeholder styles", () => {
    render(<Input placeholder="Placeholder" />);

    getFormFieldClassList(nativePlaceholderClassName).forEach((className) => {
      expect(screen.getByRole("textbox")).toHaveClass(className);
    });
  });

  it("should show the value instead of placeholder text when value is non-empty", () => {
    render(<Input value="Value" placeholder="Placeholder" onChange={() => {}} />);

    const field = screen.getByRole("textbox");

    expect(field).toHaveDisplayValue("Value");
    expect(field).toHaveAttribute("placeholder", "Placeholder");
  });

  it("should render a floating label linked to the input when label is provided", () => {
    render(<Input label="Label" placeholder="Label" />);

    const field = screen.getByRole("textbox");
    const label = screen.getByText("Label", { selector: "label" });

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", field.id);
  });

  it("should apply hidden label styles when value is empty and placeholder is shown", () => {
    render(<Input label="Label" placeholder="Label" value="" onChange={() => {}} />);

    const label = screen.getByText("Label", { selector: "label" });

    expect(label).toHaveClass("peer-placeholder-shown:opacity-0");
  });

  it("should apply floated label styles when value is non-empty", () => {
    render(<Input label="Label" placeholder="Label" value="Value" onChange={() => {}} />);

    const label = screen.getByText("Label", { selector: "label" });

    expect(label).toHaveClass("-translate-y-4");
    expect(label).toHaveClass("text-xs");
  });

  it("should hide placeholder on focus via shared placeholder styles", () => {
    render(<Input placeholder="Placeholder" />);

    expect(nativePlaceholderClassName).toContain("focus:placeholder:opacity-0");
    expect(screen.getByPlaceholderText("Placeholder")).toHaveClass("focus:placeholder:opacity-0");
  });

  it("should apply error styles to the label when error is provided", () => {
    render(<Input label="Label" placeholder="Label" error="Required" />);

    expect(screen.getByText("Label", { selector: "label" })).toHaveClass("text-red");
  });

  it("should reserve error space with opacity-0 when error is absent", () => {
    const { container } = render(<Input />);

    expect(container.querySelector("p[id$='-error']")).toHaveClass("opacity-0");
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
