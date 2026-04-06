import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("should render button", () => {
    render(<Button />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = UserEvent.setup();

    render(<Button onClick={handleClick} />);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(<Button disabled />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should be enabled when disabled is false", () => {
    render(<Button disabled={false} />);

    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("should merge className onto the outer wrapper", () => {
    const { container } = render(<Button className="button-extra" />);

    expect(container.firstChild).toHaveClass("button-extra");
  });
});
