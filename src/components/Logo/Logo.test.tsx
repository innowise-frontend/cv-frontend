import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Logo } from "./Logo";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("@assets/icon/LogoIconLight.svg?react", () => ({
  default: (props: { className?: string }) => <svg data-testid="logo-light" {...props} />,
}));

vi.mock("@assets/icon/LogoIconDark.svg?react", () => ({
  default: (props: { className?: string }) => <svg data-testid="logo-dark" {...props} />,
}));

describe("Logo", () => {
  it("should render logo icons, title, and root link when expanded", () => {
    render(<Logo />);

    expect(screen.getByTestId("logo-light")).toBeInTheDocument();
    expect(screen.getByTestId("logo-dark")).toBeInTheDocument();
    expect(screen.getByText("CV Builder")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  it("should hide title when collapsed", () => {
    render(<Logo collapsed />);

    expect(screen.getByTestId("logo-light")).toBeInTheDocument();
    expect(screen.getByTestId("logo-dark")).toBeInTheDocument();
    expect(screen.queryByText("CV Builder")).not.toBeInTheDocument();
  });
});
