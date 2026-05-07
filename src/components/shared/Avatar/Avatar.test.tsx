import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("should render an image avatar when link is provided", () => {
    render(<Avatar name="John" imageSrc="https://example.com/avatar.jpg" />);

    const image = screen.getByRole("img", { name: "John" });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(image).toHaveClass("w-10", "h-10", "rounded-full");
  });

  it("should render the avatar placeholder when link is not provided", () => {
    render(<Avatar name="John" />);

    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("should merge className when rendering placeholder", () => {
    render(<Avatar name="John" className="avatar-extra" />);

    expect(screen.getByText("J")).toHaveClass("avatar-extra");
    expect(screen.getByText("J")).toHaveClass("w-10", "h-10", "rounded-full");
  });
});
